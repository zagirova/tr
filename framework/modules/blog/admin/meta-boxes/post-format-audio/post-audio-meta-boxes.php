<?php

if ( ! function_exists( 'wilmer_mikado_map_post_audio_meta' ) ) {
	function wilmer_mikado_map_post_audio_meta() {
		$audio_post_format_meta_box = wilmer_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Audio Post Format', 'wilmer' ),
				'name'  => 'post_format_audio_meta'
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_audio_type_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Audio Type', 'wilmer' ),
				'description'   => esc_html__( 'Choose audio type', 'wilmer' ),
				'parent'        => $audio_post_format_meta_box,
				'default_value' => 'social_networks',
				'options'       => array(
					'social_networks' => esc_html__( 'Audio Service', 'wilmer' ),
					'self'            => esc_html__( 'Self Hosted', 'wilmer' )
				)
			)
		);
		
		$mkdf_audio_embedded_container = wilmer_mikado_add_admin_container(
			array(
				'parent' => $audio_post_format_meta_box,
				'name'   => 'mkdf_audio_embedded_container'
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_audio_link_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Audio URL', 'wilmer' ),
				'description' => esc_html__( 'Enter audio URL', 'wilmer' ),
				'parent'      => $mkdf_audio_embedded_container,
				'dependency' => array(
					'show' => array(
						'mkdf_audio_type_meta' => 'social_networks'
					)
				)
			)
		);
		
		wilmer_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_audio_custom_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Audio Link', 'wilmer' ),
				'description' => esc_html__( 'Enter audio link', 'wilmer' ),
				'parent'      => $mkdf_audio_embedded_container,
				'dependency' => array(
					'show' => array(
						'mkdf_audio_type_meta' => 'self'
					)
				)
			)
		);
	}
	
	add_action( 'wilmer_mikado_action_meta_boxes_map', 'wilmer_mikado_map_post_audio_meta', 23 );
}