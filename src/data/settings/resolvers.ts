/**
 * Internal dependencies.
 */
import actions from './actions';

import { endpoint } from './endpoint';

import { IResponse } from '@/interfaces';

const resolvers = {
    *getFormData(filters: object) {
        if (filters === undefined) {
            filters = {};
        }

        const queryParam = new URLSearchParams(
            filters as URLSearchParams,
        ).toString();

        const response: IResponse = yield actions.apiGet(
            `${endpoint}?${queryParam}`,
        );

        if (response.success) {
            const data = response.data;

            yield actions.setForm(data.form);
        }

        return actions.setIsLoading(false);
    },
};

export default resolvers;
