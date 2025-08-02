<?php

namespace EssentialExtensionsWC\Hooks\Types\Action\Types;

use EssentialExtensionsWC\Helpers\Keys;

class Webhook {

    public function __construct() {
        add_action( 'essential_extensions_wc_webhook', [ $this, 'webhook' ], 10, 2 );
    }

    /**
     * Trigger Webhook
     *
     * @since 0.1.0
     *
     * @param string $type
     * @param array $params
     *
     * @return void
     */
    public function webhook( $type = '', $params = [] ) {
    }
}
