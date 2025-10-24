<?php

if ( ! function_exists( 'wilmer_mikado_footer_options_map' ) ) {
	function wilmer_mikado_footer_options_map() {

		wilmer_mikado_add_admin_page(
			array(
				'slug'  => '_footer_page',
				'title' => esc_html__( 'Footer', 'wilmer' ),
				'icon'  => 'fa fa-sort-amount-asc'
			)
		);

		$footer_panel = wilmer_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Footer', 'wilmer' ),
				'name'  => 'footer',
				'page'  => '_footer_page'
			)
		);

		wilmer_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'footer_in_grid',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Footer in Grid', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will place Footer content in grid', 'wilmer' ),
				'parent'        => $footer_panel
			)
		);

        wilmer_mikado_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'uncovering_footer',
                'default_value' => 'no',
                'label'         => esc_html__( 'Uncovering Footer', 'wilmer' ),
                'description'   => esc_html__( 'Enabling this option will make Footer gradually appear on scroll', 'wilmer' ),
                'parent'        => $footer_panel
            )
        );

		wilmer_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'show_footer_top',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show Footer Top', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Top area', 'wilmer' ),
				'parent'        => $footer_panel
			)
		);
		
		$show_footer_top_container = wilmer_mikado_add_admin_container(
			array(
				'name'       => 'show_footer_top_container',
				'parent'     => $footer_panel,
				'dependency' => array(
					'show' => array(
						'show_footer_top' => 'yes'
					)
				)
			)
		);

		wilmer_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_top_columns',
				'parent'        => $show_footer_top_container,
				'default_value' => '3 3 3 3',
				'label'         => esc_html__( 'Footer Top Columns', 'wilmer' ),
				'description'   => esc_html__( 'Choose number of columns for Footer Top area', 'wilmer' ),
				'options'       => array(
					'12' => '1',
					'6 6' => '2',
					'4 4 4' => '3',
                    '3 3 6' => '3 (25% + 25% + 50%)',
					'3 3 3 3' => '4'
				)
			)
		);

		wilmer_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_top_columns_alignment',
				'default_value' => 'left',
				'label'         => esc_html__( 'Footer Top Columns Alignment', 'wilmer' ),
				'description'   => esc_html__( 'Text Alignment in Footer Columns', 'wilmer' ),
				'options'       => array(
					''       => esc_html__( 'Default', 'wilmer' ),
					'left'   => esc_html__( 'Left', 'wilmer' ),
					'center' => esc_html__( 'Center', 'wilmer' ),
					'right'  => esc_html__( 'Right', 'wilmer' )
				),
				'parent'        => $show_footer_top_container
			)
		);
		
		$footer_top_styles_group = wilmer_mikado_add_admin_group(
			array(
				'name'        => 'footer_top_styles_group',
				'title'       => esc_html__( 'Footer Top Styles', 'wilmer' ),
				'description' => esc_html__( 'Define style for footer top area', 'wilmer' ),
				'parent'      => $show_footer_top_container
			)
		);
		
		$footer_top_styles_row_1 = wilmer_mikado_add_admin_row(
			array(
				'name'   => 'footer_top_styles_row_1',
				'parent' => $footer_top_styles_group
			)
		);
		
			wilmer_mikado_add_admin_field(
				array(
					'name'   => 'footer_top_background_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Background Color', 'wilmer' ),
					'parent' => $footer_top_styles_row_1
				)
			);
			
			wilmer_mikado_add_admin_field(
				array(
					'name'   => 'footer_top_border_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Border Color', 'wilmer' ),
					'parent' => $footer_top_styles_row_1
				)
			);
			
			wilmer_mikado_add_admin_field(
				array(
					'name'   => 'footer_top_border_width',
					'type'   => 'textsimple',
					'label'  => esc_html__( 'Border Width', 'wilmer' ),
					'parent' => $footer_top_styles_row_1,
					'args'   => array(
						'suffix' => 'px'
					)
				)
			);

		wilmer_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'show_footer_bottom',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show Footer Bottom', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Bottom area', 'wilmer' ),
				'parent'        => $footer_panel
			)
		);

		$show_footer_bottom_container = wilmer_mikado_add_admin_container(
			array(
				'name'            => 'show_footer_bottom_container',
				'parent'          => $footer_panel,
				'dependency' => array(
					'show' => array(
						'show_footer_bottom'  => 'yes'
					)
				)
			)
		);

		wilmer_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_bottom_columns',
				'default_value' => '6 6',
				'label'         => esc_html__( 'Footer Bottom Columns', 'wilmer' ),
				'description'   => esc_html__( 'Choose number of columns for Footer Bottom area', 'wilmer' ),
				'options'       => array(
					'12' => '1',
					'6 6' => '2',
					'4 4 4' => '3'
				),
				'parent'        => $show_footer_bottom_container
			)
		);
		
		$footer_bottom_styles_group = wilmer_mikado_add_admin_group(
			array(
				'name'        => 'footer_bottom_styles_group',
				'title'       => esc_html__( 'Footer Bottom Styles', 'wilmer' ),
				'description' => esc_html__( 'Define style for footer bottom area', 'wilmer' ),
				'parent'      => $show_footer_bottom_container
			)
		);
		
		$footer_bottom_styles_row_1 = wilmer_mikado_add_admin_row(
			array(
				'name'   => 'footer_bottom_styles_row_1',
				'parent' => $footer_bottom_styles_group
			)
		);
		
			wilmer_mikado_add_admin_field(
				array(
					'name'   => 'footer_bottom_background_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Background Color', 'wilmer' ),
					'parent' => $footer_bottom_styles_row_1
				)
			);
			
			wilmer_mikado_add_admin_field(
				array(
					'name'   => 'footer_bottom_border_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Border Color', 'wilmer' ),
					'parent' => $footer_bottom_styles_row_1
				)
			);
			
			wilmer_mikado_add_admin_field(
				array(
					'name'   => 'footer_bottom_border_width',
					'type'   => 'textsimple',
					'label'  => esc_html__( 'Border Width', 'wilmer' ),
					'parent' => $footer_bottom_styles_row_1,
					'args'   => array(
						'suffix' => 'px'
					)
				)
			);
	}

	add_action( 'wilmer_mikado_action_options_map', 'wilmer_mikado_footer_options_map', wilmer_mikado_set_options_map_position( 'footer' ) );
}