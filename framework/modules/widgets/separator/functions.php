<?php

if ( ! function_exists( 'wilmer_mikado_register_separator_widget' ) ) {
	/**
	 * Function that register separator widget
	 */
	function wilmer_mikado_register_separator_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassSeparatorWidget';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_separator_widget' );
}