/**
 * External dependencies.
 */
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Fragment } from '@wordpress/element';
import { Menu, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsisV,
    faPencilAlt,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { __ } from '@wordpress/i18n';
import { dispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import adminAccessEditorStore from '@/data/admin-access-editor';
import { IItem } from '@/interfaces/admin-access-editor';

export default function ActionItem({ item }: IItem) {
    const { type } = useParams();

    const { id } = item;

    const isDeleting: boolean = useSelect(
        (select) => select(adminAccessEditorStore).getIsDeleting(),
        [],
    );

    const showDeleteAlert = () => {
        Swal.fire({
            title: __('Are you sure?', 'essential-extensions-for-woocommerce'),
            text: __('Are you sure to delete the role access?', 'essential-extensions-for-woocommerce'),
            showCancelButton: true,
            confirmButtonText: __('Confirm', 'essential-extensions-for-woocommerce'),
            confirmButtonColor: '#1c64f2',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return dispatch(adminAccessEditorStore)
                    .deleteItems({
                        ids: [id],
                        type
                    })
                    .then(() => {
                        return true;
                    })
                    .catch((error) => {
                        Swal.showValidationMessage(
                            `Request failed: ${error.message}`,
                        );
                    });
            },
            allowOutsideClick: () => isDeleting,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(__('Deleted!', 'essential-extensions-for-woocommerce'), '', 'success');
            }
        });
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full pr-3 pl-0 py-2 text-sm font-medium">
                    <FontAwesomeIcon
                        icon={faEllipsisV}
                        color={'#ddd'}
                        className="mr-1"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute w-40 z-10 top-4 -left-28 mt-2 origin-top-right rounded-md shadow-lg bg-white p-2 border-gray-dark">
                    <div className="px-1 py-1 bg-white">
                        <Menu.Item>
                            <Link
                                to={`/admin-access-editor/${type}/${id}/edit`}
                                className="text-left hover:opacity-80 block text-slate-600 hover:text-slate-700 group items-center w-full px-3 text-sm bg-white outline-none hover:outline-none focus:outline-none focus:shadow-none mb-2"
                            >
                                <FontAwesomeIcon icon={faPencilAlt} />
                                <span className="ml-2">
                                    {__('Edit', 'essential-extensions-for-woocommerce')}
                                </span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item>
                            <button
                                onClick={showDeleteAlert}
                                className="text-left hover:opacity-80 block text-slate-600 hover:text-slate-700 group items-center w-full px-3 text-sm bg-white outline-none hover:outline-none focus:outline-none focus:shadow-none mb-2"
                            >
                                <FontAwesomeIcon icon={faTrash} />
                                <span className="ml-2">
                                    {__('Delete', 'essential-extensions-for-woocommerce')}
                                </span>
                            </button>
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
