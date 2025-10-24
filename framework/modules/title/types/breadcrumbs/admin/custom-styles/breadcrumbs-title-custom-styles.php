<?php

if ( ! function_exists( 'wilmer_mikado_breadcrumbs_title_area_typography_style' ) ) {
	function wilmer_mikado_breadcrumbs_title_area_typography_style() {
		
		$item_styles = wilmer_mikado_get_typography_styles( 'page_breadcrumb' );
		
		$item_selector = array(
			'.mkdf-title-holder .mkdf-title-wrapper .mkdf-breadcrumbs'
		);
		
		echo wilmer_mikado_dynamic_css( $item_selector, $item_styles );
		
		
		$breadcrumb_hover_color = wilmer_mikado_options()->getOptionValue( 'page_breadcrumb_hovercolor' );
		
		$breadcrumb_hover_styles = array();
		if ( ! empty( $breadcrumb_hover_color ) ) {
			$breadcrumb_hover_styles['color'] = $breadcrumb_hover_color;
		}
		
		$breadcrumb_hover_selector = array(
			'.mkdf-title-holder .mkdf-title-wrapper .mkdf-breadcrumbs a:hover'
		);
		
		echo wilmer_mikado_dynamic_css( $breadcrumb_hover_selector, $breadcrumb_hover_styles );
	}
	
	add_action( 'wilmer_mikado_action_style_dynamic', 'wilmer_mikado_breadcrumbs_title_area_typography_style' );
}