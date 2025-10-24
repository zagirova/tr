<?php

if ( ! function_exists( 'wilmer_mikado_register_recent_posts_widget' ) ) {
	/**
	 * Function that register search opener widget
	 */
	function wilmer_mikado_register_recent_posts_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassRecentPosts';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_recent_posts_widget' );
}