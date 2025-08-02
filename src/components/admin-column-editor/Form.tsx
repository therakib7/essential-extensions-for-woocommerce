/**
 * External dependencies
 */
import { useState, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import { IColumn, IDefaultColumn } from '@/interfaces/admin-column-editor';
import ModalForm from '@/components/modal/Modal';
import Button from '@/components/button';
import { IInputResponse, Input } from '@/components/inputs';

interface FormProps {
    isNew?: boolean;
    data: IColumn;
    defaultColumns: IDefaultColumn[];
    onSave: (updatedItem: IColumn) => void;
    onClose: () => void;
}

const Form = ({ isNew, data, defaultColumns, onSave, onClose }: FormProps) => {
    const [form, setForm] = useState<IColumn>(data);

    // Update the form state when the menu prop changes
    useEffect(() => {
        setForm(data);
    }, [data]);

    const handleInputChange = (input: IInputResponse) => {
        setForm((prevState) => ({
            ...prevState,
            [input.name]: typeof input.value === 'object'
            ? input.value?.value
            : input.value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    };

    return (
        <ModalForm
            title={isNew ? __('Add New Column', 'essential-extensions-for-woocommerce') : __('Edit Column', 'essential-extensions-for-woocommerce')}
            open={true}
            setOpen={onClose}
            size="small"
        >
            <form onSubmit={handleSubmit} className="">
                <div className="mb-3">
                    <div>
                        <Input
                            id="label"
                            type="text"
                            label={__('Label', 'essential-extensions-for-woocommerce')}
                            value={form.label}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <div>
                        <Input
                            id="type"
                            type="select"
                            label={__('Type', 'essential-extensions-for-woocommerce')}
                            options={[
                                {
                                    label: __('Text', 'essential-extensions-for-woocommerce'),
                                    value: 'text'
                                },
                                {
                                    label: __('Email', 'essential-extensions-for-woocommerce'),
                                    value: 'email'
                                }
                            ]}
                            value={form.type}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <Input
                            id="width"
                            type="text"
                            label={__('Width', 'essential-extensions-for-woocommerce')}
                            onChange={handleInputChange}
                            value={form.width}
                        />
                    </div>

                    <div>
                        <Input
                            id="width_unit"
                            type="select"
                            label={__('Width Unit', 'essential-extensions-for-woocommerce')}
                            options={[
                                {
                                    label: '%',
                                    value: '%'
                                },
                                {
                                    label: 'px',
                                    value: 'px'
                                }
                            ]}
                            value={form.width_unit}
                            onChange={handleInputChange}
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
