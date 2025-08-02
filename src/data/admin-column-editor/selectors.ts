/**
 * Internal dependencies.
 */

import { AdminColumnEditorState } from '@/interfaces/admin-column-editor';

const selectors = {
    getForm(state: AdminColumnEditorState) {
        const { form } = state;
        return form;
    },

    getIsLoading(state: AdminColumnEditorState) {
        const { isLoading } = state;
        return isLoading;
    },

    getIsSaving(state: AdminColumnEditorState) {
        const { isSaving } = state;
        return isSaving;
    },

    getIsDeleting(state: AdminColumnEditorState) {
        const { isDeleting } = state;
        return isDeleting;
    },

    getScreens(state: AdminColumnEditorState) {
        const { screens } = state;
        return screens;
    },

    getDefaultColumn(state: AdminColumnEditorState) {
        const { defaultColumns } = state;
        return defaultColumns;
    },

    getEditorColumn(state: AdminColumnEditorState) {
        const { editorColumns } = state;
        return editorColumns;
    },

    getSelectedColumn(state: AdminColumnEditorState) {
        const { selectedColumn } = state;
        return selectedColumn;
    },

    getErrors(state: AdminColumnEditorState) {
        const { errors } = state;
        return errors;
    },
};

export default selectors;
