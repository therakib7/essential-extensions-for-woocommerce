/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import ActionItem from './ActionItem';
import { IMenu, ISubmenu } from '@/interfaces/admin-menu-editor';
import Button from '@/components/button';

interface SubmenusProps {
    menuIndex: number;
    items: IMenu[];
    onOrderChange: (menu: IMenu[]) => void;
    item: IMenu;
    expandMenu: null | string;
    submenu: ISubmenu[];
    onSelect: (item: number, subitem?: number) => void;
    onHide: (item: number, subitem?: number) => void;
    onOpenForm: (item: number) => void;
}

const Submenus = ({
    menuIndex,
    items,
    item,
    submenu,
    onOrderChange,
    expandMenu,
    onSelect,
    onHide,
    onOpenForm,
}: SubmenusProps) => {
    const [dragSubmenuIndex, setDragSubmenuIndex] = useState<number | null>(
        null,
    );

    const handleDragSubitemStart = (submenuIndex: number) => {
        setDragSubmenuIndex(submenuIndex);
    };

    const handleDragSubitemOver = (targetSubmenuIndex: number) => {
        const draggedSubmenuIndex = dragSubmenuIndex;
        if (
            draggedSubmenuIndex === null ||
            draggedSubmenuIndex === targetSubmenuIndex
        ) {
            return;
        }

        // Immutably update submenu order
        const newSubmenu = [...submenu];
        const [draggedItem] = newSubmenu.splice(draggedSubmenuIndex, 1);
        newSubmenu.splice(targetSubmenuIndex, 0, draggedItem);

        // Update the parent menu array
        const updatedItems = [...items];
        updatedItems[menuIndex] = { ...item, submenu: newSubmenu };

        onOrderChange(updatedItems);
        setDragSubmenuIndex(targetSubmenuIndex);
    };

    return (
        <div
            className={`essential-extensions-for-woocommerce-restrictions-submenu mt-2 ${
                expandMenu === item.url ? 'visible' : 'hidden'
            }`}
        >
            {submenu.map((subitem, indexSubmenu) => (
                <div
                    key={subitem.url} // Ensure a unique key
                    className="essential-extensions-for-woocommerce-shortable-item flex justify-between items-center"
                    draggable
                    onDragStart={() => handleDragSubitemStart(indexSubmenu)}
                    onDragOver={(e) => {
                        e.preventDefault();
                        handleDragSubitemOver(indexSubmenu);
                    }}
                >
                    <label htmlFor={`${subitem.url}`}>{subitem.label}</label>
                    <ActionItem
                        onEdit={() => onSelect(menuIndex, indexSubmenu)}
                        onHide={() => onHide(menuIndex, indexSubmenu)}
                    />
                </div>
            ))}

            {!item.classes.includes('wp-menu-separator') && (
                <Button
                    text={__('Add New Submenu', 'essential-extensions-for-woocommerce')}
                    type="primary"
                    icon={faPlus}
                    onClick={() => onOpenForm(menuIndex)}
                />
            )}
        </div>
    );
};

interface MenusProps {
    items: IMenu[];
    onOrderChange: (menu: IMenu[]) => void;
    onSelect: (menu: number, subitem?: number) => void;
    onHide: (menu: number, subitem?: number) => void;
    expandMenu: null | string;
    onExpandMenu: (menuUrl: string) => void;
    onOpenForm: (menu: null | number) => void;
}
const Menus = ({
    items,
    onOrderChange,
    onSelect,
    onHide,
    expandMenu,
    onExpandMenu,
    onOpenForm,
}: MenusProps) => {
    const [dragItemIndex, setDragItemIndex] = useState<number | null>(null);

    const handleDragItemStart = (i: number) => {
        setDragItemIndex(i);
    };

    const handleDragItemOver = (i: number) => {
        if (dragItemIndex === null || i === dragItemIndex) return;

        // Immutably update menu order
        const reorderedItem = [...items];
        const [draggedItem] = reorderedItem.splice(dragItemIndex, 1);
        reorderedItem.splice(i, 0, draggedItem);
        onOrderChange(reorderedItem);
        setDragItemIndex(i);
    };

    const handleHide = (menu: number, submenu?: number) => {
        onHide(menu, submenu);
    };

    return (
        <div className="">
            {items.map((item, i) => (
                <div
                    key={item.url} // Ensure a unique key
                    className="essential-extensions-for-woocommerce-shortable-item"
                    draggable
                    onDragStart={() => handleDragItemStart(i)}
                    onDragOver={(e) => {
                        e.preventDefault();
                        handleDragItemOver(i);
                    }}
                >
                    <div className="flex justify-between items-center">
                        {!item.classes.includes('wp-menu-separator') && (
                            <div
                                dangerouslySetInnerHTML={{ __html: item.label }}
                            />
                        )}
                        {item.classes.includes('wp-menu-separator') && (
                            <hr
                                className="item-menu-separator"
                                style={{
                                    width: '84%',
                                    borderTop: '2px dashed #ddd',
                                }}
                            />
                        )}
                        <div className="flex">
                            <ActionItem
                                onEdit={() => onSelect(i)}
                                onHide={() => handleHide(i)}
                            />
                            <span
                                onClick={() => onExpandMenu(item.url)}
                                className={`essential-extensions-for-woocommerce-arrow-icon ${
                                    expandMenu === item.url
                                        ? 'essential-extensions-for-woocommerce-expanded'
                                        : 'essential-extensions-for-woocommerce-collapsed'
                                }`}
                                style={
                                    item.classes.includes('wp-menu-separator')
                                        ? { visibility: 'hidden' }
                                        : {}
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                >
                                    <path d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z" />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <Submenus
                        menuIndex={i}
                        items={items}
                        item={item}
                        submenu={item.submenu}
                        expandMenu={expandMenu}
                        onSelect={onSelect}
                        onHide={handleHide}
                        onOrderChange={onOrderChange}
                        onOpenForm={onOpenForm}
                    />
                </div>
            ))}

            <Button
                text={__('Add New Menu', 'essential-extensions-for-woocommerce')}
                type="primary"
                icon={faPlus}
                onClick={() => onOpenForm(null)}
            />
        </div>
    );
};

export default Menus;
