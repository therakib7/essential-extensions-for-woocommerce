/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import MenuLoading from '@/components/preloader/MenuLoading';
import { useSelect, useDispatch } from '@wordpress/data';
import extensionsStore from '@/data/extensions';
import Items from './Items';

/**
 * Extensions Component.
 *
 * Handles Extensions component rendering.
 *
 * @param  props
 */
const Extensions = () => {
    const dispatch = useDispatch();

    const isLoading: boolean = useSelect(
        (select) => select(extensionsStore).getIsLoading(),
        [],
    );

    const extensions = useSelect((select) => select(extensionsStore).getExtensions(), []);

    const handleOnChange = (id: string, is_active: boolean) => {
        const updatedExtensions = extensions.map((extension) =>
            extension.id === id ? { ...extension, is_active } : extension,
        );
        dispatch(extensionsStore).setExtensions(updatedExtensions);
    };

    return (
        <div className="essential-extensions-for-woocommerce-extensions max-w-screen-lg mx-auto">
            {isLoading ? (
                <MenuLoading />
            ) : (
                <Items items={extensions} onChange={handleOnChange} />
            )}
        </div>
    );
};

export default Extensions;
