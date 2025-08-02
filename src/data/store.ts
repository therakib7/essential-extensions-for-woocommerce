/**
 * External dependencies.
 */
import { register } from '@wordpress/data';

/**
 * Internal dependencies.
 */
import adminMenuEditorStore from './admin-menu-editor';
import adminColumnEditorStore from './admin-column-editor';
import adminAccessEditorStore from './admin-access-editor';
import extensionStore from './extensions';
import settingStore from './settings';

/**
 * Register stores.
 */
register(adminMenuEditorStore);
register(adminColumnEditorStore);
register(adminAccessEditorStore);
register(extensionStore);
register(settingStore);
