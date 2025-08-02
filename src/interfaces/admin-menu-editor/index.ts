/**
 * Internal dependencies.
 */

export interface ISubmenu {
    /**
     * Menu label.
     */
    label: string;

    /**
     * Menu target page.
     */
    target_page: string;

    /**
     * Menu url.
     */
    url: string;

    /**
     * Menu capability.
     */
    capability: string;

    /**
     * Menu icon.
     */
    icon: string;

    /**
     * Menu open_in.
     */
    open_in: string;

    /**
     * Menu classes.
     */
    classes: string;

    /**
     * Menu id.
     */
    id: string;

    /**
     * Menu page_title.
     */
    page_title: string;

    /**
     * Menu window_title.
     */
    window_title: string;

    /**
     * Menu is_hide.
     */
    is_hide: boolean;

    /**
     * Menu is_custom.
     */
    is_custom: boolean;
}

export interface IMenu extends ISubmenu {
    /**
     * Array of submenu items.
     */
    submenu: ISubmenu[];
}

export interface IDefaultMenu {
    label: string;
    url: string;
    is_submenu: boolean;
}

export interface AdminMenuEditorState {
    /**
     * Menu Form data.
     */
    form: null | object;

    /**
     * Is items isLoading.
     */
    isLoading: boolean;

    /**
     * Menu isSaving or not.
     */
    isSaving: boolean;

    /**
     * Menu deleting or not.
     */
    isDeleting: boolean;

    /**
     * All  editorMenus as array of object.
     */
    editorMenus: Array<object>;

    /**
     * All  defaultMenus as array of object.
     */
    defaultMenus: IDefaultMenu[];

    /**
     * New menu details.
     */
    expandMenu: null | string;

    /**
     * Selected menu id
     */
    selectedMenu: null | number;

    /**
     * Selected submenu id
     */
    selectedSubmenu: null | number;

    /**
     * Menu list error.
     */
    errors: object;
}
