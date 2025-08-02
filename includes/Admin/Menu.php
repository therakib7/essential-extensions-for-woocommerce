<?php

namespace EssentialExtensionsWC\Admin;

use EssentialExtensionsWC\Helpers\AdminColumn\WpListTableFactory;
use EssentialExtensionsWC\Models\AdminColumn;

/**
 * Admin Menu class.
 *
 * Responsible for managing admin menus.
 *
 * @since 0.1.0
 */
class Menu {

    public function __construct() {
        add_action( 'admin_menu', [ $this, 'init_menu' ] );
    }

    public function init_menu() {
        global $pagenow;

        //add_menu_page
        $this->add_menu_page();

        // load this condition only essential-extensions-for-woocommerce settings page
        // It getting from admin menu page URL, no need to check NonceVerification
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        if ( $pagenow === 'admin.php' && isset( $_GET['page'] ) && sanitize_text_field( wp_unslash( $_GET['page'] ) ) === 'essential-extensions-for-woocommerce' ) {
            //Save admin menus
            $this->save_admin_menus();

            //Save admin columns
            $this->save_admin_columns();
        }

        //restrict_menu
        $this->restrict_menu();
    }

    /**
     * Add menu in admin panel
     *
     * @since 0.1.0
     */
    public function add_menu_page() {

        global $submenu;

        $slug          = ESSENTIAL_EXTENSIONS_WC_SLUG;
        $menu_position = 70;
        $capability    = 'manage_options';
        $logo_icon     = 'dashicons-edit';

        add_menu_page( esc_attr__( 'Woo Extensions', 'essential-extensions-for-woocommerce' ), esc_attr__( 'Woo Extensions', 'essential-extensions-for-woocommerce' ), $capability, $slug, [ $this, 'render' ], $logo_icon, $menu_position );

        if ( current_user_can( $capability ) ) {
            $menu_items = [
                esc_attr__( 'Home', 'essential-extensions-for-woocommerce' ) => '#/',
            ];

            // Conditional menu items
            if ( essential_extensions_wc()->is_active_extension( 'admin_menu_editor' ) ) {
                $menu_items[ esc_attr__( 'Admin Menu Editor', 'essential-extensions-for-woocommerce' ) ] = '#/admin-menu-editor';
            }

            if ( essential_extensions_wc()->is_active_extension( 'admin_column_editor' ) ) {
                $menu_items[ esc_attr__( 'Admin Column Editor', 'essential-extensions-for-woocommerce' ) ] = '#/admin-column-editor';
            }

            if ( essential_extensions_wc()->is_active_extension( 'admin_access_editor' ) ) {
                $menu_items[ esc_attr__( 'Admin Access Editor', 'essential-extensions-for-woocommerce' ) ] = '#/admin-access-editor/roles';
            }

            $menu_items[ esc_attr__( 'All Extensions', 'essential-extensions-for-woocommerce' ) ] = '#/extensions';

            // Add each menu item to the submenu
            foreach ( $menu_items as $title => $path ) {
                // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
                $submenu[ $slug ][] = [ $title, $capability, 'admin.php?page=' . $slug . $path ];
            }
        }
    }

    /**
     * Render the plugin page
     *
     * @since 0.1.0
     */
    public function render() {
        require_once ESSENTIAL_EXTENSIONS_WC_TEMPLATE_PATH . '/app.php';
    }

    /**
     * Save admin menus to option
     *
     * In rest API request global $menu, $submenu not accessible, that's why saving in option
     *
     * @since 0.1.0
     */
    protected function save_admin_menus() {
        if ( ! current_user_can( 'manage_options' ) ) {
			return;
        }

        global $menu, $submenu;

        //menu serial by menu priority
        ksort( $menu );

        // Organize submenu items under their parent menu items
        $merged_menu = [];
        foreach ( $menu as $menu_item ) {

            //Organize and add menu
            $modify_menu_item = [];

            $clean_label = preg_replace( '/\d+/', '', wp_strip_all_tags( $menu_item[0] ) );
            $modify_menu_item['label'] = $clean_label;
            $modify_menu_item['capability'] = $menu_item[1];
            $modify_menu_item['url'] = $menu_item[2];

            if ( isset( $menu_item[4] ) ) {
                $modify_menu_item['classes'] = $menu_item[4];
            }

            if ( isset( $menu_item[5] ) ) {
                $modify_menu_item['id'] = $menu_item[5];
            }

            if ( isset( $menu_item[6] ) ) {
                $modify_menu_item['icon'] = $menu_item[6];
            }
            $modify_menu_item['is_hide'] = false;

            //Organize and add submenu
            $modify_menu_item['submenu'] = [];
            if ( array_key_exists( $menu_item[2], $submenu ) ) {
                foreach ( $submenu[ $menu_item[2] ] as $sub_item ) {
                    $modify_sub_item = [];
                    $clean_label = preg_replace( '/\d+/', '', wp_strip_all_tags( $sub_item[0] ) );
                    $modify_sub_item['label'] = $clean_label;
                    $modify_sub_item['capability'] = $sub_item[1];
                    $modify_sub_item['url'] = $sub_item[2];
                    $modify_sub_item['is_hide'] = false;
                    $modify_menu_item['submenu'][] = $modify_sub_item;
                }
            }

			//Escape wp-menu-separator
            if (
                $menu_item[2] !== 'essential-extensions-for-woocommerce' //essential-extensions-for-woocommerce
            ) {
                $merged_menu[] = $modify_menu_item;
            }
        }

        update_option( 'essential_extensions_wc_admin_menu', $merged_menu );
    }

    /**
     * Save admin columns to option table
     *
     * @since 0.1.0
     */
    public function save_admin_columns() {
        //Post type table
        $post_types = AdminColumn::get_post_types();
        foreach ( $post_types as $post_type ) {
            $columns = ( new WpListTableFactory() )->get_post_table( 'edit-' . $post_type )->get_columns();
            update_option( 'essential_extensions_wc_admin_column_' . $post_type . '_default', $columns, false );
        }
        //Media table
        $columns = ( new WpListTableFactory() )->get_media_table( 'upload' )->get_columns();
        update_option( 'essential_extensions_wc_admin_column_upload_default', $columns, false );

        //Comment table
        $columns = ( new WpListTableFactory() )->get_comment_table( 'edit-comments' )->get_columns();
        update_option( 'essential_extensions_wc_admin_column_edit-comments_default', $columns, false );

        //Comment table
        $columns = ( new WpListTableFactory() )->get_user_table( 'users' )->get_columns();
        update_option( 'essential_extensions_wc_admin_column_users_default', $columns, false );
    }

    /**
     * Apply admin menu editor
     *
     * @since 0.1.0
     */
    protected function admin_menu_editor() {
        global $menu;
        global $submenu;

        // admin menu editor
        $custom_menu = get_option( 'essential_extensions_wc_admin_menu_editor', [] );

        // Remove all existing menus
        // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
        $menu = [];
        // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
        $submenu = [];

        // Add custom menus
        foreach ( $custom_menu as $menu_item ) {
            if ( isset( $menu_item['classes'] ) && $menu_item['classes'] === 'wp-menu-separator' ) {
                // Add separator
                // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
                $menu[] = [ '', 'read', $menu_item['url'], '', 'wp-menu-separator' ];
            } else {
                // Add menu page
                add_menu_page(
                    $menu_item['label'],
                    $menu_item['label'],
                    $menu_item['capability'],
                    $menu_item['url'],
                    '',
                    $menu_item['icon'],
                    null
                );

                // Add submenu items if any
                if ( isset( $menu_item['submenu'] ) && is_array( $menu_item['submenu'] ) ) {
                    foreach ( $menu_item['submenu'] as $submenu_item ) {
                        add_submenu_page(
                            $menu_item['url'],
                            $submenu_item['label'],
                            $submenu_item['label'],
                            $submenu_item['capability'],
                            $submenu_item['url'],
                            ''
                        );
                    }
                }
            }
        }
    }

    /**
     * Restrict menu for user or role
     *
     * @since 0.1.0
     */
    protected function restrict_menu() {

        $current_user = wp_get_current_user(); // Get the current user object

        if ( $current_user instanceof \WP_User ) {
            $user_roles = $current_user->roles; // Get the roles of the current user

            $current_user_role = $user_roles[0];
            $current_user_admin_menu = get_user_meta( $current_user->ID, '_essential_extensions_wc_admin_menu', true );
            $current_role_admin_menu = get_option( 'essential_extensions_wc_admin_menu_role_' . $current_user_role );
            if ( $current_user_admin_menu ) {
                $this->check_restrict_menu( $current_user_admin_menu );
            } elseif ( $current_role_admin_menu ) {
                $this->check_restrict_menu( $current_role_admin_menu );
            }
        }
    }

    /**
     * Check menu access
     *
     * @since 0.1.0
     */
    protected function check_restrict_menu( $restrict_menu ) {
        $admin_menu = get_option( 'essential_extensions_wc_admin_menu' );

        if ( $admin_menu ) {
            foreach ( $admin_menu as $menu ) {
                if ( $menu['submenu'] ) {
                    foreach ( $menu['submenu'] as $submenu ) {
                        if ( array_key_exists( $menu['url'], $restrict_menu ) ) {
                            if ( ! in_array( $submenu['url'], $restrict_menu[ $menu['url'] ], true ) ) {
                                $this->remove_admin_url_access( $menu['url'], $submenu['url'] );
                            }
                        } else {
                            $this->remove_admin_url_access( $menu['url'] );
                        }
                    }
                } elseif ( ! array_key_exists( $menu['url'], $restrict_menu ) ) {
                        $this->remove_admin_url_access( $menu['url'] );
                }
            }
        }
    }

    /**
     * Remove menu and url access
     *
     * @since 0.1.0
     */
    protected function remove_admin_url_access( $menu, $submenu = '' ) {
        global $pagenow;
        global $parent_file;

        if ( $submenu ) {
            remove_submenu_page( $menu, $submenu );
        } else {
            remove_menu_page( $menu );
        }
        $url_to_hide = ( $submenu ) ? $submenu : $menu;

        if ( $url_to_hide === $pagenow || $url_to_hide === $parent_file ) {
            do_action( 'admin_page_access_denied' );
            wp_die( esc_html__( 'Sorry, you are not allowed to access this page.', 'essential-extensions-for-woocommerce' ), 403 );
        }
    }
}
