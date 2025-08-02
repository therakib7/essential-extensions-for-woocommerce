/**
 * External dependencies.
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies.
 */
import { endpoint } from './endpoint';

const controls = {
    GET_MENUS(action: any) {
        return apiFetch({
            path: action.path,
        });
    },

    EDIT_MENU(action: any) {
        const path = endpoint + '/';
        return apiFetch({
            path,
            method: 'PUT',
            data: action.payload,
        });
    },
};

export default controls;
