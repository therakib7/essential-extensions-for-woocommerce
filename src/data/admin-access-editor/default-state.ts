/**
 * Internal dependencies.
 */
import {
    IForm,
    AdminAccessEditorState,
} from '@/interfaces/admin-access-editor';

export const defaultForm: IForm = {
    id: '',
    admin_menus: {},
};

export const defaultState: AdminAccessEditorState = {
    form_data: {
        ids: [],
        admin_menus: [],
    },
    form: { ...defaultForm },
    expandMenu: '',
    isLoading: false,
    isSaving: false,
    isDeleting: false,
    currentPage: 1,
    perPage: 10,
    items: [],
    totalItems: 0,
    totalPages: 0,
    selectedItems: [],
    filters: {},
    errors: {},
};
