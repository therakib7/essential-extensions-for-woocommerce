/**
 * Internal dependencies.
 */
import actions from './actions';

import { endpoint } from './endpoint';

import { IResponse } from '@/interfaces';

const resolvers = {
    *getExtensions() {
        const response: IResponse = yield actions.getExtensions(endpoint);

        if (response.success) {
            const data = response.data;
            const extensions = data.extensions;

            yield actions.setExtensions(extensions);
        }

        return actions.setIsLoading(false);
    },
};

export default resolvers;
