/**
 * External dependencies.
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import Card from '@/components/layout/Card';
import Submit from './Submit';
import settingsStore from '@/data/settings';
import { IInputResponse, Input } from '@/components/inputs';
import RepeaterField from '@/components/inputs/Repeater';

const fields = [
    {
        id: 'website',
        className: 'field-website',
        value: '',
        type: 'url',
        label: __('Website', 'essential-extensions-for-woocommerce'),
        placeholder: __('Enter Website', 'essential-extensions-for-woocommerce'),
    },
    {
        id: 'api_key',
        className: 'field-api_key',
        value: '',
        type: 'api',
        label: __('API Key', 'essential-extensions-for-woocommerce'),
        placeholder: __('Enter API Key', 'essential-extensions-for-woocommerce'),
    },
];

const mergeDefaultValues = (fields: any, defaultValues: any) => {
    return defaultValues.map((group: any) => {
        return fields.map((field: any) => {
            const defaultValue = group.find(
                (item: any) => item.id === field.id,
            );
            return {
                ...field,
                value: defaultValue ? defaultValue.value : field.value,
            };
        });
    });
};

interface FormType {
    websites: Array<Array<{ id: string; value: any }>>;
    [key: string]: any;
}

export default function SettingForm() {
    const dispatch = useDispatch();

    const form = useSelect(
        (select) => select(settingsStore).getForm(),
        [],
    ) as FormType;

    const websites: any = form.websites.length
        ? mergeDefaultValues(fields, form.websites)
        : [];

    const isLoading: boolean = useSelect(
        (select) => select(settingsStore).getIsLoading(),
        [],
    );

    const handleGroupsChange = (updatedGroups: any) => {
        dispatch(settingsStore).setForm({
            ...form,
            ['websites']: updatedGroups,
        });
    };

    return (
        <div className="mt-10 mx-auto md:max-w-4xl">
            <form>
                <div className="md:flex md:flex-col">
                    {isLoading ? (
                        <div className="md:flex-1">
                            <Card>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                            </Card>
                            <Card>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                                <div className="animate-pulse h-4 bg-slate-100 w-full p-2.5 rounded-lg mt-5"></div>
                            </Card>
                        </div>
                    ) : (
                        <>
                            <div className="md:flex-1">
                                <Card className="">
                                    <RepeaterField
                                        label={__('Store Websites', 'essential-extensions-for-woocommerce')}
                                        addLabel={__('Add Website', 'essential-extensions-for-woocommerce')}
                                        fields={fields}
                                        groups={websites}
                                        onChange={handleGroupsChange}
                                    />
                                </Card>

                                <div className="flex justify-end md:hidden">
                                    <Submit />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}
