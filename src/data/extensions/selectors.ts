/**
 * Internal dependencies.
 */

import { extensionState } from '@/interfaces/extensions';

const selectors = {
    getForm(state: extensionState) {
        const { form } = state;
        return form;
    },

    getIsLoading(state: extensionState) {
        const { isLoading } = state;
        return isLoading;
    },

    getIsSaving(state: extensionState) {
        const { isSaving } = state;
        return isSaving;
    },

    getExtensions(state: extensionState) {
        const { extensions } = state;
        return extensions;
    },

    getErrors(state: extensionState) {
        const { errors } = state;
        return errors;
    },
};

export default selectors;
