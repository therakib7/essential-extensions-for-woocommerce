/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import ActionItem from './ActionItem';
import { IColumn } from '@/interfaces/admin-column-editor';
import Button from '@/components/button';

interface ItemsProps {
    items: IColumn[];
    onOrderChange: (items: IColumn[]) => void;
    onSelect: (i: number) => void;
    onOpenForm: () => void;
    onDelete: (i: number) => void;
}

const Items = ({
    items,
    onOrderChange,
    onSelect,
    onOpenForm,
    onDelete,
}: ItemsProps) => {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    //const { delConfirm } = UseAlert();

    const handleDragStart = (i: number) => {
        setDraggedIndex(i);
    };

    const handleDragOver = (i: number) => {
        if (draggedIndex === null) return;
        if (i === draggedIndex) return;

        const reorderedItems = Array.from(items);
        const [draggedItem] = reorderedItems.splice(draggedIndex, 1);
        reorderedItems.splice(i, 0, draggedItem);
        onOrderChange(reorderedItems);
        setDraggedIndex(i);
    };

    const handleDelete = (i: number) => {
        // proAlert()
        /* delConfirm(() => {
            onDelete(i);
        }); */
    };

    return (
        <div className="">
            {items.map((item, i) => (
                <div
                    key={item.id}
                    className="essential-extensions-for-woocommerce-shortable-item flex justify-between items-center"
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={(e) => {
                        e.preventDefault();
                        handleDragOver(i);
                    }}
                >
                    <div dangerouslySetInnerHTML={{ __html: item.label }} />
                    <ActionItem
                        onEdit={() => onSelect(i)}
                        onHide={() => handleDelete(i)}
                    />
                </div>
            ))}

            <Button
                text={__('Add New Column', 'essential-extensions-for-woocommerce')}
                type="primary"
                icon={faPlus}
                onClick={onOpenForm}
            />
        </div>
    );
};

export default Items;
