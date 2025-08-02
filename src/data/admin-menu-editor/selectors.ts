/**
 * Internal dependencies.
 */

import { AdminMenuEditorState } from '@/interfaces/admin-menu-editor';

const selectors = {
    getForm(state: AdminMenuEditorState) {
        const { form } = state;
        return form;
    },

    getIsLoading(state: AdminMenuEditorState) {
        const { isLoading } = state;
        return isLoading;
    },

    getIsSaving(state: AdminMenuEditorState) {
        const { isSaving } = state;
        return isSaving;
    },

    getIsDeleting(state: AdminMenuEditorState) {
        const { isDeleting } = state;
        return isDeleting;
    },

    getDefaultMenu(state: AdminMenuEditorState) {
        const { defaultMenus } = state;
        return defaultMenus;
    },

    getEditorMenu(state: AdminMenuEditorState) {
        const { editorMenus } = state;
        return editorMenus;
    },

    getExpandMenu(state: AdminMenuEditorState) {
        const { expandMenu } = state;
        return expandMenu;
    },

    getSelectedMenu(state: AdminMenuEditorState) {
        const { selectedMenu } = state;
        return selectedMenu;
    },

    getSelectedSubmenu(state: AdminMenuEditorState) {
        const { selectedSubmenu } = state;
        return selectedSubmenu;
    },

    getErrors(state: AdminMenuEditorState) {
        const { errors } = state;
        return errors;
    },
};

export default selectors;
