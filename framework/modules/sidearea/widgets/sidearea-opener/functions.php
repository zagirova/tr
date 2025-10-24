<?php

if ( ! function_exists( 'wilmer_mikado_register_sidearea_opener_widget' ) ) {
	/**
	 * Function that register sidearea opener widget
	 */
	function wilmer_mikado_register_sidearea_opener_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassSideAreaOpener';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_sidearea_opener_widget' );
}