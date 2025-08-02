/**
 * External dependencies.
 */
import { createReduxStore } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import reducer from './reducer';
import actions from './actions';
import selectors from './selectors';
import controls from './controls';
import resolvers from './resolvers';

const adminMenuEditorStore = createReduxStore('essential-extensions-for-woocommerce/admin-menu-editor', {
    reducer,
    actions,
    selectors,
    controls,
    resolvers,
});

export default adminMenuEditorStore;
