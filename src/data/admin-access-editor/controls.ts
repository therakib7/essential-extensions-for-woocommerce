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

    API_ADD(action: any) {
        const path = endpoint + '/' + action.access_type;
        return apiFetch({
            path,
            method: 'POST',
            data: action.payload,
        });
    },

    API_UPDATE(action: any) {
        const path = endpoint + '/' + action.access_type;
        return apiFetch({ path, method: 'PUT', data: action.payload });
    },

    API_DELETE(action: any) {
        const path = endpoint;
        return apiFetch({ path, method: 'DELETE', data: action.payload });
    },
};

export default controls;
