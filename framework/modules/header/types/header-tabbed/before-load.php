<?php

if ( ! function_exists( 'wilmer_mikado_set_header_tabbed_type_global_option' ) ) {
	/**
	 * This function set header type value for global header option map
	 */
	function wilmer_mikado_set_header_tabbed_type_global_option( $header_types ) {
		$header_types['header-tabbed'] = array(
			'image' => MIKADO_FRAMEWORK_HEADER_TYPES_ROOT . '/header-tabbed/assets/img/header-tabbed.png',
			'label' => esc_html__( 'Tabbed', 'wilmer' )
		);
		
		return $header_types;
	}
	
	add_filter( 'wilmer_mikado_filter_header_type_global_option', 'wilmer_mikado_set_header_tabbed_type_global_option' );
}

if ( ! function_exists( 'wilmer_mikado_set_header_tabbed_type_meta_boxes_option' ) ) {
	/**
	 * This function set header type value for header meta boxes map
	 */
	function wilmer_mikado_set_header_tabbed_type_meta_boxes_option( $header_type_options ) {
		$header_type_options['header-tabbed'] = esc_html__( 'Tabbed', 'wilmer' );
		
		return $header_type_options;
	}
	
	add_filter( 'wilmer_mikado_filter_header_type_meta_boxes', 'wilmer_mikado_set_header_tabbed_type_meta_boxes_option' );
}

if ( ! function_exists( 'wilmer_mikado_set_hide_dep_options_header_tabbed' ) ) {
	/**
	 * This function is used to hide all containers/panels for admin options when this header type is selected
	 */
	function wilmer_mikado_set_hide_dep_options_header_tabbed( $hide_dep_options ) {
		$hide_dep_options[] = 'header-tabbed';
		
		return $hide_dep_options;
	}
	
	// header global panel options
	add_filter( 'wilmer_mikado_filter_header_logo_area_hide_global_option', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	
	// header global panel meta boxes
	add_filter( 'wilmer_mikado_filter_header_logo_area_hide_meta_boxes', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	
	// header types panel options
	add_filter( 'wilmer_mikado_filter_full_screen_menu_hide_global_option', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	add_filter( 'wilmer_mikado_filter_header_centered_hide_global_option', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	add_filter( 'wilmer_mikado_filter_header_standard_hide_global_option', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	add_filter( 'wilmer_mikado_filter_header_vertical_hide_global_option', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	add_filter( 'wilmer_mikado_filter_header_vertical_menu_hide_global_option', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	add_filter( 'wilmer_mikado_filter_header_vertical_closed_hide_global_option', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	add_filter( 'wilmer_mikado_filter_header_vertical_sliding_hide_global_option', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	
	// header types panel meta boxes
	add_filter( 'wilmer_mikado_filter_header_centered_hide_meta_boxes', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	add_filter( 'wilmer_mikado_filter_header_standard_hide_meta_boxes', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
	add_filter( 'wilmer_mikado_filter_header_vertical_hide_meta_boxes', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );

	// header widget area meta boxes
	add_filter( 'wilmer_mikado_filter_header_widget_area_two_hide_meta_boxes', 'wilmer_mikado_set_hide_dep_options_header_tabbed' );
}