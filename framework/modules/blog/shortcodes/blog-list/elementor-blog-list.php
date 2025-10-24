<?php
class WilmerMikadoElementorBlogList extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_blog_list'; 
	}

	public function get_title() {
		return esc_html__( 'Blog List', 'wilmer' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-blog-list';
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
					'boxed' => esc_html__( 'Boxed', 'wilmer'),
					'masonry' => esc_html__( 'Masonry', 'wilmer'),
					'simple' => esc_html__( 'Simple', 'wilmer'),
					'minimal' => esc_html__( 'Minimal', 'wilmer')
				),
				'default' => 'standard'
			]
		);

		$this->add_control(
			'skin',
			[
				'label'     => esc_html__( 'Type', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'default' => esc_html__( 'Default', 'wilmer'),
					'light' => esc_html__( 'Light', 'wilmer')
				),
				'default' => 'default',
				'condition' => [
					'type' => array( 'standard' )
				]
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
			'number_of_columns',
			[
				'label'     => esc_html__( 'Number of Columns', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer'),
					'one' => esc_html__( 'One', 'wilmer'),
					'two' => esc_html__( 'Two', 'wilmer'),
					'three' => esc_html__( 'Three', 'wilmer'),
					'four' => esc_html__( 'Four', 'wilmer'),
					'five' => esc_html__( 'Five', 'wilmer'),
					'six' => esc_html__( 'Six', 'wilmer')
				),
				'default' => 'four',
				'condition' => [
					'type' => array( 'standard', 'boxed', 'masonry' )
				]
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
					'type' => array( 'standard', 'boxed', 'masonry' )
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
				'default' => 'full',
				'condition' => [
					'type' => array( 'standard', 'boxed', 'masonry' )
				]
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
				'default' => 'h4'
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
			'excerpt_length',
			[
				'label'     => esc_html__( 'Text Length', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'Number of words', 'wilmer' ),
				'condition' => [
					'type' => array( 'standard', 'boxed', 'masonry', 'simple' )
				]
			]
		);

		$this->add_control(
			'post_info_image',
			[
				'label'     => esc_html__( 'Enable Post Info Image', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes',
				'condition' => [
					'type' => array( 'standard', 'boxed', 'masonry' )
				]
			]
		);

		$this->add_control(
			'post_info_section',
			[
				'label'     => esc_html__( 'Enable Post Info Section', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'yes' => esc_html__( 'Yes', 'wilmer'),
					'no' => esc_html__( 'No', 'wilmer')
				),
				'default' => 'yes',
				'condition' => [
					'type' => array( 'standard', 'boxed', 'masonry' )
				]
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
				'default' => 'yes',
				'condition' => [
					'post_info_section' => array( 'yes' )
				]
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
				'default' => 'yes',
				'condition' => [
					'post_info_section' => array( 'yes' )
				]
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
				'default' => 'yes',
				'condition' => [
					'post_info_section' => array( 'yes' )
				]
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
				'default' => 'no',
				'condition' => [
					'post_info_section' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'post_info_like',
			[
				'label'     => esc_html__( 'Enable Post Info Like', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer'),
					'yes' => esc_html__( 'Yes', 'wilmer')
				),
				'default' => 'no',
				'condition' => [
					'post_info_section' => array( 'yes' )
				]
			]
		);

		$this->add_control(
			'post_info_share',
			[
				'label'     => esc_html__( 'Enable Post Info Share', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no' => esc_html__( 'No', 'wilmer'),
					'yes' => esc_html__( 'Yes', 'wilmer')
				),
				'default' => 'no',
				'condition' => [
					'post_info_section' => array( 'yes' )
				]
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'additional_features',
			[
				'label' => esc_html__( 'Additional Features', 'wilmer' ),
				'tab'   => \Elementor\Controls_Manager::TAB_CONTENT,
			]
		);
		$this->add_control(
			'pagination_type',
			[
				'label'     => esc_html__( 'Pagination Type', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'no-pagination' => esc_html__( 'None', 'wilmer'),
					'standard-shortcodes' => esc_html__( 'Standard', 'wilmer'),
					'load-more' => esc_html__( 'Load More', 'wilmer'),
					'infinite-scroll' => esc_html__( 'Infinite Scroll', 'wilmer')
				),
				'default' => 'no-pagination'
			]
		);


		$this->end_controls_section();
	}
	public function render() {
        $default_atts = array(
            'type'                  => 'standard',
            'skin'                  => '',
            'number_of_posts'       => '-1',
            'number_of_columns'     => 'four',
            'space_between_items'   => 'normal',
            'category'              => '',
            'orderby'               => 'title',
            'order'                 => 'ASC',
            'image_size'            => 'full',
            'title_tag'             => 'h4',
            'title_transform'       => '',
            'excerpt_length'        => '40',
            'post_info_section'     => 'yes',
            'post_info_image'       => 'yes',
            'post_info_author'      => 'yes',
            'post_info_date'        => 'yes',
            'post_info_category'    => 'yes',
            'post_info_comments'    => 'no',
            'post_info_like'        => 'no',
            'post_info_share'       => 'no',
            'pagination_type'       => 'no-pagination'
        );
        $params       = shortcode_atts( $default_atts, $this->get_settings_for_display() );
		
		$queryArray             = $this->generateQueryArray( $params );
		$query_result           = new \WP_Query( $queryArray );
		$params['query_result'] = $query_result;

        $params['holder_data']    = $this->getHolderData( $params );
        $params['holder_classes'] = $this->getHolderClasses( $params, $default_atts );
        $params['module']         = 'list';
		
		$params['max_num_pages'] = $query_result->max_num_pages;
		$params['paged']         = isset( $query_result->query['paged'] ) ? $query_result->query['paged'] : 1;
		
		$params['this_object'] = $this;
		
		ob_start();
		
		wilmer_mikado_get_module_template_part( 'shortcodes/blog-list/holder', 'blog', $params['type'], $params );
		
		$html = ob_get_contents();
		
		ob_end_clean();
		
		echo wilmer_mikado_get_module_part($html);
	}

    public function getHolderClasses( $params, $default_atts ) {
        $holderClasses = array();

        $holderClasses[] = ! empty( $params['type'] ) ? 'mkdf-bl-' . $params['type'] : 'mkdf-bl-' . $default_atts['type'];
        $holderClasses[] = ! empty( $params['number_of_columns'] ) ? 'mkdf-' . $params['number_of_columns'] . '-columns' : 'mkdf-' . $default_atts['number_of_columns'] . '-columns';
        $holderClasses[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : 'mkdf-' . $default_atts['space_between_items'] . '-space';
        $holderClasses[] = ! empty( $params['pagination_type'] ) ? 'mkdf-bl-pag-' . $params['pagination_type'] : 'mkdf-bl-pag-' . $default_atts['pagination_type'];
        $holderClasses[] =  'mkdf-bl-skin-' . $params['skin'];

        return implode( ' ', $holderClasses );
    }

	public function getHolderData( $params ) {
		$dataString = '';

		if ( get_query_var( 'paged' ) ) {
			$paged = get_query_var( 'paged' );
		} elseif ( get_query_var( 'page' ) ) {
			$paged = get_query_var( 'page' );
		} else {
			$paged = 1;
		}
		
		$query_result = $params['query_result'];
		
		$params['max_num_pages'] = $query_result->max_num_pages;
		
		if ( ! empty( $paged ) ) {
			$params['next-page'] = $paged + 1;
		}
		
		foreach ( $params as $key => $value ) {
			if ( $key !== 'query_result' && $value !== '' ) {
				$new_key = str_replace( '_', '-', $key );
				
				$dataString .= ' data-' . $new_key . '=' . esc_attr( str_replace( ' ', '', $value ) );
			}
		}
		
		return $dataString;
	}

	public function generateQueryArray( $params ) {
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
		
		if ( ! empty( $params['next_page'] ) ) {
			$queryArray['paged'] = $params['next_page'];
		} else {
			$query_array['paged'] = 1;
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

}
\Elementor\Plugin::instance()->widgets_manager->register( new WilmerMikadoElementorBlogList() );