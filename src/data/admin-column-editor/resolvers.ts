/**
 * Internal dependencies.
 */
import actions from './actions';

import { endpoint } from './endpoint';

import { IResponse } from '@/interfaces';

const resolvers = {
    *getEditorColumn(screen = 'post') {
        console.log(screen);

        const response: IResponse = yield actions.getColumns(
            `${endpoint}/${screen}`,
        );

        if (response.success) {
            const data = response.data;
            const screens = data.screens;
            const defaultColumns = data.default_columns;
            const editorColumns = data.editor_columns;

            yield actions.setScreens(screens);
            yield actions.setDefaultColumns(defaultColumns);
            yield actions.setEditorColumns(editorColumns);
        }

        return actions.setIsLoading(false);
    },
};

export default resolvers;
