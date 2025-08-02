/**
 * External dependencies.
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal dependencies.
 */
import { endpoint } from './endpoint';

const controls = {
    API_GET(action: any) {
        return apiFetch({ path: action.path });
    },

    API_UPDATE(action: any) {
        return apiFetch({
            path: endpoint,
            method: 'POST',
            data: action.payload,
        });
    },
};

export default controls;
