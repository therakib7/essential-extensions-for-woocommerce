/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { useParams, useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '@/components/button';
import Layout from '@/components/layout/Layout';
import Table from '@/components/table/Table';
import TableLoading from '@/components/preloader/TableLoading';
import PageHeading from '@/components/layout/PageHeading';
import { useSelect, useDispatch } from '@wordpress/data';
import adminAccessEditorStore from '@/data/admin-access-editor';
import {
    useTableHeaderData,
    useTableRowData,
} from '@/components/admin-access-editor/use-table-data';
import SelectCheckbox from '@/components/admin-access-editor/SelectCheckbox';
import { Input } from '@/components/inputs';
import { IItemFilter } from '@/interfaces/admin-access-editor';

export default function AccessEditor() {
    const { type = '' } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page, setPage] = useState(
        new URLSearchParams(location.search).get('pages') || 1,
    );
    const searched = new URLSearchParams(location.search).get('s');
    const [search, setSearch] = useState<string>(
        typeof searched === 'string' ? searched : '',
    );
    const [checkedAll, setCheckedAll] = useState(false);

    const items: Array<object> = useSelect(
        (select) => select(adminAccessEditorStore).getItems(type),
        [],
    );

    useEffect(() => {

    }, [type]);

    const totalItems: number = useSelect(
        (select) => select(adminAccessEditorStore).getTotalItems(),
        [],
    );
    const filters: IItemFilter = useSelect(
        (select) => select(adminAccessEditorStore).getFilters(),
        [],
    );
    const isLoading: boolean = useSelect(
        (select) => select(adminAccessEditorStore).getIsLoading(),
        [],
    );

    // useEffect(() => {
    //     dispatch(adminAccessEditorStore).setFilters({
    //         ...filters,
    //         page,
    //         search,
    //     });
    // }, [page, search]);

    /**
     * Process search-bar, tab and pagination clicks.
     *
     * @param  pagePassed
     * @param  searchPassed
     * @return {void}
     */
    const processAndNavigate = (
        pagePassed: number = 0,
        searchPassed: string | null = null,
    ) => {
        const pageData = pagePassed === 0 ? page : pagePassed;
        const searchData = searchPassed === '' ? search : searchPassed;
        navigate(
            `/admin-access-editor/${type}?pages=${pageData}&s=${searchData}`,
        );
        setPage(pageData);

        dispatch(adminAccessEditorStore).setFilters(type, {
            ...filters,
            page: pageData,
            search: searchData,
        });
    };

    // TODO: Implement this later.
    const [checked, setChecked] = useState<Array<number>>([]);
    const checkItem = (itemId: number, isChecked = false) => {
        const itemsData = [];
        if (itemId === 0) {
            if (isChecked) {
                itemsData.push(...items.map((item) => item.id));
            }
            setChecked(itemsData);
        } else {
            setChecked([...checked, itemId]);
        }
    };

    /**
     * Handle Checked and unchecked.
     */
    useEffect(() => {
        if (items.length === checked.length && checked.length > 0) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }, [items, checked]);

    /**
     * Go to single form by id
     *
     * @since 0.1.0
     *
     * @param {string} id
     */
    const goForm = (id?: string) => {
        if (id) {
            navigate(`/admin-access-editor/${type}/${id}/edit`);
        } else {
            navigate(`/admin-access-editor/${type}/add`);
        }
    };

    /**
     * Get Page Content - Title and New Order button.
     *
     * @return JSX.Element
     */
    const pageTitleContent = (
        <>
            <div className="flex">
                <div className="flex-6 mr-3">
                    <PageHeading text={__('Access Editor', 'essential-extensions-for-woocommerce')} />
                </div>
                <div className="flex-1 text-left">
                    <Button
                        text={__('Roles', 'essential-extensions-for-woocommerce')}
                        type={ type === 'roles' ? 'primary' : 'default' }
                        onClick={() => navigate(`/admin-access-editor/roles`)}
                        buttonCustomClass=""
                    />
                    <Button
                        text={__('Users', 'essential-extensions-for-woocommerce')}
                        type={ type === 'users' ? 'primary' : 'default' }
                        onClick={() => navigate(`/admin-access-editor/users`)}
                        buttonCustomClass=""
                    />
                </div>
            </div>
        </>
    );

    /**
     * Get Right Side Content - AccessEditor Search Input.
     *
     * @param  data
     */
    const pageRightSideContent = (
        <div className="flex">
            <Button
                text={ type === 'users' ? __('Restrict User', 'essential-extensions-for-woocommerce') : __('Restrict Role', 'essential-extensions-for-woocommerce') }
                type="primary"
                icon={faPlus}
                onClick={() => goForm()}
            />
            <Input
                type="text"
                placeholder={ type === 'users' ? __('Search User', 'essential-extensions-for-woocommerce') : __('Search Role', 'essential-extensions-for-woocommerce') }
                onChange={(data) => {
                    setSearch(data.value);
                    processAndNavigate(page, data.value);
                }}
                value={search}
                className="w-full ml-3 md:w-70"
            />
        </div>
    );

    const tableResponsiveColumns = ['sl', 'title', 'actions'];
    const tableHeaders = useTableHeaderData(type);
    const tableRows = useTableRowData(type, items, checked);

    return (
        <Layout
            title={pageTitleContent}
            slug="admin-access-editor"
            hasRightSideContent={true}
            rightSideContent={pageRightSideContent}
        >
            {isLoading ? (
                <TableLoading
                    headers={tableHeaders}
                    responsiveColumns={tableResponsiveColumns}
                    hasCheckbox={false}
                    count={5}
                />
            ) : (
                <>
                    {checked.length > 0 && (
                        <SelectCheckbox
                            checked={checked}
                            onChange={(resp) => checkItem()}
                        />
                    )}

                    <Table
                        headers={tableHeaders}
                        rows={tableRows}
                        totalItems={totalItems}
                        perPage={10}
                        onCheckAll={(isChecked: boolean) => {
                            checkItem(0, isChecked);
                            setCheckedAll(isChecked);
                        }}
                        responsiveColumns={tableResponsiveColumns}
                        checkedAll={checkedAll}
                        noDataMessage={__('Sorry! No data found…', 'essential-extensions-for-woocommerce')}
                        currentPage={
                            typeof page === 'number' ? parseInt(page) : 1
                        }
                        onChangePage={(page) =>
                            processAndNavigate(page, search)
                        }
                    />
                </>
            )}
        </Layout>
    );
}
