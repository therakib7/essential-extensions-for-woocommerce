<?php

namespace EssentialExtensionsWC\Api\Types;

use EssentialExtensionsWC\Abstracts\RestApi;

/**
 * API AdminAccess class
 *
 * @since 0.1.0
 */
class AdminAccess extends RestApi {


    /**
     * Route base.
     *
     * @var string
     *
     * @since 0.1.0
     */
    protected $base = 'admin-accesses';

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
            '/' . $this->base . '/(?P<type>[a-z]+)',
            [
                'methods' => 'POST',
                'callback' => [ $this, 'create' ],
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
            '/' . $this->base . '/(?P<type>[a-z]+)',
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
            '/' . $this->base . '/(?P<type>[a-z]+)/(?P<id>[a-z0-9]+)',
            [
                'methods' => 'GET',
                'callback' => [ $this, 'get_single' ],
                'permission_callback' => [ $this, 'permission' ],
                'args' => [
                    'type' => [
                        'validate_callback' => function ( $param ) {
                            return is_string( $param );
                        },
                    ],
                    'id' => [
                        'validate_callback' => function ( $param ) {
                            return is_string( $param );
                        },
                    ],
                ],
            ]
        );

        register_rest_route(
            $this->namespace,
            '/' . $this->base . '/(?P<type>[a-z]+)',
            [
                'methods' => 'PUT',
                'callback' => [ $this, 'update' ],
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
                'methods' => 'DELETE',
                'callback' => [ $this, 'delete' ],
                'permission_callback' => [ $this, 'permission' ],
                'args' => [],
            ]
        );
    }

    /**
     * Create request
     *
     * @since 0.1.0
     *
     * @param WP_REST_Request $req request object
     *
     * @return WP_Error|WP_REST_Response
     */
    public function create( $req ) {
        $param = $req->get_params();

        $url_param = $req->get_url_params();
        $type = $url_param['type'];

        $wp_error = new \WP_Error();

        $id = isset( $param['id'] ) ? sanitize_text_field( $param['id'] ) : '';

        $admin_menus = isset( $param['admin_menus'] ) ? ( $param['admin_menus'] ) : '';
        if ( empty( $id ) ) {
            if ( $type === 'users' ) {
                $wp_error->add(
                    'select_id',
                    esc_html__( 'Please Select User', 'essential-extensions-for-woocommerce' )
                );
            } else {
                $wp_error->add(
                    'select_id',
                    esc_html__( 'Please Select Role', 'essential-extensions-for-woocommerce' )
                );
            }
        }

        if ( $type === 'users' ) {
            $id_admin_menu = get_user_meta( $id, '_essential_extensions_wc_admin_menu', true );
            if ( $id_admin_menu ) {
                $wp_error->add(
                    'user_exist',
                    esc_html__( 'User already exist!', 'essential-extensions-for-woocommerce' )
                );
            }
        } else {
            $role_admin_menu = get_option( 'essential_extensions_wc_admin_menu_role_' . $id );
            if ( $role_admin_menu ) {
                $wp_error->add(
                    'role_exist',
                    esc_html__( 'Role already exist!', 'essential-extensions-for-woocommerce' )
                );
            }
        }

        if ( empty( $admin_menus ) ) {
            $wp_error->add(
                'select_menu',
                esc_html__( 'Please select Menu', 'essential-extensions-for-woocommerce' )
            );
        }

        // phpcs:ignore WordPress.WP.Capabilities.RoleFound
        if ( $type === 'users' && user_can( $id, 'administrator' ) ) {
            $wp_error->add(
                'select_id',
                esc_html__( 'Administrator restriction not allowed!', 'essential-extensions-for-woocommerce' )
            );
        }

        if ( $type === 'roles' && $id === 'administrator' ) {
            $wp_error->add(
                'select_id',
                esc_html__( 'Administrator restriction not allowed!', 'essential-extensions-for-woocommerce' )
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
            if ( $type === 'users' ) {
                update_user_meta( $id, '_essential_extensions_wc_admin_menu', $admin_menus );
            } else {
                update_option( 'essential_extensions_wc_admin_menu_role_' . $id, $admin_menus );
            }
            return new \WP_REST_Response(
                [
                    'success'  => true,
                    'data' => null,
                ],
                200
            );
        }
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
        $param = $req->get_params();

        $per_page = 10;
        $offset = 0;

        $s = isset( $param['text'] ) ? sanitize_text_field( $param['text'] ) : '';

        if ( isset( $param['per_page'] ) ) {
            $per_page = $param['per_page'];
        }

        if ( isset( $param['page'] ) && $param['page'] > 1 ) {
            $offset = $per_page * $param['page'] - $per_page;
        }

        $url_params = $req->get_url_params();
        $type = $url_params['type'];

        $resp = [];
        $items = [];
        $total_items = 0;
        $total_pages = 1;

        if ( $type === 'users' ) {
            $args = [
                'number' => $per_page,
                'offset' => $offset,
            ];

            // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
            $args['meta_query'] = [
                [
                    'key' => '_essential_extensions_wc_admin_menu',
                    'compare' => 'EXISTS',
                ],
            ];

            $query = new \WP_User_Query( $args );
            $total_items = $query->get_total(); //use this for pagination

            foreach ( $query->get_results() as $user ) {
                $item = [];
                $item['id'] = $user->ID;
                $item['name'] = $user->display_name;
                $item['email'] = $user->user_email;

                $items[] = $item;
            }
            wp_reset_postdata();
        } else {
            global $wp_roles;
            foreach ( $wp_roles->role_names as $key => $value ) {
                //hide administrator
                if ( $key === 'administrator' ) {
                    continue;
                }

                if ( get_option( 'essential_extensions_wc_admin_menu_role_' . $key ) ) {
                    $item = [];
                    $item['id'] = $key;
                    $item['label'] = $value;

                    $items[] = $item;
                    ++$total_items;
                }
            }
        }

        $resp['items'] = $items;
        $resp['total_items'] = $total_items;
        $resp['total_pages'] = $total_pages;

        return new \WP_REST_Response(
            [
                'success'  => true,
                'data' => $resp,
            ],
            200
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
        $type = $url_params['type'];
        $id = $url_params['id'];

        $resp = [];
        // get menus from admin menu editor
        $admin_menus = get_option( 'essential_extensions_wc_admin_menu' );
        $admin_menu_editor = get_option( 'essential_extensions_wc_admin_menu_editor' );
        $menus = ( essential_extensions_wc()->is_active_extension( 'admin_menu_editor' ) && $admin_menu_editor ) ? $admin_menu_editor : $admin_menus;

        $resp['form_data']['admin_menus'] = $menus;
        $resp['form_data']['ids'] = [];

        if ( $type === 'users' ) {
            // hide administrator
            $args = [
                'role__not_in' => [ 'administrator' ],
            ];
            $users = get_users( $args );
            foreach ( $users as $user ) {
                $modify_users = [];
                $modify_users['value'] = $user->ID;
                $modify_users['label'] = "$user->display_name - $user->user_email";
                $resp['form_data']['ids'][] = $modify_users;
            }
        } elseif ( $type === 'roles' ) {
            global $wp_roles;
            foreach ( $wp_roles->role_names as $key => $value ) {
                //hide administrator
                if ( $key === 'administrator' ) {
                    continue;
                }
                $modify_roles = [];
                $modify_roles['value'] = $key;
                $modify_roles['label'] = $value;
                $resp['form_data']['ids'][] = $modify_roles;
            }
        }

        $resp['form']['id'] = '';
        $resp['form']['admin_menus'] = [];

        if ( $id ) {
            $resp['form']['id'] = $id;
            if ( $type === 'users' ) {
                $resp['form']['admin_menus'] = get_user_meta( $id, '_essential_extensions_wc_admin_menu', true );
            } elseif ( $type === 'roles' ) {
                $resp['form']['admin_menus'] = get_option( 'essential_extensions_wc_admin_menu_role_' . $id ) ?? [];
            }
        }

        return new \WP_REST_Response(
            [
                'success'  => true,
                'data' => $resp,
            ],
            200
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

        $url_param = $req->get_url_params();
        $type = $url_param['type'];

        $wp_error = new \WP_Error();

        $id = isset( $param['id'] ) ? ( $param['id'] ) : '';
        $admin_menus = isset( $param['admin_menus'] ) ? ( $param['admin_menus'] ) : '';

        if ( empty( $id ) ) {
            if ( $type === 'users' ) {
                $wp_error->add(
                    'select_id',
                    esc_html__( 'Please Select User', 'essential-extensions-for-woocommerce' )
                );
            } else {
                $wp_error->add(
                    'select_id',
                    esc_html__( 'Please Select Role', 'essential-extensions-for-woocommerce' )
                );
            }
        }

        if ( empty( $admin_menus ) ) {
            $wp_error->add(
                'select_menu',
                esc_html__( 'Please select Menu', 'essential-extensions-for-woocommerce' )
            );
        }

        // phpcs:ignore WordPress.WP.Capabilities.RoleFound
        if ( $type === 'users' && user_can( $id, 'administrator' ) ) {
            $wp_error->add(
                'select_id',
                esc_html__( 'Administrator restriction not allowed!', 'essential-extensions-for-woocommerce' )
            );
        }

        if ( $type === 'roles' && $id === 'administrator' ) {
            $wp_error->add(
                'select_id',
                esc_html__( 'Administrator restriction not allowed!', 'essential-extensions-for-woocommerce' )
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
            if ( $type === 'users' ) {
                update_user_meta( $id, '_essential_extensions_wc_admin_menu', $admin_menus );
            } else {
                update_option( 'essential_extensions_wc_admin_menu_role_' . $id, $admin_menus );
            }
            return new \WP_REST_Response(
                [
                    'success'  => true,
                    'data' => null,
                ],
                200
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
        $wp_error = new \WP_Error();
        $param = $req->get_params();
        $type = isset( $param['type'] ) ? $this->sanitize( $param['type'] ) : '';
        $ids = isset( $param['ids'] ) ? ( $param['ids'] ) : [];

        if ( empty( $type ) ) {
            $wp_error->add(
                'param_type',
                esc_html__( 'Param type is empty', 'essential-extensions-for-woocommerce' )
            );
        }

        if ( empty( $ids ) ) {
            $wp_error->add(
                'param_ids',
                esc_html__( 'Param Ids is empty', 'essential-extensions-for-woocommerce' )
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
        }

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
                'data' => [],
            ],
            200
        );
    }
}
