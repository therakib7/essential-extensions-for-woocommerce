<?php

namespace EssentialExtensionsWC\Abstracts;

use EssentialExtensionsWC\Traits\Sanitizer;
use EssentialExtensionsWC\Helpers\Keys;

/**
 * Rest Controller base class.
 *
 * @since 0.1.0
 */
abstract class RestApi extends \WP_REST_Controller {

    use Sanitizer;

    /**
     * Endpoint namespace.
     *
     * @var string
     */
    protected $namespace = 'essential-extensions-for-woocommerce/v1';

    /**
     * Endpoint base
     *
     * @var string
     */
    protected $base = '';

    /**
     * Check default permission for rest routes.
     *
     * @since 0.1.0
     *
     * @return bool
     */

    public function permission() {

        // Implement your permission check logic here
        if ( current_user_can( 'manage_options' ) ) {
            return true;
        }

        return new \WP_Error(
            'rest_forbidden',
            esc_html__( 'Sorry, you are not allowed to do that.', 'essential-extensions-for-woocommerce' ),
            [
                'status' => is_user_logged_in() ? 403 : 401,
            ]
        );
    }

        /**
     * Check authorization
     *
     * @since 0.1.0
     *
     * @param \WP_REST_Request $request Request object.
     *
     * @return boolean
     */
    public function check_authorization( $request ) {
        // Check if the Authorization header is present in the request
        $api_key = $request->get_header( 'Authorization' );
        $params = $request->get_params();
        $website_id = isset( $params['website_id'] ) ? untrailingslashit( $this->sanitize( $params['website_id'], 'url' ) ) : '';

        if ( ! empty( $api_key ) || ! empty( $website_id ) ) {
            // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions.obfuscation_base64_decode
            $api_key = base64_decode( $api_key );

            $settings = get_option( Keys::SETTINGS );

            if ( ! $settings ) {
                return false;
            }

            if ( ! isset( $settings['websites'] ) ) {
                return false;
            }

            return $this->match_website_and_api_key( $settings['websites'], $website_id, $api_key );
        } else {
            // Authorization header is not present
            return new \WP_Error( 'rest_forbidden', esc_html__( 'Authorization header is missing', 'essential-extensions-for-woocommerce' ), [ 'status' => rest_authorization_required_code() ] );
        }
    }

    /**
     * Check authorization by website and api key
     *
     * @since 0.1.0
     *
     * @param \WP_REST_Request $req Request object.
     *
     * @return boolean
     */
    public function match_website_and_api_key( $data, $website, $api_key ) {
        foreach ( $data as $nested_array ) {
            $website_match = false;
            $api_key_match = false;

            foreach ( $nested_array as $pair ) {
                if ( $pair['id'] === 'website' && $pair['value'] === $website ) {
                    $website_match = true;
                }
                if ( $pair['id'] === 'api_key' && $pair['value'] === $api_key ) {
                    $api_key_match = true;
                }
            }

            if ( $website_match && $api_key_match ) {
                return true; // Both website and api_key match in the same sub-array
            }
        }
        return false; // No match found
    }
}
