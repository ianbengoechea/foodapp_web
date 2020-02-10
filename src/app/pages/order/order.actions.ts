import { Action } from '@ngrx/store';

import * as oModel from './order.model';
import {Order} from "./order.model";

export const ACT_GET_ALL_ORDERS = '[ORDER] GET_ALL_ORDERS';
export const ACT_GET_ORDER = '[ORDER] GET_ORDER';
export const ACT_CHANGE_STATUS_ORDER = '[ORDER] CHANGE_STATUS_ORDER';
export const ACT_UPDATE_ORDER_STATUS = '[ORDER] ACT_UPDATE_ORDER_STATUS';

export class OrderGetAllAction implements Action {
  readonly type = ACT_GET_ALL_ORDERS;
  constructor( public payload: oModel.Order[] ) {}
}

export class OrderGetAction implements Action {
  readonly type = ACT_GET_ORDER;
  constructor( public payload: oModel.Order ) {}
}

export class OrderChangeStatusAction implements Action {
  readonly type = ACT_CHANGE_STATUS_ORDER;

  constructor(public payload: {}) {}
}

export class UpdateOrderStatus implements Action {
  readonly type = ACT_UPDATE_ORDER_STATUS;
  constructor( public payload: Order) {
  }
}


export type accions =
  OrderGetAllAction |
  OrderGetAction |
  UpdateOrderStatus |
  OrderChangeStatusAction;
