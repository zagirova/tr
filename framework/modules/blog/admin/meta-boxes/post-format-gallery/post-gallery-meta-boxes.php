<?php

if ( ! function_exists( 'wilmer_mikado_map_post_gallery_meta' ) ) {
	
	function wilmer_mikado_map_post_gallery_meta() {
		$gallery_post_format_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Gallery Post Format', 'wilmer' ),
				'name'  => 'post_format_gallery_meta'
			)
		);
		
		wilmer_mikado_add_multiple_images_field(
			array(
				'name'        => 'mkdf_post_gallery_images_meta',
				'label'       => esc_html__( 'Gallery Images', 'wilmer' ),
				'description' => esc_html__( 'Choose your gallery images', 'wilmer' ),
				'parent'      => $gallery_post_format_meta_box,
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_mikado_map_post_gallery_meta', 21 );
}
