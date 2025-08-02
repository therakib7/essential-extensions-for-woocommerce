/**
 * External dependencies
 */
import { useParams } from 'react-router-dom';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Layout from '@/components/layout/Layout';
import PageHeading from '@/components/layout/PageHeading';
import Form from '@/components/admin-access-editor/Form';
import Submit from '@/components/admin-access-editor/Submit';

export default function AccessEditorSingle() {
    const { type, id = '' } = useParams();

    let page_title = '';
    if (type && id) {
        page_title = __('Edit Access', 'essential-extensions-for-woocommerce');
    } else {
        page_title = __('Add Access', 'essential-extensions-for-woocommerce');
    }

    /**
     * Get Page Content - Title and New Access button.
     *
     * @return JSX.Element
     */
    const pageTitleContent = (
        <div className="flex">
            <div className="flex-6 mr-3">
                <PageHeading text={page_title} />
            </div>
            <div className="flex-1 text-left"></div>
        </div>
    );

    /**
     * Get Right Side Content - Create Access form data.
     */
    const pageRightSideContent = (
        <div className="">
            <Submit />
        </div>
    );

    return (
        <Layout
            title={pageTitleContent}
            slug="admin-access-editor-form"
            hasRightSideContent={true}
            rightSideContent={pageRightSideContent}
        >
            <Form />
        </Layout>
    );
}
