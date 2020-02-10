import * as OrderActions from './order.actions';
import * as oModel from './order.model';

export interface OrderState {
    orders: oModel.Order[];
    order: oModel.Order;
    order_status_change: {};
};

const initialState: OrderState = {
    orders: [],
    order: null,
    order_status_change: null
};

export const orderReducer: ( state: OrderState, action: OrderActions.accions ) =>
    OrderState = ( state = initialState, action: OrderActions.accions ) => {
    switch (action.type) {
        case OrderActions.ACT_GET_ALL_ORDERS:
            return { ...state, orders: action.payload };
        case OrderActions.ACT_GET_ORDER:
            return {  ...state, order: action.payload };
        case OrderActions.ACT_CHANGE_STATUS_ORDER:
            return { ...state, order_status_change: action.payload };
        case OrderActions.ACT_UPDATE_ORDER_STATUS:
            return { ...state, order: action.payload };
        default:
            return state;
    }
}
