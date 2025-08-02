<?php

namespace EssentialExtensionsWC\Api\Types;

use EssentialExtensionsWC\Abstracts\RestApi;
use EssentialExtensionsWC\Helpers\Keys;

/**
 * API Setting class.
 *
 * @since 0.1.0
 */

class Setting extends RestApi {


    /**
     * Route base.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected $base = 'settings';

    /**
     * Register all routes related with api.
     *
     * @since 0.1.0
     *
     * @return void
     */

    public function routes() {
        register_rest_route(
            $this->namespace,
            '/' . $this->base,
            [
                'methods' => 'GET',
                'callback' => [ $this, 'get' ],
                'permission_callback' => [ $this, 'permission' ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->base,
            [
                'methods' => 'POST',
                'callback' => [ $this, 'create' ],
                'permission_callback' => [ $this, 'permission' ],
            ]
        );
    }

    /**
     * Get settings data based on the provided tab.
     *
     * @since 0.1.0
     *
     * @param \WP_REST_Request $req Request object.
     *
     * @return WP_Error|WP_REST_Response
     */
    public function get( $req ) {
        $param = $req->get_params();
        $wp_error = new \WP_Error();

        if ( $wp_error->get_error_messages() ) {
            return new \WP_REST_Response(
                [
                    'success'  => false,
                    'data' => $wp_error->get_error_messages(),
                ],
                200
            );
        } else {
            $settings = [];

            $option = get_option( Keys::SETTINGS );

            if ( $option ) {
                $settings = $option;
            } else {
                $settings['websites'] = [];
            }

            return new \WP_REST_Response(
                [
                    'success'  => true,
                    'data' => [ 'form' => $settings ],
                ],
                200
            );
        }
    }

    /**
     * Update settings data based on the provided tab.
     *
     * @since 0.1.0
     *
     * @param \WP_REST_Request $req Request object.
     *
     * @return WP_Error|WP_REST_Response
     */
    public function create( $req ) {
        $param = $req->get_params();
        $wp_error = new \WP_Error();

        if ( $wp_error->get_error_messages() ) {
            return new \WP_REST_Response(
                [
                    'success'  => false,
                    'data' => $wp_error->get_error_messages(),
                ],
                200
            );
        } else {
            $settings = [];

            if ( $wp_error->get_error_messages() ) {
                return new \WP_REST_Response(
                    [
                        'success'  => false,
                        'data' => $wp_error->get_error_messages(),
                    ],
                    200
                );
            } else {
                $settings = [];

                $settings['websites'] = isset( $param['websites'] )
                    ? ( $param['websites'] )
                    : [];

                update_option( Keys::SETTINGS, $settings );

                return new \WP_REST_Response(
                    [
                        'success'  => true,
                    ],
                    200
                );
            }
        }
    }
}
