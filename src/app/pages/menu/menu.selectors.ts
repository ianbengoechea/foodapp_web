import { createSelector } from '@ngrx/store';

import { MenuState } from './menu.reducer';
import { AppState } from '../../store/app.reducer';


// selector para el global store
export const SelectGlobalStoreMenu = (state: AppState) => state.menuStore;

// selectores para MENU
export const selectAllMenus = createSelector(
  SelectGlobalStoreMenu,
  (state: MenuState) => state.menus
);

export const selectMenu = createSelector(
    SelectGlobalStoreMenu,
    (state: MenuState) => state.menu
  );

export const selectCategories = createSelector(
  SelectGlobalStoreMenu,
  (state: MenuState) => state.categories
);

export const selectModeView = createSelector(
  SelectGlobalStoreMenu,
  (state: MenuState) => state.mode_view
);
