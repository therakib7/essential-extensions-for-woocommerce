/**
 * Internal dependencies.
 */
import { ACTION_TYPES } from './types';
import { defaultState } from './default-state';

const {
    SET_IS_LOADING,
    SET_IS_SAVING,
    SET_IS_DELETING,
    SET_DEFAULT_MENUS,
    SET_EDITOR_MENUS,
    SET_EXPAND_MENU,
    SET_SELECTED_MENU,
    SET_SELECTED_SUBMENU,
    SET_FORM,
    SET_ERROR,
} = ACTION_TYPES;

const reducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case SET_FORM:
            return {
                ...state,
                form: action.form,
            };

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case SET_IS_SAVING:
            return {
                ...state,
                isSaving: action.isSaving,
            };

        case SET_IS_DELETING:
            return {
                ...state,
                isDeleting: action.isDeleting,
            };

        case SET_DEFAULT_MENUS:
            return {
                ...state,
                defaultMenus: action.defaultMenus,
            };

        case SET_EDITOR_MENUS:
            return {
                ...state,
                editorMenus: action.editorMenus,
            };

        case SET_EXPAND_MENU:
            return {
                ...state,
                expandMenu: action.expandMenu,
            };

        case SET_SELECTED_MENU:
            return {
                ...state,
                selectedMenu: action.selectedMenu,
            };

        case SET_SELECTED_SUBMENU:
            return {
                ...state,
                selectedSubmenu: action.selectedSubmenu,
            };

        case SET_ERROR:
            return {
                ...state,
                errors: action.errors,
            };
    }

    return state;
};

export default reducer;
