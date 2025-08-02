/**
 * Internal dependencies.
 */

import { IResponse } from '@/interfaces';
import { IMenu } from '@/interfaces/admin-menu-editor';
import { ACTION_TYPES } from './types';

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
    GET_MENUS,
    EDIT_MENU,
} = ACTION_TYPES;

const actions = {
    setForm(form: IMenu) {
        return {
            type: SET_FORM,
            form,
        };
    },

    setIsLoading(isLoading: boolean) {
        return {
            type: SET_IS_LOADING,
            isLoading,
        };
    },

    setIsSaving(isSaving: boolean) {
        return {
            type: SET_IS_SAVING,
            isSaving,
        };
    },

    setIsDeleting(isDeleting: boolean) {
        return {
            type: SET_IS_DELETING,
            isDeleting,
        };
    },

    setDefaultMenus(defaultMenus: Array<object>) {
        return {
            type: SET_DEFAULT_MENUS,
            defaultMenus,
        };
    },

    setEditorMenus(editorMenus: Array<object>) {
        return {
            type: SET_EDITOR_MENUS,
            editorMenus,
        };
    },

    setExpandMenu(expandMenu: null | string) {
        return {
            type: SET_EXPAND_MENU,
            expandMenu,
        };
    },

    setSelectedMenu(selectedMenu: null | number) {
        return {
            type: SET_SELECTED_MENU,
            selectedMenu,
        };
    },

    setSelectedSubmenu(selectedSubmenu: null | number) {
        return {
            type: SET_SELECTED_SUBMENU,
            selectedSubmenu,
        };
    },

    *saveMenus(payload: IMenu) {
        yield actions.setIsSaving(true);

        try {
            let response: IResponse = {};
            response = yield {
                type: EDIT_MENU,
                payload,
            };
            if (response) {
                yield actions.setIsSaving(false);
            }
        } catch (error) {
            yield actions.setIsSaving(false);
        }
    },

    getMenus(path: string) {
        return {
            type: GET_MENUS,
            path,
        };
    },

    setErrors(errors: object) {
        return {
            type: SET_ERROR,
            errors,
        };
    },
};

export default actions;
