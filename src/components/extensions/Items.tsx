/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { IExtension } from '@/interfaces/extensions';
import { Input } from '@/components/inputs';

type ItemProps = {
    item: IExtension;
    onChange: (id: string, is_active: boolean ) => void;
};

const Item = ({ item, onChange }: ItemProps) => {
    const handleCheckboxChange = () => {
        onChange(item.id, !item.is_active);
    };

    return (
        <div className="card p-5 mt-0">
            <h3 className="font-medium text-lg">{item.title}</h3>
            <p className=" ">{item.description}</p>
            <div className="mt-4">
                <Input
                    id="is_active"
                    type="switch"
                    label={''}
                    areaClassName="!block mb-5"
                    value={item.is_active}
                    onChange={handleCheckboxChange}
                />
            </div>
        </div>
    );
};

interface ItemsProps {
    items: IExtension[];
    onChange: (id: string, is_active: boolean) => void;
}

const Items = ({ items, onChange }: ItemsProps) => {
    return (
        <div className="grid gap-7 grid-cols-3">
            {items.map((item) => (
                <Item key={item.id} item={item} onChange={onChange} />
            ))}
        </div>
    );
};

export default Items;
