/**
 * Main root file of react admin panel
 *
 * @since 0.1.0
 */

/**
 * External dependencies
 */
import { StrictMode, createRoot } from '@wordpress/element';

/**
 * Internal dependencies
 */
import '@/data/store';
import App from './App';
import '@/styles/main.scss';
// import '@/utils/admin-menu';

const rootElement = document.getElementById('essential-extensions-for-woocommerce');
if (rootElement) {
    createRoot(rootElement).render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}
