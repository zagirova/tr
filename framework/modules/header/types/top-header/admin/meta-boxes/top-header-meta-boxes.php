<?php

if ( ! function_exists( 'wilmer_mikado_get_hide_dep_for_top_header_area_meta_boxes' ) ) {
	function wilmer_mikado_get_hide_dep_for_top_header_area_meta_boxes() {
		$hide_dep_options = apply_filters( 'wilmer_mikado_filter_top_header_hide_meta_boxes', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wilmer_mikado_header_top_area_meta_options_map' ) ) {
	function wilmer_mikado_header_top_area_meta_options_map( $header_meta_box ) {
		$hide_dep_options = wilmer_mikado_get_hide_dep_for_top_header_area_meta_boxes();
		
		$top_header_container = wilmer_mikado_add_admin_container_no_style(
			array(
				'type'            => 'container',
				'name'            => 'top_header_container',
				'parent'          => $header_meta_box,
				'dependency' => array(
					'hide' => array(
						'mkdf_header_type_meta'  => $hide_dep_options
					)
				)
			)
		);
		
		wilmer_mikado_add_admin_section_title(
			array(
				'parent' => $top_header_container,
				'name'   => 'top_area_style',
				'title'  => esc_html__( 'Top Area', 'wilmer' )
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_top_bar_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Header Top Bar', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will show header top bar area', 'wilmer' ),
				'parent'        => $top_header_container,
				'options'       => wilmer_mikado_get_yes_no_select_array(),
			)
		);

        $mkdf_custom_sidebars = wilmer_mikado_get_custom_sidebars();
        if ( count( $mkdf_custom_sidebars ) > 0 ) {
            wilmer_mikado_create_meta_box_field(
                array(
                    'name'        => 'mkdf_custom_top_bar_left_area_meta',
                    'type'        => 'selectblank',
                    'label'       => esc_html__( 'Choose Left Widget Area in Top Bar', 'wilmer' ),
                    'description' => esc_html__( 'Choose Custom Widget area to display in Top Bar"', 'wilmer' ),
                    'parent'      => $top_header_container,
                    'options'     => $mkdf_custom_sidebars,
                    'args'        => array(
                        'select2' => true
                    )
                )
            );
        }

        if ( count( $mkdf_custom_sidebars ) > 1 ) {
            wilmer_mikado_create_meta_box_field(
                array(
                    'name'        => 'mkdf_custom_top_bar_right_area_meta',
                    'type'        => 'selectblank',
                    'label'       => esc_html__( 'Choose Right Widget Area in Top Bar', 'wilmer' ),
                    'description' => esc_html__( 'Choose Custom Widget area to display in Top Bar"', 'wilmer' ),
                    'parent'      => $top_header_container,
                    'options'     => $mkdf_custom_sidebars,
                    'args'        => array(
                        'select2' => true
                    )
                )
            );
        }

		$top_bar_container = wilmer_mikado_add_admin_container_no_style(
			array(
				'name'            => 'top_bar_container_no_style',
				'parent'          => $top_header_container,
				'dependency' => array(
					'show' => array(
						'mkdf_top_bar_meta' => 'yes'
					)
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_top_bar_in_grid_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Top Bar In Grid', 'wilmer' ),
				'description'   => esc_html__( 'Set top bar content to be in grid', 'wilmer' ),
				'parent'        => $top_bar_container,
				'default_value' => '',
				'options'       => wilmer_mikado_get_yes_no_select_array()
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'   => 'mkdf_top_bar_background_color_meta',
				'type'   => 'color',
				'label'  => esc_html__( 'Top Bar Background Color', 'wilmer' ),
				'parent' => $top_bar_container
			)
		);

		wilmer_mikado_create_meta_box_field(
			array(
				'name'   => 'mkdf_top_bar_skin_meta',
				'type'   => 'select',
                'default_value' => '',
				'label'  => esc_html__( 'Top Bar Text Skin', 'wilmer' ),
                'options'=> array(
                    ''  => esc_html__("Default", 'wilmer'),
                    'dark' => esc_html__('Dark', 'wilmer'),
                    'light' => esc_html__('Light', 'wilmer'),
                ),
				'parent' => $top_bar_container
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_top_bar_background_transparency_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Top Bar Background Color Transparency', 'wilmer' ),
				'description' => esc_html__( 'Set top bar background color transparenct. Value should be between 0 and 1', 'wilmer' ),
				'parent'      => $top_bar_container,
				'args'        => array(
					'col_width' => 3
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_top_bar_border_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Top Bar Border', 'wilmer' ),
				'description'   => esc_html__( 'Set border on top bar', 'wilmer' ),
				'parent'        => $top_bar_container,
				'default_value' => '',
				'options'       => wilmer_mikado_get_yes_no_select_array()
			)
		);
		
		$top_bar_border_container = wilmer_mikado_add_admin_container(
			array(
				'type'            => 'container',
				'name'            => 'top_bar_border_container',
				'parent'          => $top_bar_container,
				'dependency' => array(
					'show' => array(
						'mkdf_top_bar_border_meta' => 'yes'
					)
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_top_bar_border_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Border Color', 'wilmer' ),
				'description' => esc_html__( 'Choose color for top bar border', 'wilmer' ),
				'parent'      => $top_bar_border_container
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_additional_header_area_meta_boxes_map', 'wilmer_mikado_header_top_area_meta_options_map' );
}