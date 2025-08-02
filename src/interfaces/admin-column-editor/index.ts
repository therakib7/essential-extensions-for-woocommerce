/**
 * Internal dependencies.
 */

export interface IScreen {
    group: string;
    screen_id: string;
    label: string;
    options: {
        label: string;
        value: string;
    }[];
}

export interface IColumn {
    id: string;
    type: string;
    label: string;
    width: string;
    width_unit: string;
    is_hide: boolean;
    is_custom: boolean;
}

export interface IDefaultColumn {
    id: string;
    type: string;
    label: string;
    width: string;
    width_unit: string;
}

export interface AdminColumnEditorState {
    /**
     * Column Form data.
     */
    form: null | object;

    /**
     * Is items isLoading.
     */
    isLoading: boolean;

    /**
     * Column isSaving or not.
     */
    isSaving: boolean;

    /**
     * Column deleting or not.
     */
    isDeleting: boolean;

    /**
     * All screen as array of object.
     */
    screens: Screen[];

    /**
     * All editorColumn as array of object.
     */
    editorColumns: IColumn[];

    /**
     * All defaultColumn as array of object.
     */
    defaultColumns: IDefaultColumn[];

    /**
     * Selected menu id
     */
    selectedColumn: null | number;

    /**
     * Column list error.
     */
    errors: object;
}
