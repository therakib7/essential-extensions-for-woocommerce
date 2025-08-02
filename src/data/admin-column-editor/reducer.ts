/**
 * Internal dependencies.
 */
import { ACTION_TYPES } from './types';
import { defaultState } from './default-state';

const {
    SET_IS_LOADING,
    SET_IS_SAVING,
    SET_IS_DELETING,
    SET_SCREENS,
    SET_DEFAULT_COLUMNS,
    SET_EDITOR_COLUMNS,
    SET_EXPAND_COLUMN,
    SET_SELECTED_COLUMN,
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

        case SET_SCREENS:
            return {
                ...state,
                screens: action.screens,
            };

        case SET_DEFAULT_COLUMNS:
            return {
                ...state,
                defaultColumns: action.defaultColumns,
            };

        case SET_EDITOR_COLUMNS:
            return {
                ...state,
                editorColumns: action.editorColumns,
            };

        case SET_EXPAND_COLUMN:
            return {
                ...state,
                expandColumn: action.expandColumn,
            };

        case SET_SELECTED_COLUMN:
            return {
                ...state,
                selectedColumn: action.selectedColumn,
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
