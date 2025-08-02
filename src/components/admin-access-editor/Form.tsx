/**
 * External dependencies.
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useParams } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import MenuLoading from '@/components/preloader/MenuLoading';
import Card from '@/components/layout/Card';
import adminAccessEditorStore from '@/data/admin-access-editor';
import { IInputResponse, Input } from '@/components/inputs';
import { IFormData, IForm } from '@/interfaces/admin-access-editor';
import Menus from './Menus';

export default function Form() {
    const dispatch = useDispatch();
    const { type, id = 0 } = useParams();

    const errors: object = useSelect(
        (select) => select(adminAccessEditorStore).getErrors(),
        [],
    );

    const form_data: IFormData = useSelect(
        (select) => select(adminAccessEditorStore).getFormData(type, id),
        [],
    );

    const form: IForm = useSelect(
        (select) => select(adminAccessEditorStore).getForm(),
        [],
    );

    const isLoading: boolean = useSelect(
        (select) => select(adminAccessEditorStore).getIsLoading(),
        [],
    );

    const handleInputChange = (input: IInputResponse) => {
        dispatch(adminAccessEditorStore).setForm({
            ...form,
            [input.name]:
                typeof input.value === 'object'
                    ? input.value?.value
                    : input.value,
        });
    };

    const expandMenu = useSelect(
        (select) => select(adminAccessEditorStore).getExpandMenu(),
        [],
    );

    const handleExpandMenu = (url: string) => {
        const expand_url = expandMenu === url ? null : url;
        dispatch(adminAccessEditorStore).setExpandMenu(expand_url);
    };

    const handleMenuToggle = (url: string) => {
        const updatedAdminMenu = { ...form.admin_menus };

        if (updatedAdminMenu[url]) {
            delete updatedAdminMenu[url]; // Remove main menu URL if it exists
        } else {
            updatedAdminMenu[url] =
                form_data.admin_menus
                    .find((menu) => menu.url === url)
                    ?.submenu.map((submenu) => submenu.url) || [];
        }
        dispatch(adminAccessEditorStore).setForm({
            ...form,
            admin_menus: updatedAdminMenu,
        });
    };

    const handleSubMenuToggle = (menuUrl: string, subMenuUrl: string) => {
        const updatedAdminMenu = { ...form.admin_menus };
        if (!updatedAdminMenu[menuUrl]) {
            updatedAdminMenu[menuUrl] = [];
        }
        const submenuIndex = updatedAdminMenu[menuUrl].indexOf(subMenuUrl);
        if (submenuIndex !== -1) {
            updatedAdminMenu[menuUrl].splice(submenuIndex, 1); // Remove submenu URL if it exists
        } else {
            updatedAdminMenu[menuUrl].push(subMenuUrl); // Add submenu URL
        }
        dispatch(adminAccessEditorStore).setForm({
            ...form,
            admin_menus: updatedAdminMenu,
        });
    };

    return (
        <div className="mt-10">
            <div className="essential-extensions-for-woocommerce-admin-access-items mx-auto">
                {isLoading ? (
                    <MenuLoading />
                ) : (
                    <>
                        <Card className="product-info">
                            <Input
                                id="id"
                                type="select"
                                label={
                                    type === 'users'
                                    ? __('Select User', 'essential-extensions-for-woocommerce')
                                    : __('Select Role', 'essential-extensions-for-woocommerce')
                                }
                                options={form_data.ids}
                                value={form.id}
                                onChange={handleInputChange}
                            />
                        </Card>
                        <Card className="menu-items">
                            <Menus
                                adminMenu={form_data.admin_menus}
                                formData={form}
                                onToggle={handleMenuToggle}
                                onExpandMenu={handleExpandMenu}
                                expandMenu={expandMenu}
                                onSubmenuToggle={(menuUrl, submenuUrl) =>
                                    handleSubMenuToggle(menuUrl, submenuUrl)
                                }
                            />
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
}
