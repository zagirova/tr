<?php

if ( ! function_exists( 'wilmer_mikado_register_required_plugins' ) ) {
	/**
	 * Registers theme required and optional plugins. Hooks to tgmpa_register hook
	 */
	function wilmer_mikado_register_required_plugins() {
		$plugins = array(
			array(
				'name'               => esc_html__( 'WPBakery Visual Composer', 'wilmer' ),
				'slug'               => 'js_composer',
				'source'             => get_template_directory() . '/includes/plugins/js_composer.zip',
				'version'            => '8.6.1',
				'required'           => false,
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			array(
				'name'               => esc_html__( 'Elementor', 'wilmer' ),
				'slug'               => 'elementor',
				'required'           => true,
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			array(
				'name'               => esc_html__( 'Qi Addons for Elementor', 'wilmer' ),
				'slug'               => 'qi-addons-for-elementor',
				'required'           => true,
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			array(
				'name'               => esc_html__( 'QODE Wishlist for WooCommerce', 'wilmer' ),
				'slug'               => 'qode-wishlist-for-woocommerce',
				'required'           => true,
			),
			array(
				'name'               => esc_html__( 'QODE Quick View for WooCommerce', 'wilmer' ),
				'slug'               => 'qode-quick-view-for-woocommerce',
				'required'           => true,
			),
			array(
				'name'               => esc_html__( 'Qi Blocks', 'wilmer' ),
				'slug'               => 'qi-blocks',
				'required'           => true,
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			array(
				'name'               => esc_html__( 'Revolution Slider', 'wilmer' ),
				'slug'               => 'revslider',
				'source'             => get_template_directory() . '/includes/plugins/revslider.zip',
				'version'            => '6.7.37',
				'required'           => true,
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			array(
				'name'               => esc_html__( 'Wilmer Core', 'wilmer' ),
				'slug'               => 'wilmer-core',
				'source'             => get_template_directory() . '/includes/plugins/wilmer-core.zip',
				'version'            => '2.4.6',
				'required'           => true,
				'force_activation'   => false,
				'force_deactivation' => false,
			),
			array(
				'name'     => esc_html__( 'Custom Twitter Feeds', 'wilmer' ),
				'slug'     => 'custom-twitter-feeds',
				'required' => false,
			),
			array(
				'name'     => esc_html__( 'WooCommerce plugin', 'wilmer' ),
				'slug'     => 'woocommerce',
				'required' => true,
			),
			array(
				'name'     => esc_html__( 'Contact Form 7', 'wilmer' ),
				'slug'     => 'contact-form-7',
				'required' => false,
			),
			array(
				'name'     => esc_html__( 'Envato Market', 'wilmer' ),
				'slug'     => 'envato-market',
				'source'   => 'https://envato.github.io/wp-envato-market/dist/envato-market.zip',
				'required' => false,
			),
		);

		$config = array(
			'domain'       => 'wilmer',
			'default_path' => '',
			'parent_slug'  => 'themes.php',
			'capability'   => 'edit_theme_options',
			'menu'         => 'install-required-plugins',
			'has_notices'  => true,
			'is_automatic' => false,
			'message'      => '',
			'strings'      => array(
				'page_title'                      => esc_html__( 'Install Required Plugins', 'wilmer' ),
				'menu_title'                      => esc_html__( 'Install Plugins', 'wilmer' ),
				'installing'                      => esc_html__( 'Installing Plugin: %s', 'wilmer' ),
				'oops'                            => esc_html__( 'Something went wrong with the plugin API.', 'wilmer' ),
				'notice_can_install_required'     => _n_noop( 'This theme requires the following plugin: %1$s.', 'This theme requires the following plugins: %1$s.', 'wilmer' ),
				'notice_can_install_recommended'  => _n_noop( 'This theme recommends the following plugin: %1$s.', 'This theme recommends the following plugins: %1$s.', 'wilmer' ),
				'notice_cannot_install'           => _n_noop( 'Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'wilmer' ),
				'notice_can_activate_required'    => _n_noop( 'The following required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'wilmer' ),
				'notice_can_activate_recommended' => _n_noop( 'The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'wilmer' ),
				'notice_cannot_activate'          => _n_noop( 'Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'wilmer' ),
				'notice_ask_to_update'            => _n_noop( 'The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.', 'wilmer' ),
				'notice_cannot_update'            => _n_noop( 'Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'wilmer' ),
				'install_link'                    => _n_noop( 'Begin installing plugin', 'Begin installing plugins', 'wilmer' ),
				'activate_link'                   => _n_noop( 'Activate installed plugin', 'Activate installed plugins', 'wilmer' ),
				'return'                          => esc_html__( 'Return to Required Plugins Installer', 'wilmer' ),
				'plugin_activated'                => esc_html__( 'Plugin activated successfully.', 'wilmer' ),
				'complete'                        => esc_html__( 'All plugins installed and activated successfully. %s', 'wilmer' ),
				'nag_type'                        => 'updated',
			),
		);

		tgmpa( $plugins, $config );
	}

	add_action( 'tgmpa_register', 'wilmer_mikado_register_required_plugins' );
}
