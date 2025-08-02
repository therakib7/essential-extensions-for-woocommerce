/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

interface ISelectListItem {
    /**
     * Selected action name.
     */
    action: string;

    /**
     * Set action name.
     */
    setAction: (action: string) => void;

    /**
     * Is Apply button clicked and loading.
     */
    applyActionLoading: boolean;

    /**
     * Handle Apply action.
     */
    handleApplyAction: () => void;
}

const SelectListItem = (props: ISelectListItem) => {
    const { setAction, action, handleApplyAction, applyActionLoading } = props;
    return (
        <span>
            <select
                className="mr-3 !border-gray-liter !bg-gray-liter py-2 mt-[-3px] focus:shadow-none focus:outline-none"
                onChange={(e) => setAction(e.target.value)}
            >
                <option value="">{__('Select Action', 'essential-extensions-for-woocommerce')}</option>
                <option value="delete">{__('Delete', 'essential-extensions-for-woocommerce')}</option>
            </select>
            <button
                disabled={action === '' || applyActionLoading}
                onClick={handleApplyAction}
                className="bg-gray-liter border-0 py-1.5 px-4 rounded"
            >
                {applyActionLoading
                    ? __('Applying…', 'essential-extensions-for-woocommerce')
                    : __('Apply', 'essential-extensions-for-woocommerce')}
            </button>
        </span>
    );
};

export default SelectListItem;
