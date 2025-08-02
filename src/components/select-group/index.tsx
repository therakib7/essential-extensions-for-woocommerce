/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
interface OptionGroup {
    label: string;
    options: Option[];
}

interface Option {
    label: string;
    value: string;
}

interface SelectGroupProps {
    groups: OptionGroup[];
    value: string;
    onChange: (value: string) => void;
}

const SelectGroup = ({
    groups,
    value,
    onChange,
}: SelectGroupProps) => {
    const handleSelectChange = (e: any) => {
        const value = e.target.value;
        onChange(value);
    };

    return (
        <select
            value={value}
            onChange={handleSelectChange}
            className="essential-extensions-for-woocommerce-input"
            style={{
                width: 120,
            }}
        >
            {!value && <option value="">{__('Select', 'essential-extensions-for-woocommerce')}</option>}

            {groups.map((group: OptionGroup) => (
                <optgroup key={group.label} label={group.label}>
                    {group.options.map((option: Option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </optgroup>
            ))}
        </select>
    );
};

export default SelectGroup;
