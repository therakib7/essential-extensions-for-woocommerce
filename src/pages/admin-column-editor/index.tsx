/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Layout from '@/components/layout/Layout';
import PageHeading from '@/components/layout/PageHeading';
import ColumnEditor from '@/components/admin-column-editor';
import Submit from '@/components/admin-column-editor/Submit';

/**
 * AdminMenuEditor
 *
 * @since 0.1.0
 */
const AdminMenuEditor = () => {
    /**
     * Get Page Content - Title and New Order button.
     *
     * @return JSX.Element
     */
    const pageTitleContent = (
        <div className="flex">
            <div className="flex-6 mr-3">
                <PageHeading text={__('Admin Column Editor', 'essential-extensions-for-woocommerce')} />
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
        <div className="">
            <Submit />
        </div>
    );

    return (
        <Layout
            title={pageTitleContent}
            slug="admin-column-editor"
            hasRightSideContent={true}
            rightSideContent={pageRightSideContent}
        >
            <ColumnEditor />
        </Layout>
    );
};

export default AdminMenuEditor;
