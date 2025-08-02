/**
 * Internal dependencies.
 */
import { extensionState } from '@/interfaces/extensions';

export const defaultState: extensionState = {
    form: null,
    isLoading: false,
    isSaving: false,
    extensions: [],
    errors: {},
};
