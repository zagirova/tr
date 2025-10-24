<?php

if ( ! function_exists( 'wilmer_mikado_set_title_standard_with_breadcrumbs_type_for_options' ) ) {
	/**
	 * This function set standard with breadcrumbs title type value for title options map and meta boxes
	 */
	function wilmer_mikado_set_title_standard_with_breadcrumbs_type_for_options( $type ) {
		$type['standard-with-breadcrumbs'] = esc_html__( 'Standard With Breadcrumbs', 'wilmer' );
		
		return $type;
	}
	
	add_filter( 'wilmer_mikado_filter_title_type_global_option', 'wilmer_mikado_set_title_standard_with_breadcrumbs_type_for_options' );
	add_filter( 'wilmer_mikado_filter_title_type_meta_boxes', 'wilmer_mikado_set_title_standard_with_breadcrumbs_type_for_options' );
}