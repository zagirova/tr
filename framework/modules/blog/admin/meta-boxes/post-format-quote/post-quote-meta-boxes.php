<?php

if ( ! function_exists( 'wilmer_mikado_map_post_quote_meta' ) ) {
	function wilmer_mikado_map_post_quote_meta() {
		$quote_post_format_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Quote Post Format', 'wilmer' ),
				'name'  => 'post_format_quote_meta'
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_quote_text_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Quote Text', 'wilmer' ),
				'description' => esc_html__( 'Enter Quote text', 'wilmer' ),
				'parent'      => $quote_post_format_meta_box
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_quote_author_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Quote Author', 'wilmer' ),
				'description' => esc_html__( 'Enter Quote author', 'wilmer' ),
				'parent'      => $quote_post_format_meta_box
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_mikado_map_post_quote_meta', 25 );
}