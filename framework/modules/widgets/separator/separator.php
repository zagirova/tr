<?php

if( class_exists('WilmerCoreClassWidget') ) {
	class WilmerMikadoClassSeparatorWidget extends WilmerCoreClassWidget {
		public function __construct() {
			parent::__construct(
				'mkdf_separator_widget',
				esc_html__(
					'Wilmer Separator Widget',
					'wilmer'
				),
				array(
					'description' => esc_html__(
						'Add a separator element to your widget areas',
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
						'normal'     => esc_html__(
							'Normal',
							'wilmer'
						),
						'full-width' => esc_html__(
							'Full Width',
							'wilmer'
						)
					)
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'position',
					'title'   => esc_html__(
						'Position',
						'wilmer'
					),
					'options' => array(
						'center' => esc_html__(
							'Center',
							'wilmer'
						),
						'left'   => esc_html__(
							'Left',
							'wilmer'
						),
						'right'  => esc_html__(
							'Right',
							'wilmer'
						)
					)
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'border_style',
					'title'   => esc_html__(
						'Style',
						'wilmer'
					),
					'options' => array(
						'solid'  => esc_html__(
							'Solid',
							'wilmer'
						),
						'dashed' => esc_html__(
							'Dashed',
							'wilmer'
						),
						'dotted' => esc_html__(
							'Dotted',
							'wilmer'
						)
					)
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
					'type'  => 'textfield',
					'name'  => 'width',
					'title' => esc_html__(
						'Width (px or %)',
						'wilmer'
					)
				),
				array(
					'type'  => 'textfield',
					'name'  => 'thickness',
					'title' => esc_html__(
						'Thickness (px)',
						'wilmer'
					)
				),
				array(
					'type'  => 'textfield',
					'name'  => 'top_margin',
					'title' => esc_html__(
						'Top Margin (px or %)',
						'wilmer'
					)
				),
				array(
					'type'  => 'textfield',
					'name'  => 'bottom_margin',
					'title' => esc_html__(
						'Bottom Margin (px or %)',
						'wilmer'
					)
				)
			);
		}
		
		public function widget( $args, $instance ) {
			if ( ! is_array( $instance ) ) {
				$instance = array();
			}
			
			//prepare variables
			$params = '';
			
			//is instance empty?
			if ( is_array( $instance ) && count( $instance ) ) {
				//generate shortcode params
				foreach ( $instance as $key => $value ) {
					$params .= " $key='$value' ";
				}
			}
			
			echo '<div class="widget mkdf-separator-widget">';
			echo do_shortcode( "[mkdf_separator $params]" ); // XSS OK
			echo '</div>';
		}
	}
}