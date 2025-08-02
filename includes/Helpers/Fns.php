<?php

namespace EssentialExtensionsWC\Helpers;

use EssentialExtensionsWC\Helpers\Keys;

/**
 * Helper functions
 *
 * @since 0.1.0
 */
class Fns {

    /**
     * Format data time as WordPress format
     *
     * @since 0.1.0
     *
     * @param string $datetime
     *
     * @return string
     */
    public static function format_date( $date = '' ) {
        $date_format = get_option( 'date_format' );

        // Create DateTime objects
        $date = new \DateTime( $date );

        // Format the dates according to WordPress settings
        $formatted_date = $date->format( $date_format );

        return $formatted_date;
    }

    /**
     * Check order exists by website id
     *
     * @since 0.1.0
     *
     * @param string $website_id
     * @param int $order_id
     *
     * @return int|null
     */
    public static function is_order_exists( $website_id, $order_id ) {
        $args = [
            'post_type' => Keys::ORDER_POST_TYPE,
            'post_status' => 'publish',
            // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
            'meta_query' => [
                'relation' => 'AND',
                [
                    'key'     => 'website_id',
                    'value'   => $website_id,
                    'compare' => '=',
                ],
                [
                    'key'     => 'order_id',
                    'value'   => $order_id,
                    'compare' => '=',
                ],
            ],
            'fields' => 'ids',
            'posts_per_page' => 1,
        ];

        $posts = get_posts( $args );

        if ( $posts ) {
            $post_id = $posts[0];
            return $post_id;
        } else {
            return null;
        }
    }
}
