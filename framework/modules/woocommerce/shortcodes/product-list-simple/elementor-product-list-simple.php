<?php
class WilmerMikadoElementorProductListSimple extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_product_list_simple'; 
	}

	public function get_title() {
		return esc_html__( 'Product List - Simple', 'wilmer' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-product-list-simple';
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
					'sale' => esc_html__( 'Sale', 'wilmer'),
					'best-sellers' => esc_html__( 'Best Sellers', 'wilmer'),
					'featured' => esc_html__( 'Featured', 'wilmer')
				),
				'default' => 'sale'
			]
		);

		$this->add_control(
			'number',
			[
				'label'     => esc_html__( 'Number of Products', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Number of products to show (default value is 4)', 'wilmer' ),
                'default' => '4'
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
				'default' => 'title',
				'condition' => [
					'type' => array( 'sale', 'featured' )
				]
			]
		);

		$this->add_control(
			'sort_order',
			[
				'label'     => esc_html__( 'Order', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'ASC' => esc_html__( 'ASC', 'wilmer'),
					'DESC' => esc_html__( 'DESC', 'wilmer')
				),
				'default' => 'ASC',
				'condition' => [
					'type' => array( 'sale', 'featured' )
				]
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
				'default' => 'h5',
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
				'default' => 'uppercase',
				'condition' => [
					'display_title' => array( 'yes' )
				]
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


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();
		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['class_name']     = 'pls';
		
		$params['title_styles'] = $this->getTitleStyles( $params );
		
		$queryArray             = $this->generateProductQueryArray( $params );
		$query_result           = new \WP_Query( $queryArray );
		$params['query_result'] = $query_result;

        echo wilmer_mikado_get_woo_shortcode_module_template_part( 'templates/product-list-template', 'product-list-simple', '', $params );

	}

	private function getHolderClasses( $params ) {
		$holderClasses   = '';
		$productListType = $params['type'];
		
		switch ( $productListType ) {
			case 'sale':
				$holderClasses = 'mkdf-pls-sale';
				break;
			case 'best-sellers':
				$holderClasses = 'mkdf-pls-best-sellers';
				break;
			case 'featured':
				$holderClasses = 'mkdf-pls-featured';
				break;
			default:
				$holderClasses = 'mkdf-pls-sale';
				break;
		}
		
		return $holderClasses;
	}

	private function generateProductQueryArray( $params ) {
		switch ( $params['type'] ) {
			case 'sale':
				$args = array(
					'post_status'    => 'publish',
					'post_type'      => 'product',
					'posts_per_page' => $params['number'],
					'orderby'        => $params['orderby'],
					'order'          => $params['sort_order'],
					'no_found_rows'  => 1,
					'post__in'       => array_merge( array( 0 ), wc_get_product_ids_on_sale() )
				);
				break;
			case 'best-sellers':
				$args = array(
					'post_status'         => 'publish',
					'post_type'           => 'product',
					'ignore_sticky_posts' => 1,
					'posts_per_page'      => $params['number'],
					'meta_key'            => 'total_sales',
					'orderby'             => 'meta_value_num'
				);
				break;
			case 'featured':
				$args = array(
					'post_status'    => 'publish',
					'post_type'      => 'product',
					'posts_per_page' => $params['number'],
					'orderby'        => $params['orderby'],
					'order'          => $params['sort_order'],
					'tax_query' => array(
						array(
							'taxonomy' => 'product_visibility',
							'field'    => 'name',
							'terms'    => 'featured',
						),
					),

				);
				break;
		}
		
		return $args;
	}

	private function getTitleStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['title_transform'] ) ) {
			$styles[] = 'text-transform: ' . $params['title_transform'];
		}
		
		return implode( ';', $styles );
	}

}
\Elementor\Plugin::instance()->widgets_manager->register( new WilmerMikadoElementorProductListSimple() );