<?php

if ( wilmer_mikado_is_plugin_installed( 'contact-form-7' ) ) {
	include_once MIKADO_FRAMEWORK_MODULES_ROOT_DIR . '/widgets/contact-form-7/contact-form-7.php';
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_cf7_widget' );
}

if ( ! function_exists( 'wilmer_mikado_register_cf7_widget' ) ) {
	/**
	 * Function that register cf7 widget
	 */
	function wilmer_mikado_register_cf7_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassContactForm7Widget';
		
		return $widgets;
	}
}