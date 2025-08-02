<?php

namespace EssentialExtensionsWC\Api\Types;

use EssentialExtensionsWC\Abstracts\RestApi;
use EssentialExtensionsWC\Helpers\Fns;

/**
 * API Restriction class
 *
 * @since 0.1.0
 */
class AdminMenu extends RestApi {

    /**
     * Route base.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected $base = 'admin-menus';

    /**
     * Register all routes related with this api
     *
     * @since 0.1.0
     *
     * @return void
     */

    public function routes() {

        register_rest_route(
            $this->namespace, '/' . $this->base,
            [
                'methods' => 'GET',
                'callback' => [ $this, 'get' ],
                'permission_callback' => [ $this, 'permission' ],
            ]
        );

        register_rest_route(
            $this->namespace, '/' . $this->base,
            [
                'methods' => 'PUT',
                'callback' => [ $this, 'update' ],
                'permission_callback' => [ $this, 'permission' ],
            ]
        );
    }

    /**
     * Get request
     *
     * @since 0.1.0
     *
     * @param WP_REST_Request $req request object
     *
     * @return WP_Error|WP_REST_Response
     */
    public function get( $req ) {
        $resp = [];
        $admin_menu = get_option( 'essential_extensions_wc_admin_menu', [] );
        $admin_menu_editor = get_option( 'essential_extensions_wc_admin_menu_editor' );
        $editor_menus = $admin_menu_editor ? $admin_menu_editor : $admin_menu;
        $resp['editor_menus'] = $editor_menus;
        $default_menus = [];
        if ( $admin_menu ) {
            foreach ( $admin_menu as $menu ) {
                $menu_t = [];
                $menu_t['label'] = $menu['label'];
                $menu_t['url'] = $menu['url'];
                $menu_t['is_submenu'] = false;
                $default_menus[] = $menu_t;

                if ( isset( $menu['submenu'] ) && ! empty( $menu['submenu'] ) ) {
                    foreach ( $menu['submenu'] as $submenu ) {
                        $submenu_t = [];
                        $submenu_t['label'] = $submenu['label'];
                        $submenu_t['url'] = $submenu['url'];
                        $submenu_t['is_submenu'] = true;
                        $default_menus[] = $submenu_t;
                    }
                }
            }
        }
        $resp['default_menus'] = $default_menus;

        return new \WP_REST_Response(
            [
				'success'  => true,
				'data' => $resp,
            ], 200
        );
    }

    /**
     * Update request
     *
     * @since 0.1.0
     *
     * @param WP_REST_Request $req request object
     *
     * @return WP_Error|WP_REST_Response
     */
    public function update( $req ) {
        $param = $req->get_params();
        $wp_error = new \WP_Error();

        $editor_menus = isset( $param['editor_menus'] ) ? ( $param['editor_menus'] ) : '';

        if ( $wp_error->get_error_messages() ) {
            return new \WP_REST_Response(
                [
					'success'  => false,
					'data' => $wp_error->get_error_messages(),
                ], 200
            );
        } else {
            update_option( 'essential_extensions_wc_admin_menu_editor', $editor_menus );
            return new \WP_REST_Response(
                [
					'success'  => true,
					'data' => null,
                ], 200
            );
        }
    }
}
