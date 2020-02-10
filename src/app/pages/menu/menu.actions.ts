import { Action } from '@ngrx/store';

import { Menu } from './menu.model';

export const ACT_GET_ALL_MENU = '[MENU] GET_ALL_MENU';
export const ACT_GET_MENU = '[MENU] GET_MENU';
export const ACT_GET_CATEGORIAS = '[CATEGORIA] GET_CATEGORIAS';
export const ACT_ADD_MENU = '[MENU] ADD_MENU';
export const ACT_UPDATE_MENU = '[MENU] UPDATE_MENU';
export const ACT_DELETE_MENU = '[MENU] DELETE_MENU';
export const ACT_MODE_VIEW = '[MENU] MODE_VIEW';
export const ACT_RESET_MENU = '[MENU] RESET_MENU';

export class MenuGetAllAction implements Action {
    readonly type = ACT_GET_ALL_MENU;
    constructor( public payload: Menu[] ) {}
}

export class MenuGetAction implements Action {
    readonly type = ACT_GET_MENU;
    constructor( public payload: Menu ) {}
}

export class CategoryGetAction implements Action {
    readonly type = ACT_GET_CATEGORIAS;
    constructor( public payload?: any[] ) {}
}

export class MenuAddAction implements Action {
    readonly type = ACT_ADD_MENU;
    constructor( public payload: Menu ) {}
}

export class MenuUpdateAction implements Action {
    readonly type = ACT_UPDATE_MENU;
    constructor( public payload: Menu, public id?: number ) {}
}

export class MenuDeleteAction implements Action {
    readonly type = ACT_DELETE_MENU;
    constructor( public payload: Menu ) {}
}

export class MenuModeViewAction implements Action {
    readonly type = ACT_MODE_VIEW;
    constructor( public payload: boolean ) {}
}

export class MenuResetAction implements Action {
    readonly type = ACT_RESET_MENU;
}

export type accions =

MenuGetAllAction |
MenuGetAction |
MenuAddAction |
MenuUpdateAction |
MenuDeleteAction |
MenuResetAction |
MenuModeViewAction |
CategoryGetAction;
