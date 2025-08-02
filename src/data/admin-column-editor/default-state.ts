/**
 * Internal dependencies.
 */
import { AdminColumnEditorState } from '@/interfaces/admin-column-editor';
import { IColumn } from '@/interfaces/admin-column-editor';

export const defaultForm: IColumn = {
    id: '',
    type: '',
    label: '',
    width: '',
    width_unit: '',
    is_hide: false,
    is_custom: true
};

export const defaultState: AdminColumnEditorState = {
    form: null,
    isLoading: false,
    isSaving: false,
    isDeleting: false,
    screens: [],
    defaultColumns: [],
    editorColumns: [],
    selectedColumn: null,
    errors: {},
};
