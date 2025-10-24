<?php

if( class_exists('WilmerCoreClassWidget') ) {
	class WilmerMikadoClassImageGalleryWidget extends WilmerCoreClassWidget {
		public function __construct() {
			parent::__construct(
				'mkdf_image_gallery_widget',
				esc_html__(
					'Wilmer Image Gallery Widget',
					'wilmer'
				),
				array(
					'description' => esc_html__(
						'Add image gallery element to widget areas',
						'wilmer'
					)
				)
			);
			
			$this->setParams();
		}
		
		protected function setParams() {
			$this->params = array(
				array(
					'type'  => 'textfield',
					'name'  => 'extra_class',
					'title' => esc_html__(
						'Custom CSS Class',
						'wilmer'
					)
				),
				array(
					'type'  => 'textfield',
					'name'  => 'widget_bottom_margin',
					'title' => esc_html__(
						'Widget Bottom Margin (px)',
						'wilmer'
					)
				),
				array(
					'type'  => 'textfield',
					'name'  => 'widget_title',
					'title' => esc_html__(
						'Widget Title',
						'wilmer'
					)
				),
				array(
					'type'  => 'textfield',
					'name'  => 'widget_title_bottom_margin',
					'title' => esc_html__(
						'Widget Title Bottom Margin (px)',
						'wilmer'
					)
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'type',
					'title'   => esc_html__(
						'Gallery Type',
						'wilmer'
					),
					'options' => array(
						'grid'   => esc_html__(
							'Image Grid',
							'wilmer'
						),
						'slider' => esc_html__(
							'Slider',
							'wilmer'
						)
					)
				),
				array(
					'type'        => 'textfield',
					'name'        => 'images',
					'title'       => esc_html__(
						'Image ID\'s',
						'wilmer'
					),
					'description' => esc_html__(
						'Add images id for your image gallery widget, separate id\'s with comma',
						'wilmer'
					)
				),
				array(
					'type'        => 'textfield',
					'name'        => 'image_size',
					'title'       => esc_html__(
						'Image Size',
						'wilmer'
					),
					'description' => esc_html__(
						'Enter image size. Example: thumbnail, medium, large, full or other sizes defined by current theme. Alternatively enter image size in pixels: 200x100 (Width x Height). Leave empty to use "thumbnail" size',
						'wilmer'
					)
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'enable_image_shadow',
					'title'   => esc_html__(
						'Enable Image Shadow',
						'wilmer'
					),
					'options' => wilmer_mikado_get_yes_no_select_array()
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'image_behavior',
					'title'   => esc_html__(
						'Image Behavior',
						'wilmer'
					),
					'options' => array(
						''            => esc_html__(
							'None',
							'wilmer'
						),
						'lightbox'    => esc_html__(
							'Open Lightbox',
							'wilmer'
						),
						'custom-link' => esc_html__(
							'Open Custom Link',
							'wilmer'
						),
						'zoom'        => esc_html__(
							'Zoom',
							'wilmer'
						),
						'grayscale'   => esc_html__(
							'Grayscale',
							'wilmer'
						)
					)
				),
				array(
					'type'        => 'textarea',
					'name'        => 'custom_links',
					'title'       => esc_html__(
						'Custom Links',
						'wilmer'
					),
					'description' => esc_html__(
						'Delimit links by comma',
						'wilmer'
					)
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'custom_link_target',
					'title'   => esc_html__(
						'Custom Link Target',
						'wilmer'
					),
					'options' => wilmer_mikado_get_link_target_array()
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'number_of_columns',
					'title'   => esc_html__(
						'Number of Columns',
						'wilmer'
					),
					'options' => wilmer_mikado_get_number_of_columns_array(
						false,
						array( 'six' )
					)
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'space_between_columns',
					'title'   => esc_html__(
						'Space Between Items',
						'wilmer'
					),
					'options' => wilmer_mikado_get_space_between_items_array()
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'slider_navigation',
					'title'   => esc_html__(
						'Enable Slider Navigation Arrows',
						'wilmer'
					),
					'options' => wilmer_mikado_get_yes_no_select_array( false )
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'slider_pagination',
					'title'   => esc_html__(
						'Enable Slider Pagination',
						'wilmer'
					),
					'options' => wilmer_mikado_get_yes_no_select_array( false )
				)
			);
		}
		
		public function widget( $args, $instance ) {
			if ( ! is_array( $instance ) ) {
				$instance = array();
			}
			
			$extra_class      = ! empty( $instance['extra_class'] ) ? $instance['extra_class'] : '';
			$instance['type'] = ! empty( $instance['type'] ) ? $instance['type'] : 'grid';
			
			//prepare variables
			$params = '';
			
			//is instance empty?
			if ( is_array( $instance ) && count( $instance ) ) {
				//generate shortcode params
				foreach ( $instance as $key => $value ) {
					$params .= " $key='$value' ";
				}
			}
			
			$widget_styles = array();
			if ( isset( $instance['widget_bottom_margin'] ) && $instance['widget_bottom_margin'] !== '' ) {
				$widget_styles[] = 'margin-bottom: ' . wilmer_mikado_filter_px(
						$instance['widget_bottom_margin']
					) . 'px';
			}
			
			$widget_title_styles = array();
			if ( isset( $instance['widget_title_bottom_margin'] ) && $instance['widget_title_bottom_margin'] !== '' ) {
				$widget_title_styles[] = 'margin-bottom: ' . wilmer_mikado_filter_px(
						$instance['widget_title_bottom_margin']
					) . 'px';
			}
			?>
			
			<div class="widget mkdf-image-gallery-widget <?php echo esc_attr(
				$extra_class
			); ?>" <?php echo wilmer_mikado_get_inline_style( $widget_styles ); ?>>
				<?php
				if ( ! empty( $instance['widget_title'] ) ) {
					if ( ! empty( $widget_title_styles ) ) {
						$args['before_title'] = wilmer_mikado_widget_modified_before_title(
							$args['before_title'],
							$widget_title_styles
						);
					}
					
					echo wp_kses_post( $args['before_title'] ) . esc_html( $instance['widget_title'] ) . wp_kses_post(
							$args['after_title']
						);
				}
				echo do_shortcode( "[mkdf_image_gallery $params]" ); // XSS OK
				?>
			</div>
			<?php
		}
	}
}