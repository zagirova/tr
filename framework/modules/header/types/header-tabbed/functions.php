<?php

if ( ! function_exists( 'wilmer_mikado_register_header_tabbed_type' ) ) {
	/**
	 * This function is used to register header type class for header factory file
	 */
	function wilmer_mikado_register_header_tabbed_type( $header_types ) {
		$header_type = array(
			'header-tabbed' => 'WilmerMikadoNamespace\Modules\Header\Types\HeaderTabbed'
		);
		
		$header_types = array_merge( $header_types, $header_type );
		
		return $header_types;
	}
}

if ( ! function_exists( 'wilmer_mikado_init_register_header_tabbed_type' ) ) {
	/**
	 * This function is used to wait header-function.php file to init header object and then to init hook registration function above
	 */
	function wilmer_mikado_init_register_header_tabbed_type() {
		add_filter( 'wilmer_mikado_filter_register_header_type_class', 'wilmer_mikado_register_header_tabbed_type' );
	}
	
	add_action( 'wilmer_mikado_action_before_header_function_init', 'wilmer_mikado_init_register_header_tabbed_type' );
}