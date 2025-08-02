/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const NoPermission = () => {
    return (
        <div className="essential-extensions-for-woocommerce-403">
            <h3>{__('Permission Denied!', 'essential-extensions-for-woocommerce')}</h3>
        </div>
    );
};
export default NoPermission;
