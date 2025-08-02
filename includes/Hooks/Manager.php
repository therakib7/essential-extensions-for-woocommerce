<?php

namespace EssentialExtensionsWC\Hooks;

use EssentialExtensionsWC\Hooks\Types\{
    Action\ActionCtrl,
    Filter\FilterCtrl
};

/**
 * Action & Filter hook
 *
 * @since 0.1.0
 */
class Manager {

    public function __construct() {
        new ActionCtrl();
        new FilterCtrl();
    }
}
