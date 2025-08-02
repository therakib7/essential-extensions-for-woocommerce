<?php
namespace EssentialExtensionsWC\Hooks\Types\Filter\Types;

class ActionLink {

    public function __construct() {
        add_filter( 'plugin_action_links_' . plugin_basename( ESSENTIAL_EXTENSIONS_WC_FILE ), [ $this, 'action_links' ] );
    }

    /**
	 * Action links.
	 *
	 * @since 0.1.0
	 *
	 * @param array $links
	 *
	 * @return array
	 */
	public function action_links( $links ) {
		$links[] = '<a target="_blank" href="' . esc_url( 'https://softtent.com/essential-extensions-for-woocommerce/docs' ) . '">' . esc_html__( 'Documentation', 'essential-extensions-for-woocommerce' ) . '</a>';

		if ( array_key_exists( 'deactivate', $links ) ) {
            $links['deactivate'] = str_replace( '<a', '<a class="essential-extensions-for-woocommerce-deactivate-link"', $links['deactivate'] );
        }
		return $links;
	}
}
