import * as MenuActions from './menu.actions';
import { Menu, Category } from './menu.model';

export interface MenuState {
    menus: Menu[];
    menu: Menu;
    categories: Category[];
    mode_view: boolean;
}

const initialState: MenuState = {
    menus: [],
    menu: null,
    categories: [],
    mode_view: false,
};

export const menuReducer: (state: MenuState, action: MenuActions.accions) =>
    MenuState = (state = initialState, action: MenuActions.accions) => {
        switch (action.type) {

            case MenuActions.ACT_GET_ALL_MENU:
                return { ...state, menus: action.payload };
            case MenuActions.ACT_GET_MENU:
                return { ...state, menu: action.payload };
            case MenuActions.ACT_GET_CATEGORIAS:
                return { ...state, categories: action.payload };
            case MenuActions.ACT_ADD_MENU:
                return { ...state, menu: action.payload };
            case MenuActions.ACT_DELETE_MENU:
                return { ...state, menu: action.payload }; // tengo que enviar el id
            case MenuActions.ACT_UPDATE_MENU:
                return { ...state, menu: action.payload }; // tengo que enviar el id
            case MenuActions.ACT_RESET_MENU:
                return { ...state, menu: null };
            case MenuActions.ACT_MODE_VIEW:
                return { ...state, mode_view: action.payload };

            default:
                return state;
        }

    };
