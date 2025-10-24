<?php

if ( ! function_exists( 'wilmer_mikado_map_woocommerce_meta' ) ) {
	function wilmer_mikado_map_woocommerce_meta() {
		
		$woocommerce_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'product' ),
				'title' => esc_html__( 'Product Meta', 'wilmer' ),
				'name'  => 'woo_product_meta'
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_product_featured_image_size',
				'type'        => 'select',
				'label'       => esc_html__( 'Dimensions for Product List Shortcode', 'wilmer' ),
				'description' => esc_html__( 'Choose image layout when it appears in Mikado Product List - Masonry layout shortcode', 'wilmer' ),
				'options'     => array(
					''                   => esc_html__( 'Default', 'wilmer' ),
					'small'              => esc_html__( 'Small', 'wilmer' ),
					'large-width'        => esc_html__( 'Large Width', 'wilmer' ),
					'large-height'       => esc_html__( 'Large Height', 'wilmer' ),
					'large-width-height' => esc_html__( 'Large Width Height', 'wilmer' )
				),
				'parent'      => $woocommerce_meta_box
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_show_title_area_woo_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'wilmer' ),
				'description'   => esc_html__( 'Disabling this option will turn off page title area', 'wilmer' ),
				'options'       => wilmer_mikado_get_yes_no_select_array(),
				'parent'        => $woocommerce_meta_box
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_show_new_sign_woo_meta',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Show New Sign', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will show new sign mark on product', 'wilmer' ),
				'parent'        => $woocommerce_meta_box
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_mikado_map_woocommerce_meta', 99 );
}