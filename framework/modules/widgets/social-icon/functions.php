<?php

if ( ! function_exists( 'wilmer_mikado_register_social_icon_widget' ) ) {
	/**
	 * Function that register social icon widget
	 */
	function wilmer_mikado_register_social_icon_widget( $widgets ) {
		$widgets[] = 'WilmerMikadoClassSocialIconWidget';
		
		return $widgets;
	}
	
	add_filter( 'wilmer_core_filter_register_widgets', 'wilmer_mikado_register_social_icon_widget' );
}