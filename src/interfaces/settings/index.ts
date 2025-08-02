/**
 * Internal dependencies.
 */

export interface SettingState {
    /**
     * Item Form data.
     */
    form: object;

    /**
     * Is items isLoading.
     */
    isLoading: boolean;

    /**
     * Item isSaving or not.
     */
    isSaving: boolean;

    /**
     * Item list error.
     */
    errors: object;
}
