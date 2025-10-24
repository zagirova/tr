<?php

if ( ! function_exists( 'wilmer_mikado_map_general_meta' ) ) {
	function wilmer_mikado_map_general_meta() {
		
		$general_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'wilmer_mikado_filter_set_scope_for_meta_boxes', array( 'page', 'post' ), 'general_meta' ),
				'title' => esc_html__( 'General', 'wilmer' ),
				'name'  => 'general_meta'
			)
		);
		
		/***************** Slider Layout - begin **********************/
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_page_slider_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Slider Shortcode', 'wilmer' ),
				'description' => esc_html__( 'Paste your slider shortcode here', 'wilmer' ),
				'parent'      => $general_meta_box
			)
		);
		
		/***************** Slider Layout - begin **********************/
		
		/***************** Content Layout - begin **********************/
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_page_content_behind_header_meta',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Always put content behind header', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will put page content behind page header', 'wilmer' ),
				'parent'        => $general_meta_box
			)
		);
		
		$mkdf_content_padding_group = wilmer_mikado_add_admin_group(
			array(
				'name'        => 'content_padding_group',
				'title'       => esc_html__( 'Content Styles', 'wilmer' ),
				'description' => esc_html__( 'Define styles for Content area', 'wilmer' ),
				'parent'      => $general_meta_box
			)
		);
		
			$mkdf_content_padding_row = wilmer_mikado_add_admin_row(
				array(
					'name'   => 'mkdf_content_padding_row',
					'parent' => $mkdf_content_padding_group
				)
			);
			
				wilmer_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_page_background_color_meta',
						'type'        => 'colorsimple',
						'label'       => esc_html__( 'Page Background Color', 'wilmer' ),
						'parent'      => $mkdf_content_padding_row
					)
				);
				
				wilmer_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_page_background_image_meta',
						'type'          => 'imagesimple',
						'label'         => esc_html__( 'Page Background Image', 'wilmer' ),
						'parent'        => $mkdf_content_padding_row
					)
				);
				
				wilmer_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_page_background_repeat_meta',
						'type'          => 'selectsimple',
						'default_value' => '',
						'label'         => esc_html__( 'Page Background Image Repeat', 'wilmer' ),
						'options'       => wilmer_mikado_get_yes_no_select_array(),
						'parent'        => $mkdf_content_padding_row
					)
				);
		
			$mkdf_content_padding_row_1 = wilmer_mikado_add_admin_row(
				array(
					'name'   => 'mkdf_content_padding_row_1',
					'next'   => true,
					'parent' => $mkdf_content_padding_group
				)
			);
		
				wilmer_mikado_create_meta_box_field(
					array(
						'name'   => 'mkdf_page_content_padding',
						'type'   => 'textsimple',
						'label'  => esc_html__( 'Content Padding (eg. 10px 5px 10px 5px)', 'wilmer' ),
						'parent' => $mkdf_content_padding_row_1,
						'args'        => array(
							'col_width' => 4
						)
					)
				);
				
				wilmer_mikado_create_meta_box_field(
					array(
						'name'    => 'mkdf_page_content_padding_mobile',
						'type'    => 'textsimple',
						'label'   => esc_html__( 'Content Padding for mobile (eg. 10px 5px 10px 5px)', 'wilmer' ),
						'parent'  => $mkdf_content_padding_row_1,
						'args'        => array(
							'col_width' => 4
						)
					)
				);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_initial_content_width_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Initial Width of Content', 'wilmer' ),
				'description'   => esc_html__( 'Choose the initial width of content which is in grid (Applies to pages set to "Default Template" and rows set to "In Grid")', 'wilmer' ),
				'parent'        => $general_meta_box,
				'options'       => array(
					''                => esc_html__( 'Default', 'wilmer' ),
					'mkdf-grid-1300' => esc_html__( '1300px', 'wilmer' ),
					'mkdf-grid-1200' => esc_html__( '1200px', 'wilmer' ),
					'mkdf-grid-1100' => esc_html__( '1100px', 'wilmer' ),
					'mkdf-grid-1000' => esc_html__( '1000px', 'wilmer' ),
					'mkdf-grid-800'  => esc_html__( '800px', 'wilmer' )
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_page_grid_space_meta',
				'type'        => 'select',
				'default_value' => '',
				'label'       => esc_html__( 'Grid Layout Space', 'wilmer' ),
				'description' => esc_html__( 'Choose a space between content layout and sidebar layout for your page', 'wilmer' ),
				'options'     => wilmer_mikado_get_space_between_items_array( true ),
				'parent'      => $general_meta_box
			)
		);

		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_page_background_grid_meta',
				'type'        => 'select',
				'default_value' => '',
				'label'       => esc_html__( 'Page Background Grid and Pattern', 'wilmer' ),
				'description' => esc_html__( 'Enable this option if you want to enable page background grid and pattern', 'wilmer' ),
				'options'     => wilmer_mikado_get_yes_no_select_array( true ),
				'parent'      => $general_meta_box
			)
		);


		
		/***************** Content Layout - end **********************/
		
		/***************** Boxed Layout - begin **********************/
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'    => 'mkdf_boxed_meta',
				'type'    => 'select',
				'label'   => esc_html__( 'Boxed Layout', 'wilmer' ),
				'parent'  => $general_meta_box,
				'options' => wilmer_mikado_get_yes_no_select_array()
			)
		);
		
			$boxed_container_meta = wilmer_mikado_add_admin_container(
				array(
					'parent'          => $general_meta_box,
					'name'            => 'boxed_container_meta',
					'dependency' => array(
						'hide' => array(
							'mkdf_boxed_meta' => array( '', 'no' )
						)
					)
				)
			);
		
				wilmer_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_page_background_color_in_box_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Page Background Color', 'wilmer' ),
						'description' => esc_html__( 'Choose the page background color outside box', 'wilmer' ),
						'parent'      => $boxed_container_meta
					)
				);
				
				wilmer_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_boxed_background_image_meta',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Image', 'wilmer' ),
						'description' => esc_html__( 'Choose an image to be displayed in background', 'wilmer' ),
						'parent'      => $boxed_container_meta
					)
				);
				
				wilmer_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_boxed_pattern_background_image_meta',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Pattern', 'wilmer' ),
						'description' => esc_html__( 'Choose an image to be used as background pattern', 'wilmer' ),
						'parent'      => $boxed_container_meta
					)
				);
				
				wilmer_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_boxed_background_image_attachment_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Background Image Attachment', 'wilmer' ),
						'description'   => esc_html__( 'Choose background image attachment', 'wilmer' ),
						'parent'        => $boxed_container_meta,
						'options'       => array(
							''       => esc_html__( 'Default', 'wilmer' ),
							'fixed'  => esc_html__( 'Fixed', 'wilmer' ),
							'scroll' => esc_html__( 'Scroll', 'wilmer' )
						)
					)
				);
		
		/***************** Boxed Layout - end **********************/
		
		/***************** Passepartout Layout - begin **********************/
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_paspartu_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Passepartout', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will display passepartout around site content', 'wilmer' ),
				'parent'        => $general_meta_box,
				'options'       => wilmer_mikado_get_yes_no_select_array(),
			)
		);
		
			$paspartu_container_meta = wilmer_mikado_add_admin_container(
				array(
					'parent'          => $general_meta_box,
					'name'            => 'mkdf_paspartu_container_meta',
					'dependency' => array(
						'hide' => array(
							'mkdf_paspartu_meta'  => array('','no')
						)
					)
				)
			);
		
				wilmer_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_paspartu_color_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Passepartout Color', 'wilmer' ),
						'description' => esc_html__( 'Choose passepartout color, default value is #ffffff', 'wilmer' ),
						'parent'      => $paspartu_container_meta
					)
				);
				
				wilmer_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_paspartu_width_meta',
						'type'        => 'text',
						'label'       => esc_html__( 'Passepartout Size', 'wilmer' ),
						'description' => esc_html__( 'Enter size amount for passepartout', 'wilmer' ),
						'parent'      => $paspartu_container_meta,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px or %'
						)
					)
				);
		
				wilmer_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_paspartu_responsive_width_meta',
						'type'        => 'text',
						'label'       => esc_html__( 'Responsive Passepartout Size', 'wilmer' ),
						'description' => esc_html__( 'Enter size amount for passepartout for smaller screens (tablets and mobiles view)', 'wilmer' ),
						'parent'      => $paspartu_container_meta,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px or %'
						)
					)
				);
				
				wilmer_mikado_create_meta_box_field(
					array(
						'parent'        => $paspartu_container_meta,
						'type'          => 'select',
						'default_value' => '',
						'name'          => 'mkdf_disable_top_paspartu_meta',
						'label'         => esc_html__( 'Disable Top Passepartout', 'wilmer' ),
						'options'       => wilmer_mikado_get_yes_no_select_array(),
					)
				);
		
				wilmer_mikado_create_meta_box_field(
					array(
						'parent'        => $paspartu_container_meta,
						'type'          => 'select',
						'default_value' => '',
						'name'          => 'mkdf_enable_fixed_paspartu_meta',
						'label'         => esc_html__( 'Enable Fixed Passepartout', 'wilmer' ),
						'description'   => esc_html__( 'Enabling this option will set fixed passepartout for your screens', 'wilmer' ),
						'options'       => wilmer_mikado_get_yes_no_select_array(),
					)
				);
		
		/***************** Passepartout Layout - end **********************/
		
		/***************** Smooth Page Transitions Layout - begin **********************/
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_smooth_page_transitions_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Smooth Page Transitions', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will perform a smooth transition between pages when clicking on links', 'wilmer' ),
				'parent'        => $general_meta_box,
				'options'       => wilmer_mikado_get_yes_no_select_array()
			)
		);
		
			$page_transitions_container_meta = wilmer_mikado_add_admin_container(
				array(
					'parent'     => $general_meta_box,
					'name'       => 'page_transitions_container_meta',
					'dependency' => array(
						'hide' => array(
							'mkdf_smooth_page_transitions_meta' => array( '', 'no' )
						)
					)
				)
			);
		
				wilmer_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_page_transition_preloader_meta',
						'type'        => 'select',
						'label'       => esc_html__( 'Enable Preloading Animation', 'wilmer' ),
						'description' => esc_html__( 'Enabling this option will display an animated preloader while the page content is loading', 'wilmer' ),
						'parent'      => $page_transitions_container_meta,
						'options'     => wilmer_mikado_get_yes_no_select_array()
					)
				);
		
				$page_transition_preloader_container_meta = wilmer_mikado_add_admin_container(
					array(
						'parent'     => $page_transitions_container_meta,
						'name'       => 'page_transition_preloader_container_meta',
						'dependency' => array(
							'hide' => array(
								'mkdf_page_transition_preloader_meta' => array( '', 'no' )
							)
						)
					)
				);
				
					wilmer_mikado_create_meta_box_field(
						array(
							'name'   => 'mkdf_smooth_pt_bgnd_color_meta',
							'type'   => 'color',
							'label'  => esc_html__( 'Page Loader Background Color', 'wilmer' ),
							'parent' => $page_transition_preloader_container_meta
						)
					);
					
					$group_pt_spinner_animation_meta = wilmer_mikado_add_admin_group(
						array(
							'name'        => 'group_pt_spinner_animation_meta',
							'title'       => esc_html__( 'Loader Style', 'wilmer' ),
							'description' => esc_html__( 'Define styles for loader spinner animation', 'wilmer' ),
							'parent'      => $page_transition_preloader_container_meta
						)
					);
					
					$row_pt_spinner_animation_meta = wilmer_mikado_add_admin_row(
						array(
							'name'   => 'row_pt_spinner_animation_meta',
							'parent' => $group_pt_spinner_animation_meta
						)
					);
					
					wilmer_mikado_create_meta_box_field(
						array(
							'type'    => 'selectsimple',
							'name'    => 'mkdf_smooth_pt_spinner_type_meta',
							'label'   => esc_html__( 'Spinner Type', 'wilmer' ),
							'parent'  => $row_pt_spinner_animation_meta,
							'options' => array(
								''                      => esc_html__( 'Default', 'wilmer' ),
								'wilmer_spinner'        => esc_html__( 'Wilmer Spinner', 'wilmer' ),
								'rotate_circles'        => esc_html__( 'Rotate Circles', 'wilmer' ),
								'pulse'                 => esc_html__( 'Pulse', 'wilmer' ),
								'double_pulse'          => esc_html__( 'Double Pulse', 'wilmer' ),
								'cube'                  => esc_html__( 'Cube', 'wilmer' ),
								'rotating_cubes'        => esc_html__( 'Rotating Cubes', 'wilmer' ),
								'stripes'               => esc_html__( 'Stripes', 'wilmer' ),
								'wave'                  => esc_html__( 'Wave', 'wilmer' ),
								'two_rotating_circles'  => esc_html__( '2 Rotating Circles', 'wilmer' ),
								'five_rotating_circles' => esc_html__( '5 Rotating Circles', 'wilmer' ),
								'atom'                  => esc_html__( 'Atom', 'wilmer' ),
								'clock'                 => esc_html__( 'Clock', 'wilmer' ),
								'mitosis'               => esc_html__( 'Mitosis', 'wilmer' ),
								'lines'                 => esc_html__( 'Lines', 'wilmer' ),
								'fussion'               => esc_html__( 'Fussion', 'wilmer' ),
								'wave_circles'          => esc_html__( 'Wave Circles', 'wilmer' ),
								'pulse_circles'         => esc_html__( 'Pulse Circles', 'wilmer' )
							)
						)
					);
					
					wilmer_mikado_create_meta_box_field(
						array(
							'type'   => 'colorsimple',
							'name'   => 'mkdf_smooth_pt_spinner_color_meta',
							'label'  => esc_html__( 'Spinner Color', 'wilmer' ),
							'parent' => $row_pt_spinner_animation_meta
						)
					);

					wilmer_mikado_create_meta_box_field(
						array(
							'type'          => 'text',
							'name'          => 'mkdf_smooth_pt_spinner_text_meta',
							'default_value' => '',
							'label'         => esc_html__( 'Preloader Text', 'wilmer' ),
							'parent'        => $row_pt_spinner_animation_meta,
							'dependency' => array(
								'show' => array(
									'mkdf_smooth_pt_spinner_type_meta' => 'wilmer_spinner'
								)
							)
						)
					);
					
					wilmer_mikado_create_meta_box_field(
						array(
							'name'        => 'mkdf_page_transition_fadeout_meta',
							'type'        => 'select',
							'label'       => esc_html__( 'Enable Fade Out Animation', 'wilmer' ),
							'description' => esc_html__( 'Enabling this option will turn on fade out animation when leaving page', 'wilmer' ),
							'options'     => wilmer_mikado_get_yes_no_select_array(),
							'parent'      => $page_transitions_container_meta
						
						)
					);
		
		/***************** Smooth Page Transitions Layout - end **********************/
		
		/***************** Comments Layout - begin **********************/
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_page_comments_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Show Comments', 'wilmer' ),
				'description' => esc_html__( 'Enabling this option will show comments on your page', 'wilmer' ),
				'parent'      => $general_meta_box,
				'options'     => wilmer_mikado_get_yes_no_select_array()
			)
		);
		
		/***************** Comments Layout - end **********************/
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_mikado_map_general_meta', 10 );
}

if ( ! function_exists( 'wilmer_mikado_container_background_style' ) ) {
	/**
	 * Function that return container style
	 */
	function wilmer_mikado_container_background_style( $style ) {
		$page_id      = wilmer_mikado_get_page_id();
		$class_prefix = wilmer_mikado_get_unique_page_class( $page_id, true );
		
		$container_selector = array(
			$class_prefix . ' .mkdf-content'
		);
		
		$container_class        = array();
		$page_background_color  = get_post_meta( $page_id, 'mkdf_page_background_color_meta', true );
		$page_background_image  = get_post_meta( $page_id, 'mkdf_page_background_image_meta', true );
		$page_background_repeat = get_post_meta( $page_id, 'mkdf_page_background_repeat_meta', true );
		
		if ( ! empty( $page_background_color ) ) {
			$container_class['background-color'] = $page_background_color;
		}
		
		if ( ! empty( $page_background_image ) ) {
			$container_class['background-image'] = 'url(' . esc_url( $page_background_image ) . ')';
			
			if ( $page_background_repeat === 'yes' ) {
				$container_class['background-repeat']   = 'repeat';
				$container_class['background-position'] = '0 0';
			} else {
				$container_class['background-repeat']   = 'no-repeat';
				$container_class['background-position'] = 'center 0';
				$container_class['background-size']     = 'cover';
			}
		}
		
		$current_style = wilmer_mikado_dynamic_css( $container_selector, $container_class );
		$current_style = $current_style . $style;
		
		return $current_style;
	}
	
	add_filter( 'wilmer_mikado_filter_add_page_custom_style', 'wilmer_mikado_container_background_style' );
}