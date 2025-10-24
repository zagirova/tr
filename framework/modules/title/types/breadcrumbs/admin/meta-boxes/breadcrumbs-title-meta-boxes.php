<?php

if ( ! function_exists( 'wilmer_mikado_get_hide_dep_for_breadcrumbs_title_meta_boxes' ) ) {
	function wilmer_mikado_get_hide_dep_for_breadcrumbs_title_meta_boxes() {
		$hide_dep_options = apply_filters( 'wilmer_mikado_filter_breadcrumbs_title_hide_meta_boxes', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wilmer_mikado_breadcrumbs_title_type_options_meta_boxes' ) ) {
	function wilmer_mikado_breadcrumbs_title_type_options_meta_boxes( $show_title_area_meta_container ) {
	    $hide_dep_options = wilmer_mikado_get_hide_dep_for_breadcrumbs_title_meta_boxes();
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_breadcrumbs_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Breadcrumbs Color', 'wilmer' ),
				'description' => esc_html__( 'Choose a color for breadcrumbs text', 'wilmer' ),
				'parent'      => $show_title_area_meta_container,
                'dependency'  => array(
                    'hide' => array(
                        'mkdf_title_area_type_meta' => $hide_dep_options
                    )
                )
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_additional_title_area_meta_boxes', 'wilmer_mikado_breadcrumbs_title_type_options_meta_boxes' );
}