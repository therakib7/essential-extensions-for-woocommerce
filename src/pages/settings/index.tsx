/**
 * External dependencies
 */
import { useSelect } from '@wordpress/data';
import { useNavigate } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Layout from '@/components/layout/Layout';
import PageHeading from '@/components/layout/PageHeading';
import Form from '@/components/settings/Form';
import Submit from '@/components/settings/Submit';
import settingsStore from '@/data/settings';
export default function AddOrder() {
    const navigate = useNavigate();

    useSelect((select) => select(settingsStore).getFormData(), []);

    /**
     * Get Page Content - Title and New Order button.
     *
     * @return JSX.Element
     */
    const pageTitleContent = (
        <div className="">
            <div className="mr-3 mb-4">
                <button
                    onClick={() => navigate('/')}
                    className="text-gray-dark border-none"
                >
                    ← {__('Back to Home', 'essential-extensions-for-woocommerce')}
                </button>
            </div>
            <div className="text-left">
                <PageHeading text={__('Settings', 'essential-extensions-for-woocommerce')} />
            </div>
        </div>
    );

    /**
     * Get Right Side Content - Add Order form data.
     */
    const pageRightSideContent = (
        <div className="mt-7 fixed invisible md:visible md:top-28 right-10 z-50">
            <Submit />
        </div>
    );

    return (
        <Layout
            title={pageTitleContent}
            slug="settings"
            hasRightSideContent={true}
            rightSideContent={pageRightSideContent}
        >
            <Form />
        </Layout>
    );
}
