<?php

if ( ! function_exists( 'wilmer_mikado_disable_wpml_css' ) ) {
	function wilmer_mikado_disable_wpml_css() {
		define( 'ICL_DONT_LOAD_LANGUAGE_SELECTOR_CSS', true );
	}
	
	add_action( 'after_setup_theme', 'wilmer_mikado_disable_wpml_css' );
}