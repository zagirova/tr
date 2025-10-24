<?php

if ( ! function_exists( 'wilmer_mikado_skewed_section_title_meta' ) ) {
	function wilmer_mikado_skewed_section_title_meta( $show_title_area_container ) {
		
		wilmer_mikado_add_admin_section_title(
			array(
				'parent' => $show_title_area_container,
				'name'   => 'skewed_section_container',
				'title'  => esc_html__( 'Skewed Section', 'wilmer' )
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_enable_skewed_section_on_title_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Enable Skewed Section', 'wilmer' ),
				'description'   => esc_html__( 'This option will enable/disable Skew Section on Title Area', 'wilmer' ),
				'options'       => wilmer_mikado_get_yes_no_select_array(),
				'parent'        => $show_title_area_container
			)
		);
		
		$show_skewed_section_title_area_container = wilmer_mikado_add_admin_container(
			array(
				'parent'     => $show_title_area_container,
				'name'       => 'show_skewed_section_title_area_container',
				'dependency' => array(
					'show' => array(
						'mkdf_enable_skewed_section_on_title_area_meta' => 'yes'
					)
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_title_area_skewed_section_type_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Position', 'wilmer' ),
				'description'   => esc_html__( 'Specify skewed section position', 'wilmer' ),
				'parent'        => $show_skewed_section_title_area_container,
				'options'       => array(
					''        => esc_html__( 'Default', 'wilmer' ),
					'outline' => esc_html__( 'Outline', 'wilmer' ),
					'inset'   => esc_html__( 'Inset', 'wilmer' )
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_title_area_container,
				'type'        => 'textarea',
				'name'        => 'mkdf_title_area_skewed_section_svg_path_meta',
				'label'       => esc_html__( 'Skewed Section On Title Area SVG Path', 'wilmer' ),
				'description' => esc_html__( 'Enter your Section On Title Area SVG path here. Please remove version and id attributes from your SVG path because of HTML validation', 'wilmer' ),
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_title_area_container,
				'type'        => 'color',
				'name'        => 'mkdf_title_area_skewed_section_svg_color_meta',
				'label'       => esc_html__( 'Skewed Section Color', 'wilmer' ),
				'description' => esc_html__( 'Choose a background color for Skewed Section', 'wilmer' ),
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_additional_title_area_meta_boxes', 'wilmer_mikado_skewed_section_title_meta', 20 );
}

if ( ! function_exists( 'wilmer_mikado_skewed_section_header_meta' ) ) {
	function wilmer_mikado_skewed_section_header_meta( $show_header_area_container ) {
		
		wilmer_mikado_add_admin_section_title(
			array(
				'parent' => $show_header_area_container,
				'name'   => 'skewed_section_container',
				'title'  => esc_html__( 'Skewed Section', 'wilmer' )
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_enable_skewed_section_on_header_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Enable Skewed Section', 'wilmer' ),
				'description'   => esc_html__( 'This option will enable/disable Skew Section on Header Area', 'wilmer' ),
				'options'       => wilmer_mikado_get_yes_no_select_array(),
				'parent'        => $show_header_area_container
			)
		);
		
		$show_skewed_section_header_area_container = wilmer_mikado_add_admin_container(
			array(
				'parent'     => $show_header_area_container,
				'name'       => 'show_skewed_section_header_area_container',
				'dependency' => array(
					'show' => array(
						'mkdf_enable_skewed_section_on_header_area_meta' => 'yes'
					)
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_header_area_container,
				'type'        => 'textarea',
				'name'        => 'mkdf_header_area_skewed_section_svg_path_meta',
				'label'       => esc_html__( 'Skewed Section On Header Area SVG Path', 'wilmer' ),
				'description' => esc_html__( 'Enter your Section On Header Area SVG path here. Please remove version and id attributes from your SVG path because of HTML validation', 'wilmer' ),
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_header_area_container,
				'type'        => 'color',
				'name'        => 'mkdf_header_area_skewed_section_svg_color_meta',
				'label'       => esc_html__( 'Skewed Section Color', 'wilmer' ),
				'description' => esc_html__( 'Choose a background color for Skewed Section', 'wilmer' ),
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_additional_header_area_meta_boxes', 'wilmer_mikado_skewed_section_header_meta', 20 );
}