<?php

if ( ! function_exists( 'wilmer_mikado_register_button_widget' ) ) {
	/**
	 * Function that register button widget
	 */
	function wilmer_mikado_register_button_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassButtonWidget';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_button_widget' );
}