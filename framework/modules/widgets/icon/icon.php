<?php

if( class_exists('WilmerCoreClassWidget') ) {
	class WilmerMikadoClassIconWidget extends WilmerCoreClassWidget {
		public function __construct() {
			parent::__construct(
				'mkdf_icon_widget',
				esc_html__(
					'Wilmer Icon Widget',
					'wilmer'
				),
				array(
					'description' => esc_html__(
						'Add icons to widget areas',
						'wilmer'
					)
				)
			);
			
			$this->setParams();
		}
		
		protected function setParams() {
			$this->params = array_merge(
				wilmer_mikado_icon_collections()->getIconWidgetParamsArray(),
				array(
					array(
						'type'  => 'textfield',
						'name'  => 'custom_image',
						'title' => esc_html__(
							'Custom Image ID',
							'wilmer'
						)
					),
					array(
						'type'  => 'textfield',
						'name'  => 'icon_text',
						'title' => esc_html__(
							'Icon Text',
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
							'Target',
							'wilmer'
						),
						'options' => wilmer_mikado_get_link_target_array()
					),
					array(
						'type'  => 'textfield',
						'name'  => 'icon_size',
						'title' => esc_html__(
							'Icon Size (px)',
							'wilmer'
						)
					),
					array(
						'type'  => 'colorpicker',
						'name'  => 'icon_color',
						'title' => esc_html__(
							'Icon Color',
							'wilmer'
						)
					),
					array(
						'type'  => 'colorpicker',
						'name'  => 'icon_hover_color',
						'title' => esc_html__(
							'Icon Hover Color',
							'wilmer'
						)
					),
					array(
						'type'  => 'textfield',
						'name'  => 'text_size',
						'title' => esc_html__(
							'Text Size (px)',
							'wilmer'
						)
					),
					array(
						'type'  => 'colorpicker',
						'name'  => 'text_color',
						'title' => esc_html__(
							'Text Color',
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
				)
			);
		}
		
		public function widget( $args, $instance ) {
			$holder_classes = array( 'mkdf-icon-widget-holder' );
			if ( ! empty( $instance['icon_hover_color'] ) ) {
				$holder_classes[] = 'mkdf-icon-has-hover';
			}
			
			$data   = array();
			$data[] = ! empty( $instance['icon_hover_color'] ) ? wilmer_mikado_get_inline_attr(
				$instance['icon_hover_color'],
				'data-hover-color'
			) : '';
			$data   = implode(
				' ',
				$data
			);
			
			$holder_styles = array();
			if ( isset( $instance['margin'] ) && $instance['margin'] !== '' ) {
				$holder_styles[] = 'margin: ' . $instance['margin'];
			}
			
			if ( isset( $instance['text_color'] ) && $instance['text_color'] !== '' ) {
				$holder_styles[] = 'color: ' . $instance['text_color'];
			}
			
			$icon_styles = array();
			if ( ! empty( $instance['icon_color'] ) ) {
				$icon_styles[] = 'color: ' . $instance['icon_color'];
			}
			if ( ! empty( $instance['icon_size'] ) ) {
				$icon_styles[] = 'font-size: ' . wilmer_mikado_filter_px( $instance['icon_size'] ) . 'px';
			}
			
			$text_styles = array();
			if ( ! empty( $instance['text_size'] ) ) {
				$text_styles[] = 'font-size: ' . wilmer_mikado_filter_px( $instance['text_size'] ) . 'px';
			}
			/*if ( ! empty( $instance['text_color'] ) ) {
				$text_styles[] = 'color: ' . $instance['text_color'];
			}*/
			
			$link   = ! empty( $instance['link'] ) ? $instance['link'] : '#';
			$target = ! empty( $instance['target'] ) ? $instance['target'] : '_self';
			
			$icon_holder_html = '';
			if ( ! empty( $instance['icon_pack'] ) ) {
				$icon_class   = array();
				$icon_class[] = ! empty( $instance['fa_icon'] ) && $instance['icon_pack'] === 'font_awesome' ? $instance['fa_icon'] : '';
				$icon_class[] = ! empty( $instance['fe_icon'] ) && $instance['icon_pack'] === 'font_elegant' ? $instance['fe_icon'] : '';
				$icon_class[] = ! empty( $instance['ion_icon'] ) && $instance['icon_pack'] === 'ion_icons' ? $instance['ion_icon'] : '';
				$icon_class[] = ! empty( $instance['linea_icon'] ) && $instance['icon_pack'] === 'linea_icons' ? $instance['linea_icon'] : '';
				$icon_class[] = ! empty( $instance['linear_icon'] ) && $instance['icon_pack'] === 'linear_icons' ? 'lnr ' . $instance['linear_icon'] : '';
				$icon_class[] = ! empty( $instance['simple_line_icon'] ) && $instance['icon_pack'] === 'simple_line_icons' ? $instance['simple_line_icon'] : '';
				$icon_class[] = ! empty( $instance['dripicon'] ) && $instance['icon_pack'] === 'dripicons' ? $instance['dripicon'] : '';
				
				$icon_class = array_filter(
					$icon_class,
					function ( $value ) {
						return $value !== '';
					}
				);
				
				if ( ! empty( $icon_class ) ) {
					$icon_class = implode(
						' ',
						$icon_class
					);
					
					$icon_holder_html = '<span class="mkdf-icon-element ' . esc_attr(
							$icon_class
						) . '" ' . wilmer_mikado_get_inline_style( $icon_styles ) . '></span>';
				}
			}
			
			if ( ! empty( $instance['custom_image'] ) ) {
				$icon_holder_html = '<span class="mkdf-icon-element mkdf-custom-image"><img src=" ' . wp_get_attachment_url(
						$instance['custom_image']
					) . '" alt="icon_widget_image"/></span>';
			}
			
			$icon_text_html  = '';
			$icon_text_class = ! empty( $icon_holder_html ) ? '' : 'mkdf-no-icon';
			if ( ! empty( $instance['icon_text'] ) ) {
				$icon_text_html = '<span class="mkdf-icon-text ' . esc_attr(
						$icon_text_class
					) . '" ' . wilmer_mikado_get_inline_style( $text_styles ) . '>' . esc_html(
					                  $instance['icon_text']
				                  ) . '</span>';
			}
			?>
			
			<a <?php wilmer_mikado_class_attribute( $holder_classes ); ?> <?php echo wp_kses_post( $data ); ?>
					href="<?php echo esc_url( $link ); ?>"
					target="<?php echo esc_attr( $target ); ?>" <?php echo wilmer_mikado_get_inline_style(
				$holder_styles
			); ?>>
				<?php echo wp_kses(
					$icon_holder_html,
					array(
						'span' => array(
							'class' => true,
							'style' => true
						),
						'img'  => array(
							'src' => true,
							'alt' => true
						)
					)
				); ?>
				<?php echo wp_kses(
					$icon_text_html,
					array(
						'span' => array(
							'class' => true,
							'style' => true
						)
					)
				); ?>
			</a>
			<?php
		}
	}
}