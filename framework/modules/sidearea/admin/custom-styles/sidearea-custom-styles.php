<?php

if ( ! function_exists( 'wilmer_mikado_side_area_slide_from_right_type_style' ) ) {
	function wilmer_mikado_side_area_slide_from_right_type_style() {
		
		if ( wilmer_mikado_options()->getOptionValue( 'side_area_type' ) == 'side-menu-slide-from-right' ) {
			
			if ( wilmer_mikado_options()->getOptionValue( 'side_area_width' ) !== '' ) {
				echo wilmer_mikado_dynamic_css( '.mkdf-side-menu-slide-from-right .mkdf-side-menu', array(
					'right' => '-' . wilmer_mikado_options()->getOptionValue( 'side_area_width' ),
					'width' => wilmer_mikado_options()->getOptionValue( 'side_area_width' )
				) );
			}
			
			if ( wilmer_mikado_options()->getOptionValue( 'side_area_content_overlay_color' ) !== '' ) {
				
				echo wilmer_mikado_dynamic_css( '.mkdf-side-menu-slide-from-right .mkdf-wrapper .mkdf-cover', array(
					'background-color' => wilmer_mikado_options()->getOptionValue( 'side_area_content_overlay_color' )
				) );
			}
			
			if ( wilmer_mikado_options()->getOptionValue( 'side_area_content_overlay_opacity' ) !== '' ) {
				
				echo wilmer_mikado_dynamic_css( '.mkdf-side-menu-slide-from-right.mkdf-right-side-menu-opened .mkdf-wrapper .mkdf-cover', array(
					'opacity' => wilmer_mikado_options()->getOptionValue( 'side_area_content_overlay_opacity' )
				) );
			}
		}
	}
	
	add_action( 'wilmer_mikado_action_style_dynamic', 'wilmer_mikado_side_area_slide_from_right_type_style' );
}

if ( ! function_exists( 'wilmer_mikado_side_area_slide_with_content_type_style' ) ) {
	function wilmer_mikado_side_area_slide_with_content_type_style() {
		
		if ( wilmer_mikado_options()->getOptionValue( 'side_area_type' ) == 'side-menu-slide-with-content' ) {
			
			if ( wilmer_mikado_options()->getOptionValue( 'side_area_width' ) !== '' ) {
				echo wilmer_mikado_dynamic_css( '.mkdf-side-menu-slide-with-content .mkdf-side-menu', array(
					'right' => '-' . wilmer_mikado_options()->getOptionValue( 'side_area_width' ),
					'width' => wilmer_mikado_options()->getOptionValue( 'side_area_width' )
				) );
				
				$side_menu_open_classes = array(
					'.mkdf-side-menu-slide-with-content.mkdf-side-menu-open .mkdf-wrapper',
					'.mkdf-side-menu-slide-with-content.mkdf-side-menu-open footer.uncover',
					'.mkdf-side-menu-slide-with-content.mkdf-side-menu-open .mkdf-sticky-header',
					'.mkdf-side-menu-slide-with-content.mkdf-side-menu-open .mkdf-fixed-wrapper',
					'.mkdf-side-menu-slide-with-content.mkdf-side-menu-open .mkdf-mobile-header-inner',
				);
				
				echo wilmer_mikado_dynamic_css( $side_menu_open_classes, array(
					'left' => '-' . wilmer_mikado_options()->getOptionValue( 'side_area_width' ),
				) );
			}
		}
	}
	
	add_action( 'wilmer_mikado_action_style_dynamic', 'wilmer_mikado_side_area_slide_with_content_type_style' );
}

if ( ! function_exists( 'wilmer_mikado_side_area_uncovered_from_content_type_style' ) ) {
	function wilmer_mikado_side_area_uncovered_from_content_type_style() {
		
		if ( wilmer_mikado_options()->getOptionValue( 'side_area_type' ) == 'side-area-uncovered-from-content' ) {
			
			if ( wilmer_mikado_options()->getOptionValue( 'side_area_width' ) !== '' ) {
				echo wilmer_mikado_dynamic_css( '.mkdf-side-area-uncovered-from-content .mkdf-side-menu', array(
					'width' => wilmer_mikado_options()->getOptionValue( 'side_area_width' )
				) );
				
				$side_menu_open_classes = array(
					'.mkdf-side-area-uncovered-from-content.mkdf-right-side-menu-opened .mkdf-wrapper',
					'.mkdf-side-area-uncovered-from-content.mkdf-right-side-menu-opened footer.uncover',
					'.mkdf-side-area-uncovered-from-content.mkdf-right-side-menu-opened .mkdf-sticky-header',
					'.mkdf-side-area-uncovered-from-content.mkdf-right-side-menu-opened .mkdf-fixed-wrapper.fixed',
					'.mkdf-side-area-uncovered-from-content.mkdf-right-side-menu-opened .mkdf-mobile-header-inner',
					'.mkdf-side-area-uncovered-from-content.mkdf-right-side-menu-opened .mobile-header-appear .mkdf-mobile-header-inner',
				);
				
				echo wilmer_mikado_dynamic_css( $side_menu_open_classes, array(
					'left' => '-' . wilmer_mikado_options()->getOptionValue( 'side_area_width' ),
				) );
			}
		}
	}
	
	add_action( 'wilmer_mikado_action_style_dynamic', 'wilmer_mikado_side_area_uncovered_from_content_type_style' );
}

if ( ! function_exists( 'wilmer_mikado_side_area_icon_color_styles' ) ) {
	function wilmer_mikado_side_area_icon_color_styles() {
		$icon_color             = wilmer_mikado_options()->getOptionValue( 'side_area_icon_color' );
		$icon_hover_color       = wilmer_mikado_options()->getOptionValue( 'side_area_icon_hover_color' );
		$close_icon_color       = wilmer_mikado_options()->getOptionValue( 'side_area_close_icon_color' );
		$close_icon_hover_color = wilmer_mikado_options()->getOptionValue( 'side_area_close_icon_hover_color' );
		
		$icon_hover_selector = array(
			'.mkdf-side-menu-button-opener:hover',
			'.mkdf-side-menu-button-opener.opened'
		);
		
		if ( ! empty( $icon_color ) ) {
			echo wilmer_mikado_dynamic_css( '.mkdf-side-menu-button-opener', array(
				'color' => $icon_color
			) );
		}
		
		if ( ! empty( $icon_hover_color ) ) {
			echo wilmer_mikado_dynamic_css( $icon_hover_selector, array(
				'color' => $icon_hover_color
			) );
		}
		
		if ( ! empty( $close_icon_color ) ) {
			echo wilmer_mikado_dynamic_css( '.mkdf-side-menu a.mkdf-close-side-menu', array(
				'color' => $close_icon_color
			) );
		}
		
		if ( ! empty( $close_icon_hover_color ) ) {
			echo wilmer_mikado_dynamic_css( '.mkdf-side-menu a.mkdf-close-side-menu:hover', array(
				'color' => $close_icon_hover_color
			) );
		}
	}
	
	add_action( 'wilmer_mikado_action_style_dynamic', 'wilmer_mikado_side_area_icon_color_styles' );
}

if ( ! function_exists( 'wilmer_mikado_side_area_styles' ) ) {
	function wilmer_mikado_side_area_styles() {
		$side_area_styles = array();
		$background_color = wilmer_mikado_options()->getOptionValue( 'side_area_background_color' );
		$padding          = wilmer_mikado_options()->getOptionValue( 'side_area_padding' );
		$text_alignment   = wilmer_mikado_options()->getOptionValue( 'side_area_aligment' );
		
		if ( ! empty( $background_color ) ) {
			$side_area_styles['background-color'] = $background_color;
		}
		
		if ( ! empty( $padding ) ) {
			$side_area_styles['padding'] = esc_attr( $padding );
		}
		
		if ( ! empty( $text_alignment ) ) {
			$side_area_styles['text-align'] = $text_alignment;
		}
		
		if ( ! empty( $side_area_styles ) ) {
			echo wilmer_mikado_dynamic_css( '.mkdf-side-menu', $side_area_styles );
		}
		
		if ( $text_alignment === 'center' ) {
			echo wilmer_mikado_dynamic_css( '.mkdf-side-menu .widget img', array(
				'margin' => '0 auto'
			) );
		}
	}
	
	add_action( 'wilmer_mikado_action_style_dynamic', 'wilmer_mikado_side_area_styles' );
}