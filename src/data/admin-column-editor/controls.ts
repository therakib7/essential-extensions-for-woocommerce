/**
 * External dependencies.
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies.
 */
import { endpoint } from './endpoint';

const controls = {
    GET_COLUMNS(action: any) {
        return apiFetch({
            path: action.path,
        });
    },

    EDIT_COLUMN(action: any) {
        const path = endpoint + '/post';
        return apiFetch({
            path,
            method: 'PUT',
            data: action.payload,
        });
    },
};

export default controls;
