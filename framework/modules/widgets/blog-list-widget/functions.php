<?php

if ( ! function_exists( 'wilmer_mikado_register_blog_list_widget' ) ) {
	/**
	 * Function that register blog list widget
	 */
	function wilmer_mikado_register_blog_list_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassBlogListWidget';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_blog_list_widget' );
}