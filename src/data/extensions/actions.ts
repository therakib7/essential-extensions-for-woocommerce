/**
 * Internal dependencies.
 */

import { IResponse } from '@/interfaces';
import { IExtension } from '@/interfaces/extensions';
import { ACTION_TYPES } from './types';

const {
    SET_IS_LOADING,
    SET_IS_SAVING,
    SET_ADDONS,
    SET_FORM,
    SET_ERROR,
    GET_ADDONS,
    EDIT_ADDON,
} = ACTION_TYPES;

const actions = {
    setForm(form: IExtension) {
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

    setExtensions(extensions: Array<object>) {
        return {
            type: SET_ADDONS,
            extensions,
        };
    },

    *saveExtensions(payload: IExtension) {
        yield actions.setIsSaving(true);

        try {
            let response: IResponse = {};
            response = yield {
                type: EDIT_ADDON,
                payload,
            };
            if (response) {
                yield actions.setIsSaving(false);
            }
        } catch (error) {
            yield actions.setIsSaving(false);
        }
    },

    getExtensions(path: string) {
        return {
            type: GET_ADDONS,
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
