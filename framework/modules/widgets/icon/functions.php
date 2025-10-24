<?php

if ( ! function_exists( 'wilmer_mikado_register_icon_widget' ) ) {
	/**
	 * Function that register icon widget
	 */
	function wilmer_mikado_register_icon_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassIconWidget';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_icon_widget' );
}