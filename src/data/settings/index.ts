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

const settingStore = createReduxStore('essential-extensions-for-woocommerce/settings', {
    reducer,
    actions,
    selectors,
    controls,
    resolvers,
});

export default settingStore;
