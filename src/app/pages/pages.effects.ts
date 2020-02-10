import { MenuEffects } from './menu/menu.effects';
import { OrderEffects } from "./order/order.effects";

export const effectComponents: any[] = [ MenuEffects, OrderEffects ];

export * from './menu/menu.effects';

/*
*   encierra todos los effects de los componentes, es utilizado en el modulo (Root o forFeature de acuerdo a si esta modularizado)
*
*/
