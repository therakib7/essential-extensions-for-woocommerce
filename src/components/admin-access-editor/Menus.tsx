/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Menu, Submenu, IForm } from '@/interfaces/admin-access-editor';

interface SubmenusProps {
    menu: Menu;
    expandMenu: null | string;
    formData: IForm;
    submenu: Submenu[];
    onToggle: (menuUrl: string, submenuUrl: string) => void;
}

const Submenus = ({
    menu,
    expandMenu,
    formData,
    submenu,
    onToggle,
}: SubmenusProps) => {
    return (
        <div
            className={`essential-extensions-for-woocommerce-restrictions-submenu ${
                expandMenu === menu.url ? 'visible' : 'hidden'
            }`}
        >
            {submenu.map((item) => (
                <div key={item.url}>
                    <label htmlFor={`${item.url}`}>
                        <input
                            type="checkbox"
                            id={`${item.url}`}
                            checked={
                                formData.admin_menus[menu.url]?.includes(
                                    item.url,
                                ) || false
                            }
                            onChange={() => onToggle(menu.url, item.url)}
                        />
                        {item.label}
                    </label>
                </div>
            ))}
        </div>
    );
};

interface MenusProps {
    adminMenu: Menu[];
    formData: IForm;
    onToggle: (menuUrl: string) => void;
    expandMenu: null | string;
    onExpandMenu: (menuUrl: string) => void;
    onSubmenuToggle: (menuUrl: string, submenuUrl: string) => void;
}
const Menus = ({
    adminMenu,
    formData,
    onToggle,
    expandMenu,
    onExpandMenu,
    onSubmenuToggle,
}: MenusProps) => {
    return (
        <div className="">
            {adminMenu.map((menu) => (
                <div key={menu.url} className="essential-extensions-for-woocommerce-shortable-item">
                    <div className="flex justify-between items-center">
                        <label htmlFor={menu.url}>
                            <input
                                type="checkbox"
                                id={menu.url}
                                checked={
                                    formData.admin_menus[menu.url] !== undefined
                                }
                                onChange={() => onToggle(menu.url)}
                            />
                            {!menu.classes.includes('wp-menu-separator') && (
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: menu.label,
                                    }}
                                />
                            )}
                            {menu.classes.includes('wp-menu-separator') && (
                                <hr
                                    className="w-60 inline-block"
                                    style={{
                                        borderTop: '2px dashed #dfdfdf',
                                    }}
                                />
                            )}
                        </label>
                        {menu.submenu.length > 0 && (
                            <span
                                onClick={() => onExpandMenu(menu.url)}
                                className={`essential-extensions-for-woocommerce-arrow-icon ${
                                    expandMenu === menu.url
                                        ? 'essential-extensions-for-woocommerce-expanded'
                                        : 'essential-extensions-for-woocommerce-collapsed'
                                }`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                >
                                    <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
                                </svg>
                            </span>
                        )}
                    </div>

                    <Submenus
                        menu={menu}
                        expandMenu={expandMenu}
                        formData={formData}
                        submenu={menu.submenu}
                        onToggle={(menuUrl: string, submenuUrl: string) =>
                            onSubmenuToggle(menuUrl, submenuUrl)
                        }
                    />
                </div>
            ))}
        </div>
    );
};

export default Menus;
