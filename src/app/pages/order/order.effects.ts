
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {merge, Observable, of} from 'rxjs';
import { tap, mergeMap, catchError, map, withLatestFrom, switchMap } from 'rxjs/operators';

import * as OrderActions from './order.actions';
import { AppState } from '../../store/app.reducer';
import {StoreService} from '../../api/store/store.service';
import {OrderService} from "../../api/order/order.service";
import {Order} from "./order.model";

@Injectable()
export class OrderEffects {


  constructor( private action$: Actions,
               private api: OrderService,
               private storeService: StoreService,
               private store: Store<AppState>,
  ) {}

  @Effect()
  updateOrder$: Observable<Action> = this.action$.pipe(
    ofType<OrderActions.UpdateOrderStatus>(OrderActions.ACT_UPDATE_ORDER_STATUS),
    withLatestFrom(this.store),
    mergeMap( ([action, state]) => this.api.updateOrderStatus(action.payload)),
    switchMap( _ => {
      return this.storeService.getOrdersFromStoreId(1).pipe(
        switchMap((OrderList: Order[]) => [
          new OrderActions.OrderGetAllAction( OrderList )
        ])
      )
    })
  );

}
