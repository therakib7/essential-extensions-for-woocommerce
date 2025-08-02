/**
 * Internal dependencies.
 */

import { SettingState } from '@/interfaces/settings';

const selectors = {
    getForm(state: SettingState) {
        const { form } = state;

        return form;
    },

    getFormData(state: SettingState) {
        const { form } = state;

        return form;
    },

    getIsLoading(state: SettingState) {
        const { isLoading } = state;

        return isLoading;
    },

    getIsSaving(state: SettingState) {
        const { isSaving } = state;

        return isSaving;
    },

    getErrors(state: SettingState) {
        const { errors } = state;

        return errors;
    },
};

export default selectors;
