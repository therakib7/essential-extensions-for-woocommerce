/**
 * Internal dependencies.
 */
import { AdminAccessEditorState } from '@/interfaces/admin-access-editor';

const selectors = {
    getFormData(state: AdminAccessEditorState) {
        const { form_data } = state;
        return form_data;
    },

    getForm(state: AdminAccessEditorState) {
        const { form } = state;
        return form;
    },

    getExpandMenu(state: AdminAccessEditorState) {
        const { expandMenu } = state;
        return expandMenu;
    },

    getIsLoading(state: AdminAccessEditorState) {
        const { isLoading } = state;
        return isLoading;
    },

    getIsSaving(state: AdminAccessEditorState) {
        const { isSaving } = state;
        return isSaving;
    },

    getIsDeleting(state: AdminAccessEditorState) {
        const { isDeleting } = state;
        return isDeleting;
    },

    getPerPage(state: AdminAccessEditorState) {
        const { perPage } = state;
        return perPage;
    },

    getItems(state: AdminAccessEditorState) {
        const { items } = state;
        return items;
    },

    getTotalItems(state: AdminAccessEditorState) {
        const { totalItems } = state;
        return totalItems;
    },

    getTotalPages(state: AdminAccessEditorState) {
        const { totalPages } = state;
        return totalPages;
    },

    getSelectedItems(state: AdminAccessEditorState) {
        const { selectedItems } = state;
        return selectedItems;
    },

    getFilters(state: AdminAccessEditorState) {
        const { filters } = state;
        return filters;
    },

    getErrors(state: AdminAccessEditorState) {
        const { errors } = state;
        return errors;
    },
};

export default selectors;
