/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useNavigate } from 'react-router-dom';

/**
 * Internal dependencies.
 */
import Button from '@/components/button';

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="dashboard grid gap-7 grid-cols-3 mt-5">
            <div className="card p-5">
                <h3 className="font-medium text-lg">
                    {__('Admin Menu Editor', 'essential-extensions-for-woocommerce')}
                </h3>
                <p>
                    {__(
                        'You can customize admin menu and submenu using this',
                        'essential-extensions-for-woocommerce',
                    )}
                </p>
                <div className="mt-4">
                    <Button
                        type="primary"
                        text={__('Admin Menu Editor', 'essential-extensions-for-woocommerce')}
                        onClick={() => navigate('/admin-menu-editor')}
                    />
                </div>
            </div>
            <div className="card p-5">
                <h3 className="font-medium text-lg">
                    {__('Admin Column Editor', 'essential-extensions-for-woocommerce')}
                </h3>
                <p>
                    {__(
                        'You can customize admin menu and submenu using this',
                        'essential-extensions-for-woocommerce',
                    )}
                </p>
                <div className="mt-4">
                    <Button
                        type="primary"
                        text={__('Admin Column Editor', 'essential-extensions-for-woocommerce')}
                        onClick={() => navigate('/admin-column-editor')}
                    />
                </div>
            </div>
            <div className="card p-5">
                <h3 className="font-medium text-lg">
                    {__('Admin Access Editor', 'essential-extensions-for-woocommerce')}
                </h3>
                <p>
                    {__(
                        'You can restrict admin menu and submenu using this',
                        'essential-extensions-for-woocommerce',
                    )}
                </p>
                <div className="mt-4">
                    <Button
                        type="primary"
                        text={__('Admin Access Editor', 'essential-extensions-for-woocommerce')}
                        onClick={() => navigate('/admin-access-editor/roles')}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
