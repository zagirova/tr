<?php

if ( ! function_exists( 'wilmer_mikado_map_sidebar_meta' ) ) {
	function wilmer_mikado_map_sidebar_meta() {
		$mkdf_sidebar_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'wilmer_mikado_filter_set_scope_for_meta_boxes', array( 'page' ), 'sidebar_meta' ),
				'title' => esc_html__( 'Sidebar', 'wilmer' ),
				'name'  => 'sidebar_meta'
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_sidebar_layout_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Sidebar Layout', 'wilmer' ),
				'description' => esc_html__( 'Choose the sidebar layout', 'wilmer' ),
				'parent'      => $mkdf_sidebar_meta_box,
                'options'       => wilmer_mikado_get_custom_sidebars_options( true )
			)
		);
		
		$mkdf_custom_sidebars = wilmer_mikado_get_custom_sidebars();
		if ( count( $mkdf_custom_sidebars ) > 0 ) {
			wilmer_mikado_create_meta_box_field(
				array(
                        'name'        => 'mkdf_custom_sidebar_area_meta',
					'type'        => 'selectblank',
					'label'       => esc_html__( 'Choose Widget Area in Sidebar', 'wilmer' ),
					'description' => esc_html__( 'Choose Custom Widget area to display in Sidebar"', 'wilmer' ),
					'parent'      => $mkdf_sidebar_meta_box,
					'options'     => $mkdf_custom_sidebars,
					'args'        => array(
						'select2' => true
					)
				)
			);
		}
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_mikado_map_sidebar_meta', 31 );
}