<?php

if ( ! function_exists( 'wilmer_mikado_register_woocommerce_dropdown_cart_widget' ) ) {
	/**
	 * Function that register dropdown cart widget
	 */
	function wilmer_mikado_register_woocommerce_dropdown_cart_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassWoocommerceDropdownCart';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_woocommerce_dropdown_cart_widget' );
}

if ( ! function_exists( 'wilmer_mikado_get_dropdown_cart_icon_class' ) ) {
	/**
	 * Returns dropdow cart icon class
	 */
	function wilmer_mikado_get_dropdown_cart_icon_class() {
		$classes = array(
			'mkdf-header-cart'
		);
		
		$classes[] = wilmer_mikado_get_icon_sources_class( 'dropdown_cart', 'mkdf-header-cart' );
		
		return implode( ' ', $classes );
	}
}