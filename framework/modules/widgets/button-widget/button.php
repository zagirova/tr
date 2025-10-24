<?php

if( class_exists('WilmerCoreClassWidget') ) {
	class WilmerMikadoClassButtonWidget extends WilmerCoreClassWidget {
		public function __construct() {
			parent::__construct(
				'mkdf_button_widget',
				esc_html__(
					'Wilmer Button Widget',
					'wilmer'
				),
				array(
					'description' => esc_html__(
						'Add button element to widget areas',
						'wilmer'
					)
				)
			);
			
			$this->setParams();
		}
		
		protected function setParams() {
			$this->params = array(
				array(
					'type'    => 'dropdown',
					'name'    => 'type',
					'title'   => esc_html__(
						'Type',
						'wilmer'
					),
					'options' => array(
						'solid'   => esc_html__(
							'Solid',
							'wilmer'
						),
						'outline' => esc_html__(
							'Outline',
							'wilmer'
						),
						'simple'  => esc_html__(
							'Simple',
							'wilmer'
						)
					)
				),
				array(
					'type'        => 'dropdown',
					'name'        => 'size',
					'title'       => esc_html__(
						'Size',
						'wilmer'
					),
					'options'     => array(
						'small'  => esc_html__(
							'Small',
							'wilmer'
						),
						'medium' => esc_html__(
							'Medium',
							'wilmer'
						),
						'large'  => esc_html__(
							'Large',
							'wilmer'
						),
						'huge'   => esc_html__(
							'Huge',
							'wilmer'
						)
					),
					'description' => esc_html__(
						'This option is only available for solid and outline button type',
						'wilmer'
					)
				),
				array(
					'type'    => 'textfield',
					'name'    => 'text',
					'title'   => esc_html__(
						'Text',
						'wilmer'
					),
					'default' => esc_html__(
						'Button Text',
						'wilmer'
					)
				),
				array(
					'type'  => 'textfield',
					'name'  => 'link',
					'title' => esc_html__(
						'Link',
						'wilmer'
					)
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'target',
					'title'   => esc_html__(
						'Link Target',
						'wilmer'
					),
					'options' => wilmer_mikado_get_link_target_array()
				),
				array(
					'type'  => 'colorpicker',
					'name'  => 'color',
					'title' => esc_html__(
						'Color',
						'wilmer'
					)
				),
				array(
					'type'  => 'colorpicker',
					'name'  => 'hover_color',
					'title' => esc_html__(
						'Hover Color',
						'wilmer'
					)
				),
				array(
					'type'        => 'colorpicker',
					'name'        => 'background_color',
					'title'       => esc_html__(
						'Background Color',
						'wilmer'
					),
					'description' => esc_html__(
						'This option is only available for solid button type',
						'wilmer'
					)
				),
				array(
					'type'        => 'colorpicker',
					'name'        => 'hover_background_color',
					'title'       => esc_html__(
						'Hover Background Color',
						'wilmer'
					),
					'description' => esc_html__(
						'This option is only available for solid button type',
						'wilmer'
					)
				),
				array(
					'type'        => 'colorpicker',
					'name'        => 'border_color',
					'title'       => esc_html__(
						'Border Color',
						'wilmer'
					),
					'description' => esc_html__(
						'This option is only available for solid and outline button type',
						'wilmer'
					)
				),
				array(
					'type'        => 'colorpicker',
					'name'        => 'hover_border_color',
					'title'       => esc_html__(
						'Hover Border Color',
						'wilmer'
					),
					'description' => esc_html__(
						'This option is only available for solid and outline button type',
						'wilmer'
					)
				),
				array(
					'type'        => 'textfield',
					'name'        => 'margin',
					'title'       => esc_html__(
						'Margin',
						'wilmer'
					),
					'description' => esc_html__(
						'Insert margin in format: top right bottom left (e.g. 10px 5px 10px 5px)',
						'wilmer'
					)
				)
			);
		}
		
		public function widget( $args, $instance ) {
			$params = '';
			
			if ( ! is_array( $instance ) ) {
				$instance = array();
			}
			
			// Filter out all empty params
			$instance = array_filter(
				$instance,
				function ( $array_value ) {
					return trim( $array_value ) != '';
				}
			);
			
			// Default values
			if ( ! isset( $instance['text'] ) ) {
				$instance['text'] = 'Button Text';
			}
			
			// Generate shortcode params
			foreach ( $instance as $key => $value ) {
				$params .= " $key='$value' ";
			}
			
			echo '<div class="widget mkdf-button-widget">';
			echo do_shortcode( "[mkdf_button $params]" ); // XSS OK
			echo '</div>';
		}
	}
}