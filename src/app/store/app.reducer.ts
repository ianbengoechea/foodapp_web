import * as fromMenu from '../pages/menu/menu.reducer';
import * as fromOrder from '../pages/order/order.reducer';

import { ActionReducerMap } from '@ngrx/store';

/*
*   componente que engloba los reducers y los mapea al state global del modulo
*   TODO: modularizar
*/

export interface AppState {
    menuStore: fromMenu.MenuState;
    orderStore: fromOrder.OrderState;
  }

export const appReducers: ActionReducerMap<AppState> = {
    menuStore: fromMenu.menuReducer,
    orderStore: fromOrder.orderReducer,
  };
