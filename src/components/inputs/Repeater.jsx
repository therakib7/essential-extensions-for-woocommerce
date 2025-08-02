/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

/**
 * Internal dependencies.
 */
import Label from './Label';
import { Input } from '@/components/inputs';

function RepeaterGroup({
    groupFields,
    groupIndex,
    handleInputChange,
    handleRemove,
}) {
    return (
        <div className="repeater-group mb-4 p-4 pt-1 border border-gray-lite rounded relative">
            {groupFields.map((field, fieldIndex) => {
                const uniqueId = `${field.id}-${groupIndex}`;
                return (
                    <div key={fieldIndex} className="mb-2">
                        <Input
                            {...field}
                            id={uniqueId}
                            onChange={(val) =>
                                handleInputChange(groupIndex, field.id, val)
                            }
                        />
                    </div>
                );
            })}
            <button
                type="button"
                className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => handleRemove(groupIndex)}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
}

export default function RepeaterField({
    label,
    addLabel = __('Add Group', 'essential-extensions-for-woocommerce'),
    fields,
    groups,
    onChange,
}) {
    const handleAdd = () => {
        onChange([...groups, fields.map((field) => ({ ...field, value: '' }))]);
    };

    const handleRemove = (index) => {
        Swal.fire({
            title: __('Are you sure?', 'essential-extensions-for-woocommerce'),
            text: __('Are you sure to delete this?', 'essential-extensions-for-woocommerce'),
            showCancelButton: true,
            confirmButtonText: __('Confirm', 'essential-extensions-for-woocommerce'),
            confirmButtonColor: '#1c64f2',
            showLoaderOnConfirm: true,
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedGroups = groups.filter(
                    (_, groupIndex) => groupIndex !== index,
                );
                onChange(updatedGroups);
            }
        });
    };

    const handleInputChange = (groupIndex, fieldId, { name, value }) => {
        const updatedGroups = groups.map((group, index) => {
            if (index === groupIndex) {
                return group.map((field) =>
                    field.id === fieldId ? { ...field, value } : field,
                );
            }
            return group;
        });

        onChange(updatedGroups);
    };

    return (
        <div>
            <Label>{label}</Label>
            {groups.map((groupFields, groupIndex) => (
                <RepeaterGroup
                    key={groupIndex}
                    groupFields={groupFields}
                    groupIndex={groupIndex}
                    handleInputChange={handleInputChange}
                    handleRemove={handleRemove}
                />
            ))}
            <button
                type="button"
                className="mt-1 p-2 bg-blue-500 text-white rounded"
                onClick={handleAdd}
            >
                {addLabel}
            </button>
        </div>
    );
}
