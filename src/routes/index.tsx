/**
 * All common routes
 *
 * @since 0.1.0
 */

/**
 * External dependencies
 */
import { lazy } from '@wordpress/element';

/**
 * Internal dependencies
 */
const Home = lazy(() => import('@/pages/home'));
const AdminMenuEditor = lazy(() => import('@/pages/admin-menu-editor'));
const AdminColumnEditor = lazy(() => import('@/pages/admin-column-editor'));
const Extensions = lazy(() => import('@/pages/extensions'));
const AdminAccessEditor = lazy(() => import('@/pages/admin-access-editor'));
const AdminAccessEditorSingle = lazy(
    () => import('@/pages/admin-access-editor/Single'),
);
// const Settings = lazy( () => import( '@/pages/settings' ) );
import NotFound from '@/pages/404';

const routes = [
    {
        path: '/',
        element: Home,
    },
    {
        path: '/admin-menu-editor',
        element: AdminMenuEditor,
    },
    {
        path: '/admin-column-editor',
        element: AdminColumnEditor,
    },
    {
        path: '/admin-column-editor/:id',
        element: AdminColumnEditor,
    },
    {
        path: '/admin-access-editor/:type',
        element: AdminAccessEditor,
    },
    {
        path: '/admin-access-editor/:type/add',
        element: AdminAccessEditorSingle,
    },
    {
        path: '/admin-access-editor/:type/:id/edit',
        element: AdminAccessEditorSingle,
    },
    {
        path: '/extensions',
        element: Extensions,
    },
    /* {
		path: '/settings',
		element: Settings,
	}, */
    {
        path: '*',
        element: NotFound,
    },
];

export default routes;
