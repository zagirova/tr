<?php

if ( ! function_exists( 'wilmer_mikado_register_author_info_widget' ) ) {
	/**
	 * Function that register author info widget
	 */
	function wilmer_mikado_register_author_info_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassAuthorInfoWidget';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_author_info_widget' );
}