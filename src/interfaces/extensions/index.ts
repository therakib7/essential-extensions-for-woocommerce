export interface IExtension {
    id: string;
    title: string;
    description: string;
    is_active: boolean;
}

/**
 * Internal dependencies.
 */

export interface extensionState {
    /**
     * Extension Form data.
     */
    form: null | object;

    /**
     * Is items isLoading.
     */
    isLoading: boolean;

    /**
     * Extension isSaving or not.
     */
    isSaving: boolean;

    /**
     * All extension as array of object.
     */
    extensions: IExtension[];

    /**
     * Extension list error.
     */
    errors: object;
}
