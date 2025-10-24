<?php

if ( ! function_exists( 'wilmer_mikado_get_hide_dep_for_top_header_options' ) ) {
	function wilmer_mikado_get_hide_dep_for_top_header_options() {
		$hide_dep_options = apply_filters( 'wilmer_mikado_filter_top_header_hide_global_option', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wilmer_mikado_header_top_options_map' ) ) {
	function wilmer_mikado_header_top_options_map( $panel_header ) {
		$hide_dep_options = wilmer_mikado_get_hide_dep_for_top_header_options();
		
		$top_header_container = wilmer_mikado_add_admin_container_no_style(
			array(
				'type'            => 'container',
				'name'            => 'top_header_container',
				'parent'          => $panel_header,
				'dependency' => array(
					'hide' => array(
						'header_options'  => $hide_dep_options
					)
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'top_bar',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Top Bar', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will show top bar area', 'wilmer' ),
				'parent'        => $top_header_container,
			)
		);
		
		$top_bar_container = wilmer_mikado_add_admin_container(
			array(
				'name'            => 'top_bar_container',
				'parent'          => $top_header_container,
				'dependency' => array(
					'hide' => array(
						'top_bar'  => 'no'
					)
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'top_bar_in_grid',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Top Bar in Grid', 'wilmer' ),
				'description'   => esc_html__( 'Set top bar content to be in grid', 'wilmer' ),
				'parent'        => $top_bar_container
			)
		);
		
		$top_bar_in_grid_container = wilmer_mikado_add_admin_container(
			array(
				'name'            => 'top_bar_in_grid_container',
				'parent'          => $top_bar_container,
				'dependency' => array(
					'hide' => array(
						'top_bar_in_grid'  => 'no'
					)
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'        => 'top_bar_grid_background_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Grid Background Color', 'wilmer' ),
				'description' => esc_html__( 'Set grid background color for top bar', 'wilmer' ),
				'parent'      => $top_bar_in_grid_container
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'        => 'top_bar_grid_background_transparency',
				'type'        => 'text',
				'label'       => esc_html__( 'Grid Background Transparency', 'wilmer' ),
				'description' => esc_html__( 'Set grid background transparency for top bar', 'wilmer' ),
				'parent'      => $top_bar_in_grid_container,
				'args'        => array( 'col_width' => 3 )
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'        => 'top_bar_background_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Background Color', 'wilmer' ),
				'description' => esc_html__( 'Set background color for top bar', 'wilmer' ),
				'parent'      => $top_bar_container
			)
		);

        wilmer_mikado_add_admin_field(
            array(
                'name'        => 'top_bar_skin',
                'type'   => 'select',
                'default_value' => 'dark',
                'label'  => esc_html__( 'Top Bar Text Skin', 'wilmer' ),
                'options'=> array(
                    'dark' => esc_html__('Dark', 'wilmer'),
                    'light' => esc_html__('Light', 'wilmer'),
                ),
                'parent'      => $top_bar_container
            )
        );
		
		wilmer_mikado_add_admin_field(
			array(
				'name'        => 'top_bar_background_transparency',
				'type'        => 'text',
				'label'       => esc_html__( 'Background Transparency', 'wilmer' ),
				'description' => esc_html__( 'Set background transparency for top bar', 'wilmer' ),
				'parent'      => $top_bar_container,
				'args'        => array( 'col_width' => 3 )
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'          => 'top_bar_border',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Top Bar Border', 'wilmer' ),
				'description'   => esc_html__( 'Set top bar border', 'wilmer' ),
				'parent'        => $top_bar_container
			)
		);
		
		$top_bar_border_container = wilmer_mikado_add_admin_container(
			array(
				'name'            => 'top_bar_border_container',
				'parent'          => $top_bar_container,
				'dependency' => array(
					'hide' => array(
						'top_bar_border'  => 'no'
					)
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'        => 'top_bar_border_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Top Bar Border Color', 'wilmer' ),
				'description' => esc_html__( 'Set border color for top bar', 'wilmer' ),
				'parent'      => $top_bar_border_container
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'        => 'top_bar_height',
				'type'        => 'text',
				'label'       => esc_html__( 'Top Bar Height', 'wilmer' ),
				'description' => esc_html__( 'Enter top bar height (Default is 46px)', 'wilmer' ),
				'parent'      => $top_bar_container,
				'args'        => array(
					'col_width' => 2,
					'suffix'    => 'px'
				)
			)
		);
		
		wilmer_mikado_add_admin_field(
			array(
				'name'   => 'top_bar_side_padding',
				'type'   => 'text',
				'label'  => esc_html__( 'Top Bar Side Padding', 'wilmer' ),
				'parent' => $top_bar_container,
				'args'   => array(
					'col_width' => 2,
					'suffix'    => esc_html__( 'px or %', 'wilmer' )
				)
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_header_top_options_map', 'wilmer_mikado_header_top_options_map', 10, 1 );
}