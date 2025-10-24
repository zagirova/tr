<?php

if ( ! function_exists( 'wilmer_mikado_include_blog_shortcodes' ) ) {
	function wilmer_mikado_include_blog_shortcodes() {
		if ( wilmer_mikado_is_theme_registered() ) {
			foreach ( glob( MIKADO_FRAMEWORK_MODULES_ROOT_DIR . '/blog/shortcodes/*/load.php' ) as $shortcode_load ) {
				include_once $shortcode_load;
			}
		}
	}

	if ( wilmer_mikado_is_plugin_installed( 'core' ) ) {
		add_action( 'wilmer_core_action_include_shortcodes_file', 'wilmer_mikado_include_blog_shortcodes' );
	}
}
// Load blog elementor widgets
if ( ! function_exists( 'wilmer_mikado_include_blog_elementor_widgets_files' ) ) {
	/**
	 * Loades all shortcodes by going through all folders that are placed directly in shortcodes folder
	 */
	function wilmer_mikado_include_blog_elementor_widgets_files() {
		if ( wilmer_mikado_is_plugin_installed( 'core' ) && wilmer_mikado_is_theme_registered() ) {
			foreach ( glob( MIKADO_FRAMEWORK_MODULES_ROOT_DIR . '/blog/shortcodes/*/elementor-*.php' ) as $shortcode_load ) {
				include_once $shortcode_load;
			}
		}
	}

	if ( defined( 'ELEMENTOR_VERSION' ) ) {
		if ( version_compare( ELEMENTOR_VERSION, '3.5.0', '>' ) ) {
			add_action( 'elementor/widgets/register', 'wilmer_mikado_include_blog_elementor_widgets_files' );
		} else {
			add_action( 'elementor/widgets/widgets_registered', 'wilmer_mikado_include_blog_elementor_widgets_files' );
		}
	}
}
