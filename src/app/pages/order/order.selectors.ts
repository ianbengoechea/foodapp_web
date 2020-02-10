import { createSelector } from '@ngrx/store';

import { OrderState } from "./order.reducer";
import { AppState } from "../../store/app.reducer";

// selector del store GLOBAL
const SelectGlobalStoreOrder = ( state: AppState ) => state.orderStore;

// selector para STORE/ORDER
export const selectAllOrders = createSelector(
  SelectGlobalStoreOrder,
  (state: OrderState) => state.orders
);

export const selectOrder = createSelector(
  SelectGlobalStoreOrder,
  (state: OrderState) => state.order
);

export const selectOrderStatusChange = createSelector(
  SelectGlobalStoreOrder,
  (state: OrderState) => state.order_status_change
);
