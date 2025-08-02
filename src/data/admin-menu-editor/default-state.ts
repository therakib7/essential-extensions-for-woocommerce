/**
 * Internal dependencies.
 */
import { AdminMenuEditorState } from '@/interfaces/admin-menu-editor';
import { IMenu } from '@/interfaces/admin-menu-editor';

export const defaultForm: IMenu = {
    label: '',
    target_page: '',
    url: '',
    capability: '',
    icon: '',
    open_in: 'self',
    classes: '',
    id: '',
    page_title: '',
    window_title: '',
    is_hide: false,
    is_custom: true,
    submenu: [],
};

export const defaultState: AdminMenuEditorState = {
    form: null,
    isLoading: false,
    isSaving: false,
    isDeleting: false,
    defaultMenus: [],
    editorMenus: [],
    expandMenu: '',
    selectedMenu: null,
    selectedSubmenu: null,
    errors: {},
};
