<?php

if ( ! function_exists( 'wilmer_mikado_skewed_section_additional_class' ) ) {
	/**
	 * Loads html for skew section additional class
	 *
	 * @param $classes
	 * @param $atts
	 *
	 * @return mixed
	 */
	function wilmer_mikado_skewed_section_additional_class( $classes, $atts ) {
		if ( isSet( $atts['enable_skewed_section_effect'] ) && $atts['enable_skewed_section_effect'] === 'yes' ) {
			$classes[] = 'mkdf-has-skewed-section-effect';
		}
		
		return $classes;
	}
	
	add_filter( 'wilmer_mikado_filter_vc_css_classes', 'wilmer_mikado_skewed_section_additional_class', 10, 2 );
}

if ( ! function_exists( 'wilmer_mikado_disable_skewed_section_on_mobile_class' ) ) {
	/**
	 * Insert class into body tag to disable skewed section on mobile
	 *
	 * @param $classes
	 *
	 * @return array
	 */
	function wilmer_mikado_disable_skewed_section_on_mobile_class( $classes ) {
		$disable_skew_section_on_mobile = wilmer_mikado_options()->getOptionValue( 'disable_skewed_section_on_mobile' );
		
		if ( $disable_skew_section_on_mobile === 'yes' ) {
			$classes[] = 'mkdf-disable-ss-on-mobile';
		}
		
		return $classes;
	}
	
	add_filter( 'body_class', 'wilmer_mikado_disable_skewed_section_on_mobile_class' );
}

if ( ! function_exists( 'wilmer_mikado_disable_title_skewed_section_on_mobile_class' ) ) {
	/**
	 * Insert class into body tag to disable title skewed section on mobile
	 *
	 * @param $classes
	 *
	 * @return array
	 */
	function wilmer_mikado_disable_title_skewed_section_on_mobile_class( $classes ) {
		$disable_skew_section_on_mobile = wilmer_mikado_options()->getOptionValue( 'disable_title_skewed_section_on_mobile' );
		
		if ( $disable_skew_section_on_mobile === 'yes' ) {
			$classes[] = 'mkdf-disable-title-ss-on-mobile';
		}
		
		return $classes;
	}
	
	add_filter( 'body_class', 'wilmer_mikado_disable_title_skewed_section_on_mobile_class' );
}

if ( ! function_exists( 'wilmer_mikado_disable_header_skewed_section_on_mobile_class' ) ) {
	/**
	 * Insert class into body tag to disable header skewed section on mobile
	 *
	 * @param $classes
	 *
	 * @return array
	 */
	function wilmer_mikado_disable_header_skewed_section_on_mobile_class( $classes ) {
		$disable_skew_section_on_mobile = wilmer_mikado_options()->getOptionValue( 'disable_header_skewed_section_on_mobile' );
		
		if ( $disable_skew_section_on_mobile === 'yes' ) {
			$classes[] = 'mkdf-disable-header-ss-on-mobile';
		}
		
		return $classes;
	}
	
	add_filter( 'body_class', 'wilmer_mikado_disable_header_skewed_section_on_mobile_class' );
}

if ( ! function_exists( 'wilmer_mikado_skewed_section_default_svg' ) ) {
	/**
	 * Loads default svg
	 *
	 * @return mixed
	 */
	function wilmer_mikado_skewed_section_default_svg() {
		$svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" viewBox="0 0 120 120" enable-background="new 0 0 120 120" width="100%" height="120" xml:space="preserve">
				<polygon points="0,0 0,120 120,0"></polygon></svg>';
		
		if ( wilmer_mikado_options()->getOptionValue( 'skewed_section_general_svg_path' ) !== '' ) {
			$svg = wilmer_mikado_options()->getOptionValue( 'skewed_section_general_svg_path' );
		}
		
		return $svg;
	}
}