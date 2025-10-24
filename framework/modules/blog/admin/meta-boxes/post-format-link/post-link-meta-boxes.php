<?php

if ( ! function_exists( 'wilmer_mikado_map_post_link_meta' ) ) {
	function wilmer_mikado_map_post_link_meta() {
		$link_post_format_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Link Post Format', 'wilmer' ),
				'name'  => 'post_format_link_meta'
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_link_link_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Link', 'wilmer' ),
				'description' => esc_html__( 'Enter link', 'wilmer' ),
				'parent'      => $link_post_format_meta_box
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_mikado_map_post_link_meta', 24 );
}