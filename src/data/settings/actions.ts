/**
 * Internal dependencies.
 */

import { IResponse } from '@/interfaces';
import { ACTION_TYPES } from './types';

const {
    SET_IS_LOADING,
    SET_IS_SAVING,
    SET_FORM,
    API_UPDATE,
    SET_ERROR,
    API_GET,
} = ACTION_TYPES;

const actions = {
    setForm(form: any) {
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

    *saveForm(payload: any) {
        yield actions.setIsSaving(true);

        try {
            let response: IResponse = {};
            response = yield {
                type: API_UPDATE,
                payload,
            };

            if (response) {
                yield actions.setIsSaving(false);
            }
        } catch (error) {
            yield actions.setIsSaving(false);
        }
    },

    apiGet(path: string) {
        return {
            type: API_GET,
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
