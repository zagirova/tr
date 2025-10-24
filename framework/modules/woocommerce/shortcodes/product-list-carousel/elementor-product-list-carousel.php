<?php
class WilmerMikadoElementorProductListCarousel extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_product_list_carousel'; 
	}

	public function get_title() {
		return esc_html__( 'Product List - Carousel', 'wilmer' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-product-list-carousel';
	}

	public function get_categories() {
		return [ 'mikado' ];
	}

	protected function register_controls() {

		$this->start_controls_section(
			'general',
			[
				'label' => esc_html__( 'General', 'wilmer' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'type',
			[
				'label'     => esc_html__( 'Type', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'standard' => esc_html__( 'Standard', 'wilmer'),
					'simple' => esc_html__( 'Simple', 'wilmer')
				),
				'default' => 'standard'
			]
		);

		$this->add_control(
			'number_of_posts',
			[
				'label'     => esc_html__( 'Number of Products', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
                'default' => '8'
			]
		);

		$this->add_control(
			'space_between_items',
			[
				'label'     => esc_html__( 'Space Between Items', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'huge' => esc_html__( 'Huge (40)', 'wilmer'),
					'large' => esc_html__( 'Large (25)', 'wilmer'),
					'medium' => esc_html__( 'Medium (20)', 'wilmer'),
					'normal' => esc_html__( 'Normal (15)', 'wilmer'),
					'small' => esc_html__( 'Small (10)', 'wilmer'),
					'tiny' => esc_html__( 'Tiny (5)', 'wilmer'),
					'no' => esc_html__( 'No (0)', 'wilmer')
				),
				'default' => 'normal',
				'condition' => [
					'type' => array( 'standard' )
				]
			]
		);

		$this->add_control(
			'orderby',
			[
				'label'     => esc_html__( 'Order By', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'date' => esc_html__( 'Date', 'wilmer'),
					'ID' => esc_html__( 'ID', 'wilmer'),
					'menu_order' => esc_html__( 'Menu Order', 'wilmer'),
					'name' => esc_html__( 'Post Name', 'wilmer'),
					'rand' => esc_html__( 'Random', 'wilmer'),
					'title' => esc_html__( 'Title', 'wilmer'),
					'on-sale' => esc_html__( 'On Sale', 'wilmer')
				),
				'default' => 'date'
			]
		);

		$this->add_control(
			'order',
			[
				'label'     => esc_html__( 'Order', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'ASC' => esc_html__( 'ASC', 'wilmer'),
					'DESC' => esc_html__( 'DESC', 'wilmer')
				),
				'default' => 'ASC'
			]
		);

		$this->add_control(
			'taxonomy_to_display',
			[
				'label'     => esc_html__( 'Choose Sorting Taxonomy', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'If you would like to display only certain products, this is where you can select the criteria by which you would like to choose which products to display', 'wilmer' ),
				'options' => array(
					'category' => esc_html__( 'Category', 'wilmer'),
					'tag' => esc_html__( 'Tag', 'wilmer'),
					'id' => esc_html__( 'Id', 'wilmer')
				),
				'default' => 'category'
			]
		);

		$this->add_control(
			'taxonomy_values',
			[
				'label'     => esc_html__( 'Enter Taxonomy Values', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Separate values (category slugs, tags, or post IDs) with a comma', 'wilmer' )
			]
		);

		$this->add_control(
			'image_size',
			[
				'label'     => esc_html__( 'Image Proportions', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer'),
					'full' => esc_html__( 'Original', 'wilmer'),
					'square' => esc_html__( 'Square', 'wilmer'),
					'landscape' => esc_html__( 'Landscape', 'wilmer'),
					'portrait' => esc_html__( 'Portrait', 'wilmer'),
					'medium' => esc_html__( 'Medium', 'wilmer'),
					'large' => esc_html__( 'Large', 'wilmer'),
					'woocommerce_single' => esc_html__( 'Shop Single', 'wilmer'),
					'woocommerce_thumbnail' => esc_html__( 'Shop Thumbnail', 'wilmer')
				),
				'default' => 'full'
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'slider_settings',
			[
				'label' => esc_html__( 'Slider Settings', 'wilmer' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'number_of_visible_items',
			[
				'label'     => esc_html__( 'Number Of Visible Items', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'1' => esc_html__( 'One', 'wilmer'),
					'2' => esc_html__( 'Two', 'wilmer'),
					'3' => esc_html__( 'Three', 'wilmer'),
					'4' => esc_html__( 'Four', 'wilmer'),
					'5' => esc_html__( 'Five', 'wilmer'),
					'6' => esc_html__( 'Six', 'wilmer')
				),
				'default' => '1'
			]
		);

		$this->add_control(
			'slider_loop',
			[
				'label'     => esc_html__( 'Enable Slider Loop', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_autoplay',
			[
				'label'     => esc_html__( 'Enable Slider Autoplay', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_speed',
			[
				'label'     => esc_html__( 'Slide Duration', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Default value is 5000 (ms)', 'wilmer' )
			]
		);

		$this->add_control(
			'slider_speed_animation',
			[
				'label'     => esc_html__( 'Slide Animation Duration', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Speed of slide animation in milliseconds. Default value is 600.', 'wilmer' )
			]
		);

		$this->add_control(
			'slider_navigation',
			[
				'label'     => esc_html__( 'Enable Slider Navigation Arrows', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_navigation_skin',
			[
				'label'     => esc_html__( 'Slider Navigation Skin', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'default' => esc_html__( 'Default', 'wilmer'),
					'light' => esc_html__( 'Light', 'wilmer')
				),
				'default' => 'default',
				'condition' => [
					'slider_navigation' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'slider_pagination',
			[
				'label'     => esc_html__( 'Enable Slider Pagination', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'slider_pagination_skin',
			[
				'label'     => esc_html__( 'Slider Pagination Skin', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'default' => esc_html__( 'Default', 'wilmer'),
					'light' => esc_html__( 'Light', 'wilmer')
				),
				'default' => 'default',
				'condition' => [
					'slider_pagination' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'slider_pagination_pos',
			[
				'label'     => esc_html__( 'Slider Pagination Position', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'bellow-slider' => esc_html__( 'Below Carousel', 'wilmer'),
					'inside-slider' => esc_html__( 'Inside Carousel', 'wilmer')
				),
				'default' => 'bellow-slider',
				'condition' => [
					'slider_pagination' => array( 'yes' )
				]
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'product_info',
			[
				'label' => esc_html__( 'Product Info', 'wilmer' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'display_title',
			[
				'label'     => esc_html__( 'Display Title', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'display_category',
			[
				'label'     => esc_html__( 'Display Category', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer'),
					'yes' => esc_html__( 'Yes', 'wilmer')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'display_excerpt',
			[
				'label'     => esc_html__( 'Display Excerpt', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer'),
					'yes' => esc_html__( 'Yes', 'wilmer')
				),
				'default' => 'no'
			]
		);

		$this->add_control(
			'display_rating',
			[
				'label'     => esc_html__( 'Display Rating', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'display_price',
			[
				'label'     => esc_html__( 'Display Price', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'display_button',
			[
				'label'     => esc_html__( 'Display Button', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'product_info_style',
			[
				'label' => esc_html__( 'Product Info Style', 'wilmer' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'title_tag',
			[
				'label'     => esc_html__( 'Title Tag', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer'),
					'h1' => esc_html__( 'h1', 'wilmer'),
					'h2' => esc_html__( 'h2', 'wilmer'),
					'h3' => esc_html__( 'h3', 'wilmer'),
					'h4' => esc_html__( 'h4', 'wilmer'),
					'h5' => esc_html__( 'h5', 'wilmer'),
					'h6' => esc_html__( 'h6', 'wilmer')
				),
				'default' => 'h4',
				'condition' => [
					'display_title' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'title_transform',
			[
				'label'     => esc_html__( 'Title Text Transform', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer'),
					'none' => esc_html__( 'None', 'wilmer'),
					'capitalize' => esc_html__( 'Capitalize', 'wilmer'),
					'uppercase' => esc_html__( 'Uppercase', 'wilmer'),
					'lowercase' => esc_html__( 'Lowercase', 'wilmer'),
					'initial' => esc_html__( 'Initial', 'wilmer'),
					'inherit' => esc_html__( 'Inherit', 'wilmer')
				),
				'default' => '',
				'condition' => [
					'display_title' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'excerpt_length',
			[
				'label'     => esc_html__( 'Excerpt Length', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Number of characters', 'wilmer' ),
				'condition' => [
					'display_excerpt' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'button_skin',
			[
				'label'     => esc_html__( 'Button Skin', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'default' => esc_html__( 'Default', 'wilmer'),
					'light' => esc_html__( 'Light', 'wilmer'),
					'dark' => esc_html__( 'Dark', 'wilmer')
				),
				'default' => 'default',
				'condition' => [
					'display_button' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'shader_background_color',
			[
				'label'     => esc_html__( 'Shader Background Color', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::COLOR
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		
		$params['class_name'] = 'plc';
		$params['type']       = ! empty( $params['type'] ) ? $params['type'] : 'standard';

		$additional_params                   = array();
		$additional_params['holder_classes'] = $this->getHolderClasses( $params );
		$additional_params['holder_data']    = $this->getProductListCarouselDataAttributes( $params );
		
		$queryArray                        = $this->generateProductQueryArray( $params );
		$query_result                      = new \WP_Query( $queryArray );
		$additional_params['query_result'] = $query_result;
		
		$params['this_object'] = $this;
		
		echo wilmer_mikado_get_woo_shortcode_module_template_part( 'templates/product-list', 'product-list-carousel', $params['type'], $params, $additional_params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses   = array();
		$holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-' . $params['type'] . '-layout' : '';
		$holderClasses[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : '';
		$holderClasses[] = $this->getCarouselClasses( $params );
		
		return implode( ' ', $holderClasses );
	}

	private function getCarouselClasses( $params ) {
		$carouselClasses   = array();
		$carouselClasses[] = ! empty( $params['slider_navigation_skin'] ) ? 'mkdf-plc-nav-' . $params['slider_navigation_skin'] . '-skin' : '';
		$carouselClasses[] = ! empty( $params['slider_pagination_pos'] ) ? 'mkdf-plc-pag-' . $params['slider_pagination_pos'] : '';
		$carouselClasses[] = ! empty( $params['slider_pagination_skin'] ) ? 'mkdf-plc-pag-' . $params['slider_pagination_skin'] . '-skin' : '';
		
		return implode( ' ', $carouselClasses );
	}

	private function getProductListCarouselDataAttributes( $params ) {
		$slider_data = array();
		
		$slider_data['data-number-of-items']        = ! empty( $params['number_of_visible_items'] ) && $params['type'] !== 'simple' ? $params['number_of_visible_items'] : '1';
		$slider_data['data-enable-loop']            = ! empty( $params['slider_loop'] ) ? $params['slider_loop'] : '';
		$slider_data['data-enable-autoplay']        = ! empty( $params['slider_autoplay'] ) ? $params['slider_autoplay'] : '';
		$slider_data['data-slider-speed']           = ! empty( $params['slider_speed'] ) ? $params['slider_speed'] : '5000';
		$slider_data['data-slider-speed-animation'] = ! empty( $params['slider_speed_animation'] ) ? $params['slider_speed_animation'] : '600';
		$slider_data['data-enable-navigation']      = ! empty( $params['slider_navigation'] ) ? $params['slider_navigation'] : '';
		$slider_data['data-enable-pagination']      = ! empty( $params['slider_pagination'] ) ? $params['slider_pagination'] : '';
		
		return $slider_data;
	}

	public function generateProductQueryArray( $params ) {
		$queryArray = array(
			'post_status'         => 'publish',
			'post_type'           => 'product',
			'ignore_sticky_posts' => 1,
			'posts_per_page'      => $params['number_of_posts'],
			'orderby'             => $params['orderby'],
			'order'               => $params['order']
		);
		
		if ( $params['orderby'] === 'on-sale' ) {
			$queryArray['no_found_rows'] = 1;
			$queryArray['post__in']      = array_merge( array( 0 ), wc_get_product_ids_on_sale() );
		}
		
		if ( $params['taxonomy_to_display'] !== '' && $params['taxonomy_to_display'] === 'category' ) {
			$queryArray['product_cat'] = $params['taxonomy_values'];
		}
		
		if ( $params['taxonomy_to_display'] !== '' && $params['taxonomy_to_display'] === 'tag' ) {
			$queryArray['product_tag'] = $params['taxonomy_values'];
		}
		
		if ( $params['taxonomy_to_display'] !== '' && $params['taxonomy_to_display'] === 'id' ) {
			$idArray                = $params['taxonomy_values'];
			$ids                    = explode( ',', $idArray );
            $queryArray['orderby'] = 'post__in';
			$queryArray['post__in'] = $ids;
		}
		
		return $queryArray;
	}

	public function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_transform'] ) ) {
			$styles[] = 'text-transform: ' . $params['title_transform'];
		}
		
		return implode( ';', $styles );
	}

	public function getShaderStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['shader_background_color'] ) ) {
			$styles[] = 'background-color: ' . $params['shader_background_color'];
		}
		
		return implode( ';', $styles );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register( new WilmerMikadoElementorProductListCarousel() );