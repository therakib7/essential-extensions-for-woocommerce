<?php

namespace EssentialExtensionsWC\Api\Types;

use EssentialExtensionsWC\Abstracts\RestApi;

/**
 * API Extension class
 *
 * @since 0.1.0
 */
class Extension extends RestApi {


    /**
     * Route base.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected $base = 'extensions';

    /**
     * Register all routes related with this api
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
                'args' => [
                    'type' => [
                        'validate_callback' => function ( $param ) {
                            return is_string( $param );
                        },
                    ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->base,
            [
                'methods' => 'PUT',
                'callback' => [ $this, 'update' ],
                'permission_callback' => [ $this, 'permission' ],
                'args' => [
                    'id' => [
                        'validate_callback' => function ( $param ) {
                            return is_string( $param );
                        },
                    ],
                ],
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
        $list = [
            [
                'id' => 'admin_menu_editor',
                'title' => esc_html__( 'Admin Menu Editor', 'essential-extensions-for-woocommerce' ),
                'description' => 'You can customize admin menu and submenu using this',
                'is_active' => true,
            ],
            [
                'id' => 'admin_column_editor',
                'title' => esc_attr__( 'Admin Column Editor', 'essential-extensions-for-woocommerce' ),
                'description' => esc_attr__( 'You can customize table column using this', 'essential-extensions-for-woocommerce' ),
                'is_active' => true,
            ],
            [
                'id' => 'admin_access_editor',
                'title' => esc_attr__( 'Admin Access Editor', 'essential-extensions-for-woocommerce' ),
                'description' => esc_attr__( 'You can restrict admin menu and submenu using this', 'essential-extensions-for-woocommerce' ),
                'is_active' => true,
            ],
            [
                'id' => 'nav_menu_access_editor',
                'title' => esc_attr__( 'Nav Menu Access Editor', 'essential-extensions-for-woocommerce' ),
                'description' => esc_attr__( 'You can restrict nav menu using this', 'essential-extensions-for-woocommerce' ),
                'is_active' => false,
            ],
        ];

        // Retrieve the saved extensions from the WordPress options table
		$saved_extensions = get_option( 'essential_extensions_wc_extensions', [] );

		// Convert the saved extensions array to an associative array keyed by 'id'
		$saved_extensions_assoc = [];
		foreach ( $saved_extensions as $extension ) {
			$saved_extensions_assoc[ $extension['id'] ] = $extension['is_active'];
		}

		// Update the $list array with the saved 'is_active' values
		foreach ( $list as &$extension ) {
			if ( isset( $saved_extensions_assoc[ $extension['id'] ] ) ) {
				$extension['is_active'] = $saved_extensions_assoc[ $extension['id'] ];
			} else {
				$extension['is_active'] = true; // Default to true if not found in saved extensions
			}
		}

		// Unset the reference to avoid unintended side effects
		unset( $extension );

		// Prepare the response array
		$resp = [
			'extensions' => $list
		];

        return new \WP_REST_Response(
            [
                'success'  => true,
                'data' => $resp,
            ],
            200
        );
    }

    /**
     * Update existing action.
     *
     * @since 0.1.0
     *
     * @param \WP_REST_Request $req Request object.
     */
    public function update( $req ) {
        $param = $req->get_params();
        $wp_error = new \WP_Error();

        $url_params = $req->get_url_params();

        $extensions = isset( $param['extensions'] ) ? ( $param['extensions'] ) : [];

        if ( empty( $extensions ) ) {
            $wp_error->add(
                'field_extensions',
                esc_html__( 'Extensions is missing', 'essential-extensions-for-woocommerce' )
            );
        }

        if ( $wp_error->get_error_messages() ) {
            return new \WP_REST_Response(
                [
                    'success'  => false,
                    'data' => $wp_error->get_error_messages(),
                ],
                200
            );
        } else {
            update_option( 'essential_extensions_wc_extensions', $extensions );

            return new \WP_REST_Response(
                [
                    'success'  => true,
                    'data' => null,
                ],
                200
            );
        }
    }
}
