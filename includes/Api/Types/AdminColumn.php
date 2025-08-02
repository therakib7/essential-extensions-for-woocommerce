<?php

namespace EssentialExtensionsWC\Api\Types;

use EssentialExtensionsWC\Abstracts\RestApi;
use EssentialExtensionsWC\Helpers\AdminColumn\Fns as ColumnFns;
use EssentialExtensionsWC\Models\AdminColumn as ModelAdminColumn;

/**
 * API AdminColumn class
 *
 * @since 0.1.0
 */
class AdminColumn extends RestApi {

    /**
     * Route base.
     *
     * @var string
     * @since 0.1.0
     */
    protected $base = 'admin-columns';

    /**
     * Register all routes related with this api
     *
     * @return void
     * @since 0.1.0
     */
    public function routes() {

        register_rest_route(
            $this->namespace, '/' . $this->base . '/(?P<id>[a-z0-9_]+)',
            [
                'methods' => 'GET',
                'callback' => [ $this, 'get_single' ],
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

        register_rest_route(
            $this->namespace, '/' . $this->base . '/(?P<id>[a-z0-9_]+)',
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

        register_rest_route(
            $this->namespace, '/' . $this->base . '/(?P<id>[a-z0-9,]+)',
            [
                'methods' => 'DELETE',
                'callback' => [ $this, 'delete' ],
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
     * Get single request
     *
     * @since 0.1.0
     *
     * @param WP_REST_Request $req request object
     *
     * @return WP_Error|WP_REST_Response
     */
    public function get_single( $req ) {
        $url_params = $req->get_url_params();
        $id = $url_params['id'];

        $wp_error = new \WP_Error();

        if ( ! $id ) {
            $wp_error->add(
                'select_id',
                esc_html__( 'Screen ID is required!', 'essential-extensions-for-woocommerce' )
            );
        }

        if ( $wp_error->get_error_messages() ) {
            return new \WP_REST_Response(
                [
					'success'  => false,
					'data' => $wp_error->get_error_messages(),
                ], 200
            );
        } else {
            $resp = [];
            $resp['screens'] = ModelAdminColumn::screens();
            $default_columns = [];
            if ( $id ) {
                if ( post_type_exists( $id ) ) {
                    $columns = get_option( 'essential_extensions_wc_admin_column_' . $id . '_default', [] );
                    $default_columns = ColumnFns::format_column( $columns );
                } elseif ( $id === 'wp_media' ) {
                    $columns = get_option( 'essential_extensions_wc_admin_column_upload_default', [] );
                    $default_columns = ColumnFns::format_column( $columns );
                } elseif ( $id === 'wp_comments' ) {
                    $columns = get_option( 'essential_extensions_wc_admin_column_edit-comments_default', [] );
                    $default_columns = ColumnFns::format_column( $columns );
                } elseif ( $id === 'wp_users' ) {
                    $columns = get_option( 'essential_extensions_wc_admin_column_users_default', [] );
                    $default_columns = ColumnFns::format_column( $columns );
                }
            }

            $resp['default_columns'] = $default_columns;
            $editor_columns = get_option( 'essential_extensions_wc_admin_column_' . $id, [] );
            $resp['editor_columns'] = $editor_columns ? $editor_columns : $default_columns; //custom column otherwise default column

            return new \WP_REST_Response(
                [
					'success'  => true,
					'data' => $resp,
                ], 200
            );
        }
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

        $url_param = $req->get_url_params();
        $id = $url_param['id'];

        $wp_error = new \WP_Error();

        $editor_columns = isset( $param['editor_columns'] ) ? ( $param['editor_columns'] ) : '';

        if ( ! $id ) {
            $wp_error->add(
                'select_id',
                esc_html__( 'Screen ID is required!', 'essential-extensions-for-woocommerce' )
            );
        }

        if ( $wp_error->get_error_messages() ) {
            return new \WP_REST_Response(
                [
					'success'  => false,
					'data' => $wp_error->get_error_messages(),
                ], 200
            );
        } else {
            update_option( 'essential_extensions_wc_admin_column_' . $id, $editor_columns );
            return new \WP_REST_Response(
                [
					'success'  => true,
					'data' => null,
                ], 200
            );
        }
    }

    /**
     * Delete request
     *
     * @since 0.1.0
     *
     * @param WP_REST_Request $req request object
     *
     * @return WP_Error|WP_REST_Response
     */
    public function delete( $req ) {
        $url_param = $req->get_url_params();
        $type = $url_param['type'];
        $ids = explode( ',', $url_param['id'] );
        foreach ( $ids as $id ) {
            if ( $type === 'users' ) {
                delete_user_meta( $id, '_essential_extensions_wc_admin_menu' );
            } else {
                delete_option( 'essential_extensions_wc_admin_menu_role_' . $id );
            }
        }

        return new \WP_REST_Response(
            [
				'success'  => true,
				'data' => $ids,
            ], 200
        );
    }
}
