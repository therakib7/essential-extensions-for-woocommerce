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

const extensionStore = createReduxStore('essential-extensions-for-woocommerce/extensions', {
    reducer,
    actions,
    selectors,
    controls,
    resolvers,
});

export default extensionStore;
