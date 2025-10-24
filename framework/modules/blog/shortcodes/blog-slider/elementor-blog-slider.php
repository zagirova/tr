<?php
class WilmerMikadoElementorBlogSlider extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_blog_slider'; 
	}

	public function get_title() {
		return esc_html__( 'Blog Slider', 'wilmer' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-blog-slider';
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
			'slider_type',
			[
				'label'     => esc_html__( 'Type', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'slider' => esc_html__( 'Slider', 'wilmer'),
					'carousel' => esc_html__( 'Carousel', 'wilmer'),
					'carousel-centered' => esc_html__( 'Carousel Centered', 'wilmer')
				),
				'default' => 'slider'
			]
		);

		$this->add_control(
			'number_of_posts',
			[
				'label'     => esc_html__( 'Number of Posts', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT
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
					'title' => esc_html__( 'Title', 'wilmer')
				),
				'default' => 'title'
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
			'category',
			[
				'label'     => esc_html__( 'Category', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wilmer' )
			]
		);

		$this->add_control(
			'image_size',
			[
				'label'     => esc_html__( 'Image Size', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'full' => esc_html__( 'Original', 'wilmer'),
					'wilmer_mikado_image_square' => esc_html__( 'Square', 'wilmer'),
					'wilmer_mikado_image_landscape' => esc_html__( 'Landscape', 'wilmer'),
					'wilmer_mikado_image_portrait' => esc_html__( 'Portrait', 'wilmer'),
					'thumbnail' => esc_html__( 'Thumbnail', 'wilmer'),
					'medium' => esc_html__( 'Medium', 'wilmer'),
					'large' => esc_html__( 'Large', 'wilmer')
				),
				'default' => 'full'
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'post_info',
			[
				'label' => esc_html__( 'Post Info', 'wilmer' ),
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
				'default' => 'h2'
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
				'default' => ''
			]
		);

		$this->add_control(
			'post_info_author',
			[
				'label'     => esc_html__( 'Enable Post Info Author', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'post_info_date',
			[
				'label'     => esc_html__( 'Enable Post Info Date', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'post_info_category',
			[
				'label'     => esc_html__( 'Enable Post Info Category', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes'
			]
		);

		$this->add_control(
			'post_info_comments',
			[
				'label'     => esc_html__( 'Enable Post Info Comments', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer'),
					'yes' => esc_html__( 'Yes', 'wilmer')
				),
				'default' => 'no'
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();


		
		$queryArray             = $this->generateBlogQueryArray( $params );
		$query_result           = new \WP_Query( $queryArray );
		$params['query_result'] = $query_result;
		
		$params['slider_type']    = ! empty( $params['slider_type'] ) ? $params['slider_type'] : 'slider';
		$params['slider_classes'] = $this->getSliderClasses( $params );
		$params['slider_data']    = $this->getSliderData( $params );
		
		ob_start();
		
		wilmer_mikado_get_module_template_part( 'shortcodes/blog-slider/holder', 'blog', '', $params );
		
		$html = ob_get_contents();
		
		ob_end_clean();
		
		echo wilmer_mikado_get_module_part($html);
	}

	public function generateBlogQueryArray( $params ) {
		$queryArray = array(
			'post_status'    => 'publish',
			'post_type'      => 'post',
			'orderby'        => $params['orderby'],
			'order'          => $params['order'],
			'posts_per_page' => $params['number_of_posts'],
			'post__not_in'   => get_option( 'sticky_posts' )
		);
		
		if ( ! empty( $params['category'] ) ) {
			$queryArray['category_name'] = $params['category'];
		}
		
		return $queryArray;
	}

	public function getSliderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = 'mkdf-bs-' . $params['slider_type'];
		
		return implode( ' ', $holderClasses );
	}

	private function getSliderData( $params ) {
		$type        = $params['slider_type'];
		$slider_data = array();
		
		if($type == 'carousel') {
			$slider_data['data-number-of-items']   = '2';
			$slider_data['data-slider-margin']     = '80';
			$slider_data['data-slider-padding']    = 'yes';
			$slider_data['data-enable-navigation'] = 'no';
		} else if ($type == 'carousel-centered') {
			$slider_data['data-number-of-items']   = '2';
			$slider_data['data-slider-margin']     = '30';
			$slider_data['data-enable-center']     = 'yes';
			$slider_data['data-enable-navigation'] = 'yes';
			$slider_data['data-enable-pagination'] = 'yes';
		} else {
			$slider_data['data-number-of-items']   = '1';
			$slider_data['data-enable-pagination'] = 'yes';
		}
		
		return $slider_data;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register( new WilmerMikadoElementorBlogSlider() );