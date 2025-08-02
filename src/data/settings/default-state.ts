/**
 * Internal dependencies.
 */
import { SettingState } from '@/interfaces/settings';

export const defaultForm = {
    websites: [],
};

export const defaultState: SettingState = {
    form: { ...defaultForm },
    isLoading: false,
    isSaving: false,
    errors: {},
};
