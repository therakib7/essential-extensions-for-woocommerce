/**
 * External dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import { IMenu, IDefaultMenu, ISubmenu } from '@/interfaces/admin-menu-editor';
import ModalForm from '@/components/modal/Modal';
import Button from '@/components/button';
import { IInputResponse, Input } from '@/components/inputs';

interface FormProps {
    isNew?: boolean;
    data: IMenu | ISubmenu;
    defaultMenus: IDefaultMenu[];
    onSave: (updatedItem: IMenu | ISubmenu) => void;
    onClose: () => void;
}

const Form = ({ isNew, data, defaultMenus, onSave, onClose }: FormProps) => {
    const [form, setForm] = useState<IMenu | ISubmenu>(data);

    // Update the form state when the menu prop changes
    useEffect(() => {
        setForm(data);
    }, [data]);

    const handleInputChange = (input: IInputResponse) => {
        const value = typeof input.value === 'object' ? input.value?.value : input.value
        if ( input.name === 'target_page' ) {
            setForm((prevState) => ({
                ...prevState,
                [input.name]: value,
                ['url']: value,
            }));
        } else {
            setForm((prevState) => ({
                ...prevState,
                [input.name]: value,
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    const targetMenus = () => {
        let menus: any = [];
        defaultMenus.map((option: any) => {
            if (option.label) {
                let menu = { ...option };
                menu.value = option.url;
                if (option.is_submenu) {
                    menu.label = '- ' + option.label;
                    menus.push(menu);
                } else {
                    menus.push(menu);
                }
            }
        });
        return menus;
    };

    return (
        <ModalForm
            title={ isNew ? __('Add New Menu', 'essential-extensions-for-woocommerce') : __('Edit Menu', 'essential-extensions-for-woocommerce') }
            open={true}
            setOpen={onClose}
            size="semi-medium"
        >
            <form onSubmit={handleSubmit} className="">
                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <Input
                            id="label"
                            type="text"
                            label={__('Label', 'essential-extensions-for-woocommerce')}
                            value={form.label}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <Input
                            id="target_page"
                            type="select"
                            label={__('Target Page', 'essential-extensions-for-woocommerce')}
                            options={targetMenus()}
                            value={form.target_page}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <Input
                            id="url"
                            type="text"
                            label={__('URL', 'essential-extensions-for-woocommerce')}
                            required
                            value={form.url}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <Input
                            id="capability"
                            type="text"
                            label={__('Permission', 'essential-extensions-for-woocommerce')}
                            value={form.capability}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <Input
                            id="icon"
                            type="text"
                            label={__('Icon Class / Img URL', 'essential-extensions-for-woocommerce')}
                            value={form.icon}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <Input
                            id="open_in"
                            type="select"
                            label={__('Open In', 'essential-extensions-for-woocommerce')}
                            options={[
                                {
                                    label: __('Same window or tab', 'essential-extensions-for-woocommerce'),
                                    value: 'self',
                                },
                                {
                                    label: __('New window', 'essential-extensions-for-woocommerce'),
                                    value: 'blank',
                                },
                            ]}
                            value={form.open_in}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <Input
                            id="classes"
                            type="text"
                            label={__('Classes', 'essential-extensions-for-woocommerce')}
                            value={form.classes}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <Input
                            id="id"
                            type="text"
                            label={__('ID', 'essential-extensions-for-woocommerce')}
                            onChange={handleInputChange}
                            value={form.id}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <Input
                            id="page_title"
                            type="text"
                            label={__('Page Title', 'essential-extensions-for-woocommerce')}
                            value={form.page_title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <Input
                            id="window_title"
                            type="text"
                            label={__('Window Title', 'essential-extensions-for-woocommerce')}
                            onChange={handleInputChange}
                            value={form.window_title}
                        />
                    </div>
                </div>
                <Button
                    text={isNew ? __('Save', 'essential-extensions-for-woocommerce') : __('Apply', 'essential-extensions-for-woocommerce')}
                    type="submit"
                    icon={faCheckCircle}
                />
            </form>
        </ModalForm>
    );
};

export default Form;
