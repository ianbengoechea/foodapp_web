import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { mergeMap, tap, switchMap, map } from 'rxjs/operators';

import { AppState } from '../../../store/app.reducer';
import * as menuActions from '../menu.actions';

import { NotificationService } from 'src/app/utils/notification.service';
import { MenuService } from '../../../api/menu/menu.service';

import { Menu, Category } from '../menu.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { selectAllMenus, selectCategories } from '../menu.selectors';
import {StoreService} from '../../../api/store/store.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isEditing: boolean;
  isCreating: boolean;
  menuList$: Observable<Menu[]>;
  categoryList$: Observable<Category[]>;

  menuFormGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    stock: ['', [Validators.required]],
    unit_price: ['', [Validators.required]],
    product_category: this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]]
    }),
    store: this.fb.group({
      id: [1, Validators.required]
    })
  });

  static createMenu(): Menu {
    return {
      id: null,
      name: '',
      description: '',
      stock: null,
      unit_price: null,
      product_category: {
        id: null,
        name: ''
      },
      store: {
        id: 1
      }
    };
  }

  constructor(
              public fb: FormBuilder,
              private notificationService: NotificationService,
              private store: Store<AppState>,
              private menuService: MenuService,
              private storeService: StoreService
  ) { }

  ngOnInit() {

    this.getAllMenu();
    this.getCategories();
    this.menuList$ = this.store.pipe(select(selectAllMenus));
    this.categoryList$ = this.store.pipe(select(selectCategories));

  }

  getAllMenu() {
    const idStore: number = this.menuFormGroup.value.store.id;
    console.log('getAllMenu >> idStore', idStore)
    this.storeService.getMenuFromStoreId(idStore)
    .pipe(
      tap( (list: Menu[]) => this.store.dispatch( new menuActions.MenuGetAllAction(list)))
    ).subscribe();
  }

  getCategories() {
    this.menuService.getAllCategories()
      .pipe(
        tap( (list: Category[]) => this.store.dispatch( new menuActions.CategoryGetAction(list) ))
      ).subscribe();
  }

  addNew(menuForm: NgForm) {
    menuForm.resetForm();
    this.menuFormGroup.reset();
    this.menuFormGroup.setValue(MenuComponent.createMenu());
    this.isCreating = true;
  }

  cancelEditing() {
    this.isEditing = false;
    this.isCreating = false;
  }

  save() {
    this.notificationService.error('noti');
    const menu = this.menuFormGroup.value;

    if (this.isEditing && this.menuFormGroup.valid) {
      this.store.dispatch( new menuActions.MenuUpdateAction(menu) );

      this.isEditing = false;

    } else {
      this.store.dispatch( new menuActions.MenuAddAction(menu) );

      this.isCreating = false;
    }
  }

  selectedMenu(m: Menu) {
    // el siguiente quilombo es porque necesito enviar solo el ID
    // del store y no todo el objeto
    console.log('menu', m)
    const id: number = this.menuFormGroup.value.store.id;
    const menu = m;
    // const id = menu.store.id;
    menu.store = {id};
    this.isEditing = true;
    console.log('menu2', menu)


    this.menuFormGroup.setValue(menu);

  }

  toggleStock(e) {
    e.checked
      ? this.menuFormGroup.patchValue({ stock: 1 })
      : this.menuFormGroup.patchValue({ stock: 0 });
  }

}
