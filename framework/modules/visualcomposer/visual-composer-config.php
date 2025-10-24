<?php

/**
 * Force Visual Composer to initialize as "built into the theme". This will hide certain tabs under the Settings->Visual Composer page
 */
if ( function_exists( 'vc_set_as_theme' ) ) {
	vc_set_as_theme( true );
}

/**
 * Change path for overridden templates
 */
if ( function_exists( 'vc_set_shortcodes_templates_dir' ) ) {
	$dir = MIKADO_ROOT_DIR . '/vc-templates';
	vc_set_shortcodes_templates_dir( $dir );
}

if ( ! function_exists( 'wilmer_mikado_configure_visual_composer_frontend_editor' ) ) {
	/**
	 * Configuration for Visual Composer FrontEnd Editor
	 * Hooks on vc_after_init action
	 */
	function wilmer_mikado_configure_visual_composer_frontend_editor() {
		/**
		 * Remove frontend editor
		 */
		if ( function_exists( 'vc_disable_frontend' ) ) {
			vc_disable_frontend();
		}
	}
	
	add_action( 'vc_after_init', 'wilmer_mikado_configure_visual_composer_frontend_editor' );
}

if ( ! function_exists( 'wilmer_mikado_vc_row_map' ) ) {
	/**
	 * Map VC Row shortcode
	 * Hooks on vc_after_init action
	 */
	function wilmer_mikado_vc_row_map() {
		
		/******* VC Row shortcode - begin *******/
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'dropdown',
				'param_name' => 'row_content_width',
				'heading'    => esc_html__( 'Mikado Row Content Width', 'wilmer' ),
				'value'      => array(
					esc_html__( 'Full Width', 'wilmer' ) => 'full-width',
					esc_html__( 'In Grid', 'wilmer' )    => 'grid'
				),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'        => 'textfield',
				'param_name'  => 'anchor',
				'heading'     => esc_html__( 'Mikado Anchor ID', 'wilmer' ),
				'description' => esc_html__( 'For example "home"', 'wilmer' ),
				'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);

        vc_add_param( 'vc_row',
            array(
                'type'        => 'dropdown',
                'param_name'  => 'row_btt_skin',
                'heading'     => esc_html__( 'Row Skin', 'wilmer' ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' ),
                'description' => esc_html__( 'This will switch Back To Top Button skin while scrolling over this row', 'wilmer' ),
                'value'       => array(
                    esc_html__( 'Light', 'wilmer' )    => 'light',
                    esc_html__( 'Dark', 'wilmer' ) => 'dark'
                ),
                'save_always' => true
            )
        );
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'colorpicker',
				'param_name' => 'simple_background_color',
				'heading'    => esc_html__( 'Mikado Background Color', 'wilmer' ),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'attach_image',
				'param_name' => 'simple_background_image',
				'heading'    => esc_html__( 'Mikado Background Image', 'wilmer' ),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'        => 'textfield',
				'param_name'  => 'background_image_position',
				'heading'     => esc_html__( 'Mikado Background Position', 'wilmer' ),
				'description' => esc_html__( 'Set the starting position of a background image, default value is top left', 'wilmer' ),
				'dependency'  => array( 'element' => 'simple_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'        => 'dropdown',
				'param_name'  => 'disable_background_image',
				'heading'     => esc_html__( 'Mikado Disable Background Image', 'wilmer' ),
				'value'       => array(
					esc_html__( 'Never', 'wilmer' )        => '',
					esc_html__( 'Below 1280px', 'wilmer' ) => '1280',
					esc_html__( 'Below 1024px', 'wilmer' ) => '1024',
					esc_html__( 'Below 768px', 'wilmer' )  => '768',
					esc_html__( 'Below 680px', 'wilmer' )  => '680',
					esc_html__( 'Below 480px', 'wilmer' )  => '480'
				),
				'save_always' => true,
				'description' => esc_html__( 'Choose on which stage you hide row background image', 'wilmer' ),
				'dependency'  => array( 'element' => 'simple_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'attach_image',
				'param_name' => 'parallax_background_image',
				'heading'    => esc_html__( 'Mikado Parallax Background Image', 'wilmer' ),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'        => 'textfield',
				'param_name'  => 'parallax_bg_speed',
				'heading'     => esc_html__( 'Mikado Parallax Speed', 'wilmer' ),
				'description' => esc_html__( 'Set your parallax speed. Default value is 1.', 'wilmer' ),
				'dependency'  => array( 'element' => 'parallax_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'textfield',
				'param_name' => 'parallax_bg_height',
				'heading'    => esc_html__( 'Mikado Parallax Section Height (px)', 'wilmer' ),
				'dependency' => array( 'element' => 'parallax_background_image', 'not_empty' => true ),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row',
			array(
				'type'       => 'dropdown',
				'param_name' => 'content_text_aligment',
				'heading'    => esc_html__( 'Mikado Content Aligment', 'wilmer' ),
				'value'      => array(
					esc_html__( 'Default', 'wilmer' ) => '',
					esc_html__( 'Left', 'wilmer' )    => 'left',
					esc_html__( 'Center', 'wilmer' )  => 'center',
					esc_html__( 'Right', 'wilmer' )   => 'right'
				),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);

		vc_add_param( 'vc_row',
			array(
				'type'       => 'dropdown',
				'param_name' => 'enable_bg_pattern',
				'heading'    => esc_html__( 'Mikado Background Pattern', 'wilmer' ),
				'value'      => array_flip(wilmer_mikado_get_yes_no_select_array(false, false)),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_1',
                'heading'    => esc_html__( 'Mikado Background Text 1', 'wilmer' ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_2',
                'heading'    => esc_html__( 'Mikado Background Text 2', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'dropdown',
                'param_name' => 'row_background_text_position',
                'heading'    => esc_html__( 'Mikado Background Text Position', 'wilmer' ),
                'value'      => array(
                    esc_html__( 'Front', 'wilmer' ) => 'front',
                    esc_html__( 'Back', 'wilmer' )    => 'back'
                ),
                'save_always' => true,
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_size',
                'heading'    => esc_html__( 'Mikado Background Text Size', 'wilmer' ),
                'description' => esc_html__( 'Set the background text size in px or em', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_size_1440',
                'heading'    => esc_html__( 'Mikado Background Text Size 1280px-1440px', 'wilmer' ),
                'description' => esc_html__( 'Set the background text size in px or em', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_size_1280',
                'heading'    => esc_html__( 'Mikado Background Text Size 1024px-1280px', 'wilmer' ),
                'description' => esc_html__( 'Set the background text size in px or em', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'colorpicker',
                'param_name' => 'row_background_text_color',
                'heading'    => esc_html__( 'Mikado Background Text Color', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'dropdown',
                'param_name' => 'row_background_text_align',
                'heading'    => esc_html__( 'Mikado Background Text Align', 'wilmer' ),
                'value'      => array(
                    esc_html__( 'Default', 'wilmer' ) => '',
                    esc_html__( 'Left', 'wilmer' )    => 'left',
                    esc_html__( 'Center', 'wilmer' )  => 'center',
                    esc_html__( 'Right', 'wilmer' )   => 'right'
                ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'dropdown',
                'param_name' => 'row_background_text_vertical_align',
                'heading'    => esc_html__( 'Mikado Background Vertical Align', 'wilmer' ),
                'value'      => array(
                    esc_html__( 'Middle', 'wilmer' )   => 'middle',
                    esc_html__( 'Top', 'wilmer' )      => 'top',
                    esc_html__( 'Bottom', 'wilmer' )   => 'bottom'
                ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_padding_top',
                'heading'    => esc_html__( 'Mikado Background Text Top Padding', 'wilmer' ),
                'description' => esc_html__( 'Set the value of top padding in px or %', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_padding_top_1440',
                'heading'    => esc_html__( 'Mikado Background Text Top Padding Size 1280px-1440px', 'wilmer' ),
                'description' => esc_html__( 'Set the background text padding in px or em', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_padding_top', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_padding_top_1280',
                'heading'    => esc_html__( 'Mikado Background Text Top Padding Size 1024px-1280px', 'wilmer' ),
                'description' => esc_html__( 'Set the background text padding in px or em', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_padding_top', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_padding_left',
                'heading'    => esc_html__( 'Mikado Background Text Left Padding', 'wilmer' ),
                'description' => esc_html__( 'Set the value of left padding in px or %', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_padding_left_1440',
                'heading'    => esc_html__( 'Mikado Background Text Left Padding Size 1280px-1440px', 'wilmer' ),
                'description' => esc_html__( 'Set the background text padding in px or em', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_padding_top', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'textfield',
                'param_name' => 'row_background_text_padding_left_1280',
                'heading'    => esc_html__( 'Mikado Background Text Left Padding Size 1024px-1280px', 'wilmer' ),
                'description' => esc_html__( 'Set the background text padding in px or em', 'wilmer' ),
                'dependency' => array( 'element' => 'row_background_text_padding_top', 'not_empty' => true ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

        vc_add_param( 'vc_row',
            array(
                'type'       => 'dropdown',
                'param_name' => 'row_background_text_animation',
                'heading'    => esc_html__( 'Animate Background Text', 'wilmer' ),
                'value'      => array_flip( wilmer_mikado_get_yes_no_select_array(false, true) ),
                'dependency' => array( 'element' => 'row_background_text_1', 'not_empty' => true ),
                'description'    => esc_html__( 'Animate background text when row appears in viewport', 'wilmer' ),
                'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
            )
        );

		do_action( 'wilmer_mikado_action_additional_vc_row_params' );
		
		/******* VC Row shortcode - end *******/
		
		/******* VC Row Inner shortcode - begin *******/
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'       => 'dropdown',
				'param_name' => 'row_content_width',
				'heading'    => esc_html__( 'Mikado Row Content Width', 'wilmer' ),
				'value'      => array(
					esc_html__( 'Full Width', 'wilmer' ) => 'full-width',
					esc_html__( 'In Grid', 'wilmer' )    => 'grid'
				),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);

		vc_add_param( 'vc_row_inner',
			array(
				'type'       => 'colorpicker',
				'param_name' => 'simple_background_color',
				'heading'    => esc_html__( 'Mikado Background Color', 'wilmer' ),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'       => 'attach_image',
				'param_name' => 'simple_background_image',
				'heading'    => esc_html__( 'Mikado Background Image', 'wilmer' ),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'        => 'textfield',
				'param_name'  => 'background_image_position',
				'heading'     => esc_html__( 'Mikado Background Position', 'wilmer' ),
				'description' => esc_html__( 'Set the starting position of a background image, default value is top left', 'wilmer' ),
				'dependency'  => array( 'element' => 'simple_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'        => 'dropdown',
				'param_name'  => 'disable_background_image',
				'heading'     => esc_html__( 'Mikado Disable Background Image', 'wilmer' ),
				'value'       => array(
					esc_html__( 'Never', 'wilmer' )        => '',
					esc_html__( 'Below 1280px', 'wilmer' ) => '1280',
					esc_html__( 'Below 1024px', 'wilmer' ) => '1024',
					esc_html__( 'Below 768px', 'wilmer' )  => '768',
					esc_html__( 'Below 680px', 'wilmer' )  => '680',
					esc_html__( 'Below 480px', 'wilmer' )  => '480'
				),
				'save_always' => true,
				'description' => esc_html__( 'Choose on which stage you hide row background image', 'wilmer' ),
				'dependency'  => array( 'element' => 'simple_background_image', 'not_empty' => true ),
				'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		vc_add_param( 'vc_row_inner',
			array(
				'type'       => 'dropdown',
				'param_name' => 'content_text_aligment',
				'heading'    => esc_html__( 'Mikado Content Aligment', 'wilmer' ),
				'value'      => array(
					esc_html__( 'Default', 'wilmer' ) => '',
					esc_html__( 'Left', 'wilmer' )    => 'left',
					esc_html__( 'Center', 'wilmer' )  => 'center',
					esc_html__( 'Right', 'wilmer' )   => 'right'
				),
				'group'      => esc_html__( 'Mikado Settings', 'wilmer' )
			)
		);
		
		/******* VC Row Inner shortcode - end *******/
		
		/******* VC Revolution Slider shortcode - begin *******/
		
		if ( wilmer_mikado_is_plugin_installed( 'revolution-slider' ) ) {
			
			vc_add_param( 'rev_slider_vc',
				array(
					'type'        => 'dropdown',
					'param_name'  => 'enable_paspartu',
					'heading'     => esc_html__( 'Mikado Enable Passepartout', 'wilmer' ),
					'value'       => array_flip( wilmer_mikado_get_yes_no_select_array( false ) ),
					'save_always' => true,
					'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
				)
			);
			
			vc_add_param( 'rev_slider_vc',
				array(
					'type'        => 'dropdown',
					'param_name'  => 'paspartu_size',
					'heading'     => esc_html__( 'Mikado Passepartout Size', 'wilmer' ),
					'value'       => array(
						esc_html__( 'Tiny', 'wilmer' )   => 'tiny',
						esc_html__( 'Small', 'wilmer' )  => 'small',
						esc_html__( 'Normal', 'wilmer' ) => 'normal',
						esc_html__( 'Large', 'wilmer' )  => 'large'
					),
					'save_always' => true,
					'dependency'  => array( 'element' => 'enable_paspartu', 'value' => array( 'yes' ) ),
					'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
				)
			);
			
			vc_add_param( 'rev_slider_vc',
				array(
					'type'        => 'dropdown',
					'param_name'  => 'disable_side_paspartu',
					'heading'     => esc_html__( 'Mikado Disable Side Passepartout', 'wilmer' ),
					'value'       => array_flip( wilmer_mikado_get_yes_no_select_array( false ) ),
					'save_always' => true,
					'dependency'  => array( 'element' => 'enable_paspartu', 'value' => array( 'yes' ) ),
					'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
				)
			);
			
			vc_add_param( 'rev_slider_vc',
				array(
					'type'        => 'dropdown',
					'param_name'  => 'disable_top_paspartu',
					'heading'     => esc_html__( 'Mikado Disable Top Passepartout', 'wilmer' ),
					'value'       => array_flip( wilmer_mikado_get_yes_no_select_array( false ) ),
					'save_always' => true,
					'dependency'  => array( 'element' => 'enable_paspartu', 'value' => array( 'yes' ) ),
					'group'       => esc_html__( 'Mikado Settings', 'wilmer' )
				)
			);
		}
		
		/******* VC Revolution Slider shortcode - end *******/
	}
	
	add_action( 'vc_after_init', 'wilmer_mikado_vc_row_map' );
}