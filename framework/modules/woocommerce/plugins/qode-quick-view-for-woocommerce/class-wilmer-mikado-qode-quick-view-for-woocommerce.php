<?php

if ( ! defined( 'ABSPATH' ) ) {
	// Exit if accessed directly.
	exit;
}

if ( ! class_exists( 'Wilmer_Mikado_Qode_Quick_View_For_WooCommerce' ) ) {
	class Wilmer_Mikado_Qode_Quick_View_For_WooCommerce {
		private static $instance;

		public function __construct() {
			add_filter( 'qode_quick_view_for_woocommerce_filter_button_loop_position_default_value', array( $this, 'set_quick_view_button_loop_position_default_value' ) );
			add_action( 'init', array( $this, 'set_button_loop_position' ), 22 );

			add_filter( 'qode_quick_view_for_woocommerce_filter_quick_view_button_wrapper_classes', array( $this, 'set_theme_class' ) );
		}

		/**
		 * @return Wilmer_Mikado_Qode_Quick_View_For_WooCommerce
		 */
		public static function get_instance() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		public function set_quick_view_button_loop_position_default_value() {
			return 'shortcode';
		}

		public function set_button_loop_position() {
			add_action( 'wilmer_mikado_action_woo_pl_info_on_image_hover', array( $this, 'render_button' ), 12 );
			add_action( 'wilmer_mikado_action_woo_pl_info_below_image', array( $this, 'render_button' ), 27 );
			add_action( 'wilmer_mikado_action_product_list_shortcode', array( $this, 'render_button' ), 4 );
		}

		public function render_button() {

			if ( class_exists( 'Qode_Quick_View_For_WooCommerce_Quick_View_Button_Shortcode' ) ) {
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo Qode_Quick_View_For_WooCommerce_Quick_View_Button_Shortcode::call_shortcode();
			}
		}

		public function set_theme_class( $classes ) {
			$classes[] = 'mkdf-wilmer-theme';

			return $classes;
		}
	}

	Wilmer_Mikado_Qode_Quick_View_For_WooCommerce::get_instance();
}
