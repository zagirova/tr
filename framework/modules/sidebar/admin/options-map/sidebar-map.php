<?php

if ( ! function_exists( 'wilmer_mikado_sidebar_options_map' ) ) {
	function wilmer_mikado_sidebar_options_map() {
		
		wilmer_mikado_add_admin_page(
			array(
				'slug'  => '_sidebar_page',
				'title' => esc_html__( 'Sidebar Area', 'wilmer' ),
				'icon'  => 'fa fa-indent'
			)
		);
		
		$sidebar_panel = wilmer_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Sidebar Area', 'wilmer' ),
				'name'  => 'sidebar',
				'page'  => '_sidebar_page'
			)
		);
		
		wilmer_mikado_add_admin_field( array(
			'name'          => 'sidebar_layout',
			'type'          => 'select',
			'label'         => esc_html__( 'Sidebar Layout', 'wilmer' ),
			'description'   => esc_html__( 'Choose a sidebar layout for pages', 'wilmer' ),
			'parent'        => $sidebar_panel,
			'default_value' => 'no-sidebar',
            'options'       => wilmer_mikado_get_custom_sidebars_options()
		) );
		
		$wilmer_custom_sidebars = wilmer_mikado_get_custom_sidebars();
		if ( count( $wilmer_custom_sidebars ) > 0 ) {
			wilmer_mikado_add_admin_field( array(
				'name'        => 'custom_sidebar_area',
				'type'        => 'selectblank',
				'label'       => esc_html__( 'Sidebar to Display', 'wilmer' ),
				'description' => esc_html__( 'Choose a sidebar to display on pages. Default sidebar is "Sidebar"', 'wilmer' ),
				'parent'      => $sidebar_panel,
				'options'     => $wilmer_custom_sidebars,
				'args'        => array(
					'select2' => true
				)
			) );
		}
	}
	
	add_action( 'wilmer_mikado_action_options_map', 'wilmer_mikado_sidebar_options_map', wilmer_mikado_set_options_map_position( 'sidebar' ) );
}