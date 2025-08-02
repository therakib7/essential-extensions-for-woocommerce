/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import ActionItem from './ActionItem';
import { ITableHeader, ITableRow } from '@/components/table/TableInterface';
import { Input } from '@/components/inputs';

export const useTableHeaderData = (type: string): ITableHeader[] => {
    let header = [
        /* {
            key: 'cb',
            title: '',
            className: '',
        }, */
    ];

    if (type === 'roles') {
        header.push({
            key: 'id',
            title: __('Label', 'essential-extensions-for-woocommerce'),
            className: '',
        });
    } else {
        header.push({
            key: 'id',
            title: __('ID', 'essential-extensions-for-woocommerce'),
            className: '',
        });
        header.push({
            key: 'name',
            title: __('Name', 'essential-extensions-for-woocommerce'),
            className: '',
        });
        header.push({
            key: 'email',
            title: __('Email', 'essential-extensions-for-woocommerce'),
            className: '',
        });
    }

    header.push({
        key: 'actions',
        title: __('Action', 'essential-extensions-for-woocommerce'),
        className: '',
    });

    return header;
};

export const useTableRowData = (
    type: string,
    items = [],
    checked: number | string[],
): ITableRow[] => {
    const rowsData: ITableRow[] = [];

    items.forEach((row, index) => {
        if (type === 'roles') {
            rowsData.push({
                id: row.id,
                cells: [
                    /* {
                        key: 'cb',
                        value: (
                            <Input
                                value={checked.includes(row.id) ? '1' : '0'}
                                type="checkbox"
                                // onChange={() => checkItem(row.id)}
                            />
                        ),
                        className: '',
                    }, */
                    {
                        key: 'id',
                        value: row.id,
                        className: 'text-nowrap',
                    },
                    {
                        key: 'actions',
                        value: (
                            <div>
                                <ActionItem item={row} />
                            </div>
                        ),
                        className: '',
                    },
                ],
            });
        } else {
            rowsData.push({
                id: row.id,
                cells: [
                    /* {
                        key: 'cb',
                        value: (
                            <Input
                                value={checked.includes(row.id) ? '1' : '0'}
                                type="checkbox"
                                // onChange={() => checkOrder(row.id)}
                            />
                        ),
                        className: '',
                    }, */
                    {
                        key: 'id',
                        value: row.id,
                        className: 'text-nowrap',
                    },
                    {
                        key: 'name',
                        value: row.name,
                        className: 'text-nowrap',
                    },
                    {
                        key: 'email',
                        value: row.email,
                        className: 'text-nowrap',
                    },
                    {
                        key: 'actions',
                        value: (
                            <div>
                                <ActionItem item={row} />
                            </div>
                        ),
                        className: '',
                    },
                ],
            });
        }
    });

    return rowsData;
};
