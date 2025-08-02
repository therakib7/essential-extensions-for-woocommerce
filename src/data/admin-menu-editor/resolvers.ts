/**
 * Internal dependencies.
 */
import actions from './actions';

import { endpoint } from './endpoint';

import { IResponse } from '@/interfaces';

const resolvers = {
    *getEditorMenu() {
        const response: IResponse = yield actions.getMenus(`${endpoint}`);

        if (response.success) {
            const data = response.data;
            const defaultMenus = data.default_menus;
            const editorMenus = data.editor_menus;

            yield actions.setDefaultMenus(defaultMenus);
            yield actions.setEditorMenus(editorMenus);
        }

        return actions.setIsLoading(false);
    },
};

export default resolvers;
