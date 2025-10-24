<?php

if ( ! function_exists( 'wilmer_mikado_register_custom_font_widget' ) ) {
	/**
	 * Function that register custom font widget
	 */
	function wilmer_mikado_register_custom_font_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassCustomFontWidget';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_custom_font_widget' );
}