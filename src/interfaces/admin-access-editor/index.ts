export interface IItem {
    /**
     * Item ID.
     */
    id: string | number | null;

    /**
     * Item name.
     */
    name?: string;

    /**
     * Item email.
     */
    email?: string;

    /**
     * Item label.
     */
    label?: string;

    /**
     * Order created_at.
     */
    created_at: string;
}

export interface IItemFilter {
    /**
     * Job filter by page no.
     */
    page?: number;

    /**
     * Job search URL params.
     */
    search?: string;
}

export interface IItemCategories {
    /**
     * Order type id.
     */
    id: number;

    /**
     * Order type name.
     */
    name: string;

    /**
     * Order type slug.
     */
    slug: string;
}

export interface IFormDataIds {
    value: string;
    label: string;
}

export interface Submenu {
    label: string;
    capability: string;
    url: string;
}

export interface Menu {
    label: string;
    classes: string;
    capability: string;
    url: string;
    submenu: Submenu[];
}

export interface IFormData {
    ids: IFormDataIds[];
    admin_menus: Menu[];
}

export interface IForm {
    id: string;
    admin_menus: {
        [key: string]: string[];
    };
}

export interface AdminAccessEditorState {
    /**
     * Form data.
     */
    form_data: IFormData;

    /**
     * Form value.
     */
    form: IForm;

    /**
     * New menu details.
     */
    expandMenu: null | string;

    /**
     * Is items isLoading.
     */
    isLoading: boolean;

    /**
     * Item isSaving or not.
     */
    isSaving: boolean;

    /**
     * Item deleting or not.
     */
    isDeleting: boolean;

    /**
     * Current page number
     */
    currentPage: number;

    /**
     * Show number of items per page.
     */
    perPage: number;

    /**
     * All items as array of object.
     */
    items: Array<object>;

    /**
     * Count total number of items.
     */
    totalItems: number;

    /**
     * Count total page.
     */
    totalPages: number;

    /**
     * Selected items for an action.
     */
    selectedItems: Array<number>;

    /**
     * Item list filter.
     */
    filters: object;

    /**
     * Item list error.
     */
    errors: object;
}
