<?php
namespace EssentialExtensionsWC\Hooks\Types\Action;

use EssentialExtensionsWC\Hooks\Types\Action\Types\{
    Webhook
};

/**
 * WP Action hook
 *
 * @since 0.1.0
 */
class ActionCtrl {

    public function __construct() {
        new Webhook();
    }
}
