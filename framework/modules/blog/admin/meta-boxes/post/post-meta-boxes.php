<?php

/*** Post Settings ***/

if ( ! function_exists( 'wilmer_mikado_map_post_meta' ) ) {
	function wilmer_mikado_map_post_meta() {
		
		$post_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Post', 'wilmer' ),
				'name'  => 'post-meta'
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_show_title_area_blog_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'wilmer' ),
				'description'   => esc_html__( 'Enabling this option will show title area on your single post page', 'wilmer' ),
				'parent'        => $post_meta_box,
				'options'       => wilmer_mikado_get_yes_no_select_array()
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_blog_single_sidebar_layout_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Sidebar Layout', 'wilmer' ),
				'description'   => esc_html__( 'Choose a sidebar layout for Blog single page', 'wilmer' ),
				'default_value' => '',
				'parent'        => $post_meta_box,
                'options'       => wilmer_mikado_get_custom_sidebars_options( true )
			)
		);
		
		$wilmer_custom_sidebars = wilmer_mikado_get_custom_sidebars();
		if ( count( $wilmer_custom_sidebars ) > 0 ) {
			wilmer_mikado_create_meta_box_field( array(
				'name'        => 'mkdf_blog_single_custom_sidebar_area_meta',
				'type'        => 'selectblank',
				'label'       => esc_html__( 'Sidebar to Display', 'wilmer' ),
				'description' => esc_html__( 'Choose a sidebar to display on Blog single page. Default sidebar is "Sidebar"', 'wilmer' ),
				'parent'      => $post_meta_box,
				'options'     => wilmer_mikado_get_custom_sidebars(),
				'args' => array(
					'select2' => true
				)
			) );
		}
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_blog_list_featured_image_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Blog List Image', 'wilmer' ),
				'description' => esc_html__( 'Choose an Image for displaying in blog list. If not uploaded, featured image will be shown.', 'wilmer' ),
				'parent'      => $post_meta_box
			)
		);

		do_action('wilmer_mikado_action_blog_post_meta', $post_meta_box);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_mikado_map_post_meta', 20 );
}
