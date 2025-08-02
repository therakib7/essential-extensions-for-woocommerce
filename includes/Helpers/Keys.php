<?php

namespace EssentialExtensionsWC\Helpers;

/**
 * Manage all key strings.
 *
 * @since 0.1.0
 */
class Keys {

    /**
     * Prefix key.
     *
     * @var string
     *
     * @since 0.1.0
     */
    const PREFIX = 'essential_extensions_wc_';

    /**
     * Installed option key.
     *
     * @var string
     *
     * @since 0.1.0
     */
    const INSTALLED_AT = self::PREFIX . 'installed_at';

    /**
     * Version key.
     *
     * @var string
     *
     * @since 0.1.0
     */
    const VERSION = self::PREFIX . 'version';

    /**
     * Settings option key.
     *
     * @var string
     *
     * @since 0.1.0
     */
    const SETTINGS = self::PREFIX . 'settings';

    /**
     * Migrations ran key.
     *
     * @var string
     *
     * @since 0.1.0
     */
    const MIGRATION_RAN_AT = self::PREFIX . 'migration_ran_at';

    /**
     * Seeder ran key.
     *
     * @var string
     *
     * @since 0.1.0
     */
    const SEEDER_RAN_AT = self::PREFIX . 'seeder_ran_at';

    /**
     * Order post type key.
     *
     * Note: 4 words post type separation not working
     *
     * @var string
     *
     * @since 0.1.0
     */
    const ORDER_POST_TYPE = 'huborder_store_order';
}
