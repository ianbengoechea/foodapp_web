
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, mergeMap, catchError, map, withLatestFrom, switchMap } from 'rxjs/operators';

import * as menuActions from './menu.actions';
import { AppState } from '../../store/app.reducer';
import { MenuService } from '../../api/menu/menu.service';
import { Menu } from './menu.model';
import {StoreService} from '../../api/store/store.service';

@Injectable()
export class MenuEffects {

    constructor( private action$: Actions,
                 private api: MenuService,
                 private storeService: StoreService,
                 private store: Store<AppState>
                 ) {}


    @Effect()
    updateMenu$: Observable<Action> = this.action$.pipe(
        ofType<menuActions.MenuUpdateAction>(menuActions.ACT_UPDATE_MENU),
        withLatestFrom(this.store),
        mergeMap( ([action, state]: [menuActions.MenuUpdateAction, AppState]) =>
                this.api.updateMenu(action.payload)),
        switchMap( _ => {
            return this.storeService.getMenuFromStoreId(1).pipe(
                    switchMap(
                        (MenuList: Menu[]) => [
                            new menuActions.MenuGetAllAction( MenuList ),
                            new menuActions.MenuResetAction()
                    ])
            );
        })
    );

    @Effect()
    createMenu$: Observable<Action> = this.action$.pipe(
        ofType<menuActions.MenuAddAction>(menuActions.ACT_ADD_MENU),
        withLatestFrom(this.store),
        mergeMap( ([action, state]: [menuActions.MenuAddAction, AppState]) =>
            this.api.createMenu(action.payload)),
        switchMap( _ => {
          console.log('el menu esta en el effect')
            return this.storeService.getMenuFromStoreId(1)
                .pipe(
                    switchMap(
                        (MenuList: Menu[]) => [
                            new menuActions.MenuGetAllAction( MenuList ),
                            new menuActions.MenuResetAction()
                    ]
                )
            );
        })
    );


}
