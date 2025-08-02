/**
 * Internal dependencies.
 */

import { IResponse } from '@/interfaces';
import { IColumn } from '@/interfaces/admin-column-editor';
import { ACTION_TYPES } from './types';

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
    GET_COLUMNS,
    EDIT_COLUMN,
} = ACTION_TYPES;

const actions = {
    setForm(form: IColumn) {
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

    setScreens(screens: Array<object>) {
        return {
            type: SET_SCREENS,
            screens,
        };
    },

    setDefaultColumns(defaultColumns: Array<object>) {
        return {
            type: SET_DEFAULT_COLUMNS,
            defaultColumns,
        };
    },

    setEditorColumns(editorColumns: Array<object>) {
        return {
            type: SET_EDITOR_COLUMNS,
            editorColumns,
        };
    },

    setExpandColumn(expandColumn: null | string) {
        return {
            type: SET_EXPAND_COLUMN,
            expandColumn,
        };
    },

    setSelectedColumn(selectedColumn: null | number) {
        return {
            type: SET_SELECTED_COLUMN,
            selectedColumn,
        };
    },

    *saveColumns(payload: IColumn) {
        yield actions.setIsSaving(true);

        try {
            let response: IResponse = {};
            response = yield {
                type: EDIT_COLUMN,
                payload,
            };
            if (response) {
                yield actions.setIsSaving(false);
            }
        } catch (error) {
            yield actions.setIsSaving(false);
        }
    },

    getColumns(path: string) {
        return {
            type: GET_COLUMNS,
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
