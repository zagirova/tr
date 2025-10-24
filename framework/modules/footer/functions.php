<?php

if ( ! function_exists( 'wilmer_mikado_register_footer_sidebar' ) ) {
	function wilmer_mikado_register_footer_sidebar() {
			
		register_sidebar(
			array(
				'id'            => 'footer_top_column_1',
				'name'          => esc_html__( 'Footer Top Column 1', 'wilmer' ),
				'description'   => esc_html__( 'Widgets added here will appear in the first column of top footer area', 'wilmer' ),
				'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-1 %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="mkdf-widget-title-holder"><h4 class="mkdf-widget-title">',
				'after_title'   => '</h4></div>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'footer_top_column_2',
				'name'          => esc_html__( 'Footer Top Column 2', 'wilmer' ),
				'description'   => esc_html__( 'Widgets added here will appear in the second column of top footer area', 'wilmer' ),
				'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-2 %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="mkdf-widget-title-holder"><h4 class="mkdf-widget-title">',
				'after_title'   => '</h4></div>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'footer_top_column_3',
				'name'          => esc_html__( 'Footer Top Column 3', 'wilmer' ),
				'description'   => esc_html__( 'Widgets added here will appear in the third column of top footer area', 'wilmer' ),
				'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-3 %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="mkdf-widget-title-holder"><h4 class="mkdf-widget-title">',
				'after_title'   => '</h4></div>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'footer_top_column_4',
				'name'          => esc_html__( 'Footer Top Column 4', 'wilmer' ),
				'description'   => esc_html__( 'Widgets added here will appear in the fourth column of top footer area', 'wilmer' ),
				'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-4 %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="mkdf-widget-title-holder"><h4 class="mkdf-widget-title">',
				'after_title'   => '</h4></div>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'footer_bottom_column_1',
				'name'          => esc_html__( 'Footer Bottom Column 1', 'wilmer' ),
				'description'   => esc_html__( 'Widgets added here will appear in the first column of bottom footer area', 'wilmer' ),
				'before_widget' => '<div id="%1$s" class="widget mkdf-footer-bottom-column-1 %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="mkdf-widget-title-holder"><h4 class="mkdf-widget-title">',
				'after_title'   => '</h4></div>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'footer_bottom_column_2',
				'name'          => esc_html__( 'Footer Bottom Column 2', 'wilmer' ),
				'description'   => esc_html__( 'Widgets added here will appear in the second column of bottom footer area', 'wilmer' ),
				'before_widget' => '<div id="%1$s" class="widget mkdf-footer-bottom-column-2 %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="mkdf-widget-title-holder"><h4 class="mkdf-widget-title">',
				'after_title'   => '</h4></div>'
			)
		);
		
		register_sidebar(
			array(
				'id'            => 'footer_bottom_column_3',
				'name'          => esc_html__( 'Footer Bottom Column 3', 'wilmer' ),
				'description'   => esc_html__( 'Widgets added here will appear in the third column of bottom footer area', 'wilmer' ),
				'before_widget' => '<div id="%1$s" class="widget mkdf-footer-bottom-column-3 %2$s">',
				'after_widget'  => '</div>',
				'before_title'  => '<div class="mkdf-widget-title-holder"><h4 class="mkdf-widget-title">',
				'after_title'   => '</h4></div>'
			)
		);
	}
	
	add_action( 'widgets_init', 'wilmer_mikado_register_footer_sidebar' );
}

if ( ! function_exists( 'wilmer_mikado_get_footer' ) ) {
	/**
	 * Loads footer HTML
	 */
	function wilmer_mikado_get_footer() {
		$parameters          = array();
		$page_id             = wilmer_mikado_get_page_id();
		$disable_footer_meta = get_post_meta( $page_id, 'mkdf_disable_footer_meta', true );
        $uncovering_footer_meta = wilmer_mikado_get_meta_field_intersect( 'uncovering_footer', $page_id );
        $uncovering_footer      = $uncovering_footer_meta === 'yes' ? 'mkdf-footer-uncover' : '';
		
		$parameters['display_footer']        = $disable_footer_meta !== 'yes';
		$parameters['display_footer_top']    = wilmer_mikado_show_footer_top();
		$parameters['display_footer_bottom'] = wilmer_mikado_show_footer_bottom();
        $parameters['holder_classes']        = $uncovering_footer;
		
		wilmer_mikado_get_module_template_part( 'templates/footer', 'footer', '', $parameters );
	}
	
	add_action( 'wilmer_mikado_get_footer_template', 'wilmer_mikado_get_footer' );
}

if ( ! function_exists( 'wilmer_mikado_show_footer_top' ) ) {
	/**
	 * Check footer top showing
	 * Function check value from options and checks if footer columns are empty.
	 * return bool
	 */
	function wilmer_mikado_show_footer_top() {
		$page_id         = wilmer_mikado_get_page_id();
		$footer_top_flag = false;
		
		//check value from options and meta field on current page
		$option_flag = wilmer_mikado_get_meta_field_intersect( 'show_footer_top', $page_id ) === 'yes';
		
		//check footer columns.If they are empty, disable footer top
		$columns_flag = false;
		for ( $i = 1; $i <= 4; $i ++ ) {
			$footer_columns_id = 'footer_top_column_' . $i;
			if ( is_active_sidebar( $footer_columns_id ) ) {
				$columns_flag = true;
				break;
			}
		}
		
		if ( $option_flag && $columns_flag ) {
			$footer_top_flag = true;
		}
		
		return $footer_top_flag;
	}
}

if ( ! function_exists( 'wilmer_mikado_show_footer_bottom' ) ) {
	/**
	 * Check footer bottom showing
	 * Function check value from options and checks if footer columns are empty.
	 * return bool
	 */
	function wilmer_mikado_show_footer_bottom() {
		$page_id            = wilmer_mikado_get_page_id();
		$footer_bottom_flag = false;
		
		//check value from options and meta field on current page
		$option_flag = wilmer_mikado_get_meta_field_intersect( 'show_footer_bottom', $page_id ) === 'yes';
		
		//check footer columns.If they are empty, disable footer bottom
		$columns_flag = false;
		for ( $i = 1; $i <= 3; $i ++ ) {
			$footer_columns_id = 'footer_bottom_column_' . $i;
			if ( is_active_sidebar( $footer_columns_id ) ) {
				$columns_flag = true;
				break;
			}
		}
		
		if ( $option_flag && $columns_flag ) {
			$footer_bottom_flag = true;
		}
		
		return $footer_bottom_flag;
	}
}

if ( ! function_exists( 'wilmer_mikado_get_footer_top' ) ) {
	/**
	 * Return footer top HTML
	 */
	function wilmer_mikado_get_footer_top() {
		$parameters = array();

		//get number of top footer columns
		$parameters['footer_top_columns'] = explode(' ', wilmer_mikado_options()->getOptionValue( 'footer_top_columns' ));
		
		//get footer top grid/full width class
		$parameters['footer_top_grid_class'] = wilmer_mikado_get_meta_field_intersect('footer_in_grid') === 'yes' ? 'mkdf-grid' : 'mkdf-full-width';
		
		//get footer top other classes
		$footer_top_classes = array();
		
		//footer alignment
		$footer_top_alignment = wilmer_mikado_options()->getOptionValue( 'footer_top_columns_alignment' );
		$footer_top_classes[] = ! empty( $footer_top_alignment ) ? 'mkdf-footer-top-alignment-' . esc_attr( $footer_top_alignment ) : '';
		
		$footer_top_classes = apply_filters( 'wilmer_mikado_filter_footer_top_classes', $footer_top_classes );
		
		$parameters['footer_top_classes'] = implode( ' ', $footer_top_classes );
		
		wilmer_mikado_get_module_template_part( 'templates/parts/footer-top', 'footer', '', $parameters );
	}
}

if ( ! function_exists( 'wilmer_mikado_get_footer_bottom' ) ) {
	/**
	 * Return footer bottom HTML
	 */
	function wilmer_mikado_get_footer_bottom() {
		$parameters = array();

		//get number of bottom footer columns
		$parameters['footer_bottom_columns'] = explode(' ', wilmer_mikado_options()->getOptionValue( 'footer_bottom_columns' ));
		
		//get footer top grid/full width class
		$parameters['footer_bottom_grid_class'] = wilmer_mikado_get_meta_field_intersect('footer_in_grid') === 'yes' ? 'mkdf-grid' : 'mkdf-full-width';
		
		//get footer top other classes
		$footer_bottom_classes = array();
		$footer_bottom_classes = apply_filters( 'wilmer_mikado_filter_footer_bottom_classes', $footer_bottom_classes );
		
		$parameters['footer_bottom_classes'] = implode( ' ', $footer_bottom_classes );
		
		wilmer_mikado_get_module_template_part( 'templates/parts/footer-bottom', 'footer', '', $parameters );
	}
}

if ( ! function_exists( 'wilmer_mikado_footer_holder_style' ) ) {
	/**
	 * Function that return container style
	 */
	function wilmer_mikado_footer_holder_style( $style ) {
		$current_style = '';
		$page_id       = wilmer_mikado_get_page_id();
		$class_prefix  = wilmer_mikado_get_unique_page_class( $page_id, true );
		
		/***** footer top style - begin *****/
		
		$footer_top_styles   = array();
		$footer_top_selector = $class_prefix . ' .mkdf-page-footer .mkdf-footer-top-holder';
		
		$footer_top_background_color = get_post_meta( $page_id, 'mkdf_footer_top_background_color_meta', true );
		$footer_top_border_color     = get_post_meta( $page_id, 'mkdf_footer_top_border_color_meta', true );
		$footer_top_border_width     = get_post_meta( $page_id, 'mkdf_footer_top_border_width_meta', true );
		
		if ( ! empty( $footer_top_background_color ) ) {
			$footer_top_styles['background-color'] = $footer_top_background_color;
		}
		
		if ( ! empty( $footer_top_border_color ) ) {
			$footer_top_styles['border-color'] = $footer_top_border_color;
			
			if ( $footer_top_border_width === '' ) {
				$footer_top_styles['border-width'] = '1px';
			}
		}
		
		if ( $footer_top_border_width !== '' ) {
			$footer_top_styles['border-width'] = wilmer_mikado_filter_px( $footer_top_border_width ) . 'px';
		}
		
		if ( ! empty( $footer_top_styles ) ) {
			$current_style .= wilmer_mikado_dynamic_css( $footer_top_selector, $footer_top_styles );
		}
		
		/***** footer top style - end *****/
		
		/***** footer bottom style - begin *****/
		
		$footer_bottom_styles   = array();
		$footer_bottom_selector = $class_prefix . ' .mkdf-page-footer .mkdf-footer-bottom-holder';
		
		$footer_bottom_background_color = get_post_meta( $page_id, 'mkdf_footer_bottom_background_color_meta', true );
		$footer_bottom_border_color     = get_post_meta( $page_id, 'mkdf_footer_bottom_border_color_meta', true );
		$footer_bottom_border_width     = get_post_meta( $page_id, 'mkdf_footer_bottom_border_width_meta', true );
		
		if ( ! empty( $footer_bottom_background_color ) ) {
			$footer_bottom_styles['background-color'] = $footer_bottom_background_color;
		}
		
		if ( ! empty( $footer_bottom_border_color ) ) {
			$footer_bottom_styles['border-color'] = $footer_bottom_border_color;
			
			if ( $footer_bottom_border_width === '' ) {
				$footer_bottom_styles['border-width'] = '1px';
			}
		}
		
		if ( $footer_bottom_border_width !== '' ) {
			$footer_bottom_styles['border-width'] = wilmer_mikado_filter_px( $footer_bottom_border_width ) . 'px';
		}
		
		if ( ! empty( $footer_bottom_styles ) ) {
			$current_style .= wilmer_mikado_dynamic_css( $footer_bottom_selector, $footer_bottom_styles );
		}
		
		/***** footer bottom style - end *****/
		
		$current_style = $current_style . $style;
		
		return $current_style;
	}
	
	add_filter( 'wilmer_mikado_filter_add_page_custom_style', 'wilmer_mikado_footer_holder_style' );
}