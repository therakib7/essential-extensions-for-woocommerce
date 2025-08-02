/**
 * Internal dependencies.
 */
import actions from './actions';

import { endpoint } from './endpoint';

import { IResponse } from '@/interfaces';

const resolvers = {
    *getItems(type: string, filters: object) {
        if (filters === undefined) {
            filters = {};
        }

        const queryParam = new URLSearchParams(
            filters as URLSearchParams,
        ).toString();

        const response: IResponse = yield actions.apiGet(
            `${endpoint}/${type}?${queryParam}`,
        );

        if (response.success) {
            const data = response.data;

            yield actions.setItems(data.items);
            yield actions.setTotalItems(data.total_items);
            yield actions.setTotalPages(data.total_pages);
        }

        return actions.setIsLoading(false);
    },

    *getFormData(type: string, id: number) {
        yield actions.setIsLoading(true);
        const path = `${endpoint}/${type}/${id}`;
        const response: IResponse = yield actions.apiGet(path);

        if (response.success) {
            const data = response.data;
            yield actions.setFormData(data.form_data);
            yield actions.setForm(data.form);
        }

        return actions.setIsLoading(false);
    },
};

export default resolvers;
