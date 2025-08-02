/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Layout from '@/components/layout/Layout';
import PageHeading from '@/components/layout/PageHeading';
import Extensions from '@/components/extensions';
import Submit from '@/components/extensions/Submit';

/**
 * ExtensionsPage
 *
 * @since 0.1.0
 */
const ExtensionsPage = () => {
    /**
     * Get Page Content - Title and New Order button.
     *
     * @return JSX.Element
     */
    const pageTitleContent = (
        <div className="flex">
            <div className="flex-6 mr-3">
                <PageHeading text={__('Extensions', 'essential-extensions-for-woocommerce')} />
            </div>
            <div className="flex-1 text-left"></div>
        </div>
    );

    /**
     * Get Right Side Content
     *
     * @param  data
     */
    const pageRightSideContent = (
        <div className="mb-3">
            <Submit />
        </div>
    );

    return (
        <Layout
            title={pageTitleContent}
            slug="extensions"
            hasRightSideContent={true}
            rightSideContent={pageRightSideContent}
        >
            <Extensions />
        </Layout>
    );
};

export default ExtensionsPage;
