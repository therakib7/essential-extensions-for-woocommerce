/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import MenuLoading from '@/components/preloader/MenuLoading';
import { useSelect, useDispatch } from '@wordpress/data';
import adminMenuEditorStore from '@/data/admin-menu-editor';
import { IMenu, ISubmenu } from '@/interfaces/admin-menu-editor';
import { defaultForm } from '@/data/admin-menu-editor/default-state';
import Menus from './Menus';
import Form from './Form';

/**
 * MenuEditor Component.
 *
 * Handles Menus component rendering.
 *
 * @param  props
 */
const MenuEditor = () => {
    const dispatch = useDispatch();

    const isLoading: boolean = useSelect(
        (select) => select(adminMenuEditorStore).getIsLoading(),
        [],
    );

    const defaultMenus = useSelect(
        (select) => select(adminMenuEditorStore).getDefaultMenu(),
        [],
    );

    const editorMenus = useSelect(
        (select) => select(adminMenuEditorStore).getEditorMenu(),
        [],
    );

    const form = useSelect(
        (select) => select(adminMenuEditorStore).getForm(),
        [],
    );

    const expandMenu = useSelect(
        (select) => select(adminMenuEditorStore).getExpandMenu(),
        [],
    );

    const selectedMenu = useSelect(
        (select) => select(adminMenuEditorStore).getSelectedMenu(),
        [],
    );

    const selectedSubmenu = useSelect(
        (select) => select(adminMenuEditorStore).getSelectedSubmenu(),
        [],
    );

    const handleExpandMenu = (url: string) => {
        const expand_url = expandMenu === url ? null : url;
        dispatch(adminMenuEditorStore).setExpandMenu(expand_url);
    };

    const handleOrderMenu = (newMenu: IMenu[]) => {
        dispatch(adminMenuEditorStore).setEditorMenus(newMenu);
    };

    const handleSelectMenu = (
        indexMenu: number | null,
        indexSubmenu: number | null = null,
    ) => {
        dispatch(adminMenuEditorStore).setSelectedMenu(indexMenu);
        dispatch(adminMenuEditorStore).setSelectedSubmenu(indexSubmenu);
    };

    const handleOpenFormMenu = (indexMenu: null | number) => {
        dispatch(adminMenuEditorStore).setSelectedMenu(indexMenu);

        let formData = { ...defaultForm };
        formData.label =
            indexMenu !== null
                ? __('Submenu Name', 'essential-extensions-for-woocommerce')
                : __('Menu Name', 'essential-extensions-for-woocommerce');

        dispatch(adminMenuEditorStore).setForm(formData);
    };

    const handleCloseMenu = () => {
        dispatch(adminMenuEditorStore).setForm(null);
        dispatch(adminMenuEditorStore).setSelectedMenu(null);
    };

    const handleSaveMenu = (newItem: IMenu | ISubmenu) => {
        if (selectedMenu !== null && 'submenu' in newItem) {
            // Add a new submenu item
            const updatedItems: any = [...editorMenus];
            updatedItems[selectedMenu].submenu.push(newItem as ISubmenu);
            dispatch(adminMenuEditorStore).setEditorMenus(updatedItems);
        } else {
            // Add a new main menu item
            dispatch(adminMenuEditorStore).setEditorMenus([
                ...editorMenus,
                newItem as IMenu,
            ]);
        }
        dispatch(adminMenuEditorStore).setForm(null);
        dispatch(adminMenuEditorStore).setSelectedMenu(null);
    };

    const handleChangeMenu = (updatedItem: IMenu | ISubmenu) => {
        const updatedItems: any = editorMenus;
        if (selectedMenu !== null && selectedSubmenu !== null) {
            updatedItems[selectedMenu].submenu[selectedSubmenu] =
                updatedItem as ISubmenu;
        } else if (selectedMenu !== null) {
            updatedItems[selectedMenu] = updatedItem as IMenu;
        }
        dispatch(adminMenuEditorStore).setEditorMenus(updatedItems);

        // Reset the editedItemIndex
        handleSelectMenu(null);
    };

    const handleHideMenu = (menu: number, submenu?: number) => {
        /* console.log(submenu);
		const updatedItems = [...state.items];
		updatedItems.splice(menu, 1);
		dispatch({ type: 'set_items', payload: updatedItems }); */
    };

    return (
        <>
            <div className="essential-extensions-for-woocommerce-admin-menu-items mx-auto">
                {isLoading ? (
                    <MenuLoading />
                ) : (
                    <>
                        <Menus
                            items={editorMenus}
                            onOrderChange={handleOrderMenu}
                            onSelect={handleSelectMenu}
                            onHide={handleHideMenu}
                            onExpandMenu={handleExpandMenu}
                            expandMenu={expandMenu}
                            onOpenForm={handleOpenFormMenu}
                        />

                        {form && (
                            <Form
                                isNew
                                data={form}
                                defaultMenus={defaultMenus}
                                onSave={handleSaveMenu}
                                onClose={handleCloseMenu}
                            />
                        )}

                        {!form &&
                            selectedMenu !== null &&
                            editorMenus[selectedMenu] && (
                                <Form
                                    data={
                                        selectedMenu !== null &&
                                        selectedSubmenu !== null
                                            ? editorMenus[selectedMenu].submenu[
                                                  selectedSubmenu
                                              ]
                                            : editorMenus[selectedMenu]
                                    }
                                    defaultMenus={defaultMenus}
                                    onSave={handleChangeMenu}
                                    onClose={() => handleSelectMenu(null)}
                                />
                            )}
                    </>
                )}
            </div>
        </>
    );
};

export default MenuEditor;
