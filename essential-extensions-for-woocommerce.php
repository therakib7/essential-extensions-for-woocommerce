<?php
/**
 *
 * @package    Essential Extensions for WooCommerce
 * @author     SoftTent <support@softtent.com>
 * @link       https://softtent.com
 * @copyright  2025 SoftTent
 *
 * @wordpress-plugin
 * Plugin Name:       Essential Extensions for WooCommerce
 * Plugin URI:        https://wordpress.org/plugins/essential-extensions-for-woocommerce
 * Description:       Essential Extensions for WooCommerce in one bundle.
 * Version:           0.1.0
 * Author:            SoftTent
 * Author URI:        https://softtent.com
 * Requires at least: 6.2
 * Tested up to:      6.8
 * Requires PHP:      7.4
 * Text Domain:       essential-extensions-for-woocommerce
 * Domain Path:       /languages
 * Requires Plugins:  woocommerce
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

/**
 * Don't allow call the file directly
 *
 * @since 0.1.0
 */
defined( 'ABSPATH' ) || exit;

/**
 * EssentialExtensionsWC Final Class
 *
 * @since 0.1.0
 *
 * @class EssentialExtensionsWC The class that holds the entire EssentialExtensionsWC plugin
 */

final class EssentialExtensionsWC {

    /**
     * Instance of self
	 *
     * @since 0.1.0
	 *
     * @var EssentialExtensionsWC
     */
    private static $instance = null;

    /**
     * Holds various class instances.
     *
     * @var array
     *
     * @since 0.1.0
     */
    private $container = [];

    /**
     * Constructor for the EssentialExtensionsWC class
     *
     * Sets up all the appropriate hooks and actions
     * within our plugin.
     */
    public function __construct() {

        require_once __DIR__ . '/vendor/autoload.php';

        $this->define_constants();

		register_activation_hook( __FILE__, [ $this, 'activate' ] );
        register_deactivation_hook( __FILE__, [ $this, 'deactivate' ] );

		add_action( 'wp_loaded', [ $this, 'flush_rewrite_rules' ] );

		$this->init_plugin();
    }

	/**
     * Initializes the EssentialExtensionsWC() class
     *
     * Checks for an existing EssentialExtensionsWC() instance
     * and if it doesn't find one, create it.
     */
    public static function init() {
        if ( self::$instance === null ) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Magic getter to bypass referencing plugin.
     *
     * @since 0.1.0
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __get( $prop ) {
        if ( array_key_exists( $prop, $this->container ) ) {
            return $this->container[ $prop ];
        }

        return $this->{$prop};
    }

    /**
     * Magic isset to bypass referencing plugin.
     *
     * @since 0.1.0
     *
     * @param $prop
     *
     * @return mixed
     */
    public function __isset( $prop ) {
        return isset( $this->{$prop} ) || isset( $this->container[ $prop ] );
    }

    /**
     * Define all constants
	 *
     * @since 0.1.0
	 *
     * @return void
     */
    public function define_constants() {
        define( 'ESSENTIAL_EXTENSIONS_WC_VERSION', '0.1.0' );
        define( 'ESSENTIAL_EXTENSIONS_WC_SLUG', 'essential-extensions-for-woocommerce' );
        define( 'ESSENTIAL_EXTENSIONS_WC_FILE', __FILE__ );
        define( 'ESSENTIAL_EXTENSIONS_WC_DIR', __DIR__ );
        define( 'ESSENTIAL_EXTENSIONS_WC_PATH', plugin_dir_path( ESSENTIAL_EXTENSIONS_WC_FILE ) );
        define( 'ESSENTIAL_EXTENSIONS_WC_URL', plugins_url( '', ESSENTIAL_EXTENSIONS_WC_FILE ) );
        define( 'ESSENTIAL_EXTENSIONS_WC_TEMPLATE_PATH', ESSENTIAL_EXTENSIONS_WC_PATH . '/templates' );
        define( 'ESSENTIAL_EXTENSIONS_WC_ASSETS', ESSENTIAL_EXTENSIONS_WC_URL . '/assets' );
    }

	/**
     * Load the plugin after all plugins are loaded.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function init_plugin() {

		do_action( 'essential_extensions_wc_before_init' );

        $this->includes();
        $this->init_hooks();

		// Fires after the plugin is loaded.
        do_action( 'essential_extensions_wc_init' );
    }

	/**
     * Include the required files.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function includes() {
        if ( $this->is_request( 'admin' ) ) {
            $this->container['installer'] = new EssentialExtensionsWC\Setup\Installer();
            $this->container['admin_menu'] = new EssentialExtensionsWC\Admin\Menu();
        }

        $this->container['assets']   = new EssentialExtensionsWC\Assets\Manager();
        $this->container['rest_api'] = new EssentialExtensionsWC\Api\Controller();
        $this->container['hooks'] = new EssentialExtensionsWC\Hooks\Manager();
    }

	/**
     * Initialize the hooks.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function init_hooks() {

        // Add necessary init hooks.
    }

	/**
     * Activating the plugin.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function activate() {
        // Run the installer to create necessary migrations and seeders.
    }

    /**
     * Placeholder for deactivation function.
     *
     * @since 0.1.0
     *
     * @return void
     */
    public function deactivate() {
        // Remove unnecessary data when deactivate
    }

	/**
     * Flush rewrite rules after plugin is activated.
     *
     * Nothing being added here yet.
     *
     * @since 0.1.0
	 *
	 * @return void
     */
    public function flush_rewrite_rules() {
        // fix rewrite rules
    }

    /**
     * What type of request is this?
     *
     * @param string $type admin, ajax, cron or public.
     *
     * @since 0.1.0
     *
     * @return bool
     */
    private function is_request( $type ) {
        switch ( $type ) {
            case 'admin':
                return is_admin();

            case 'ajax':
                return defined( 'DOING_AJAX' );

            case 'rest':
                return defined( 'REST_REQUEST' );

            case 'cron':
                return defined( 'DOING_CRON' );

            case 'frontend':
                return ( ! is_admin() || defined( 'DOING_AJAX' ) ) && ! defined( 'DOING_CRON' );
        }
    }

    /**
     * Check active extensions
     *
     * @since 0.1.0
     *
     * @return boolean
     */
    public function is_active_extension( $id ) {
        // Retrieve the saved extensions from the WordPress options table
        $saved_extensions = get_option( 'essential_extensions_wc_extensions', [] );

        // Convert the saved extensions array to an associative array keyed by 'id'
        $saved_extensions_assoc = [];
        foreach ( $saved_extensions as $extension ) {
            $saved_extensions_assoc[ $extension['id'] ] = $extension['is_active'];
        }

        // Return the 'is_active' status if the extension exists, otherwise default to true
        return isset( $saved_extensions_assoc[ $id ] ) ? $saved_extensions_assoc[ $id ] : true;
    }
}

/**
 * Initialize the main plugin.
 *
 * @since 0.1.0
 *
 * @return EssentialExtensionsWC
 */
function essential_extensions_wc() {
    return EssentialExtensionsWC::init();
}
essential_extensions_wc(); // Run EssentialExtensionsWC Plugin
