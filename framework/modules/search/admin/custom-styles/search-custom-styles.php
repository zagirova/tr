<?php

if ( ! function_exists( 'wilmer_mikado_search_opener_icon_size' ) ) {
	function wilmer_mikado_search_opener_icon_size() {
		$icon_size = wilmer_mikado_options()->getOptionValue( 'header_search_icon_size' );
		
		if ( ! empty( $icon_size ) ) {
			echo wilmer_mikado_dynamic_css( '.mkdf-search-opener', array(
				'font-size' => wilmer_mikado_filter_px( $icon_size ) . 'px'
			) );
		}
	}
	
	add_action( 'wilmer_mikado_action_style_dynamic', 'wilmer_mikado_search_opener_icon_size' );
}

if ( ! function_exists( 'wilmer_mikado_search_opener_icon_colors' ) ) {
	function wilmer_mikado_search_opener_icon_colors() {
		$icon_color       = wilmer_mikado_options()->getOptionValue( 'header_search_icon_color' );
		$icon_hover_color = wilmer_mikado_options()->getOptionValue( 'header_search_icon_hover_color' );
		
		if ( ! empty( $icon_color ) ) {
			echo wilmer_mikado_dynamic_css( '.mkdf-search-opener', array(
				'color' => $icon_color
			) );
		}
		
		if ( ! empty( $icon_hover_color ) ) {
			echo wilmer_mikado_dynamic_css( '.mkdf-search-opener:hover', array(
				'color' => $icon_hover_color
			) );
		}
	}
	
	add_action( 'wilmer_mikado_action_style_dynamic', 'wilmer_mikado_search_opener_icon_colors' );
}

if ( ! function_exists( 'wilmer_mikado_search_opener_text_styles' ) ) {
	function wilmer_mikado_search_opener_text_styles() {
		$item_styles = wilmer_mikado_get_typography_styles( 'search_icon_text' );
		
		$item_selector = array(
			'.mkdf-search-icon-text'
		);
		
		echo wilmer_mikado_dynamic_css( $item_selector, $item_styles );
		
		$text_hover_color = wilmer_mikado_options()->getOptionValue( 'search_icon_text_color_hover' );
		
		if ( ! empty( $text_hover_color ) ) {
			echo wilmer_mikado_dynamic_css( '.mkdf-search-opener:hover .mkdf-search-icon-text', array(
				'color' => $text_hover_color
			) );
		}
	}
	
	add_action( 'wilmer_mikado_action_style_dynamic', 'wilmer_mikado_search_opener_text_styles' );
}