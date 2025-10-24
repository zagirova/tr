<?php

if ( ! function_exists( 'wilmer_mikado_register_image_gallery_widget' ) ) {
	/**
	 * Function that register image gallery widget
	 */
	function wilmer_mikado_register_image_gallery_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassImageGalleryWidget';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_image_gallery_widget' );
}