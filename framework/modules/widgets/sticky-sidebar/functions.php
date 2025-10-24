<?php

if ( ! function_exists( 'wilmer_mikado_register_sticky_sidebar_widget' ) ) {
	/**
	 * Function that register sticky sidebar widget
	 */
	function wilmer_mikado_register_sticky_sidebar_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassStickySidebar';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_sticky_sidebar_widget' );
}