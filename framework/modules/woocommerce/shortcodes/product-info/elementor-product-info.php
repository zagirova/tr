<?php
class WilmerMikadoElementorProductInfo extends \Elementor\Widget_Base {

	public function get_name() {
		return 'mkdf_product_info'; 
	}

	public function get_title() {
		return esc_html__( 'Product Info', 'wilmer' );
	}

	public function get_icon() {
		return 'wilmer-elementor-custom-icon wilmer-elementor-product-info';
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
			'product_id',
			[
				'label'     => esc_html__( 'Selected Product', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::TEXT,
				'description' => esc_html__( 'If you left this field empty then product ID will be of the current page', 'wilmer' )
			]
		);

		$this->add_control(
			'product_info_type',
			[
				'label'     => esc_html__( 'Product Info Type', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'title' => esc_html__( 'Title', 'wilmer'),
					'featured_image' => esc_html__( 'Featured Image', 'wilmer'),
					'category' => esc_html__( 'Category', 'wilmer'),
					'excerpt' => esc_html__( 'Excerpt', 'wilmer'),
					'price' => esc_html__( 'Price', 'wilmer'),
					'rating' => esc_html__( 'Rating', 'wilmer'),
					'add_to_cart' => esc_html__( 'Add To Cart', 'wilmer'),
					'tag' => esc_html__( 'Tag', 'wilmer'),
					'author' => esc_html__( 'Author', 'wilmer'),
					'date' => esc_html__( 'Date', 'wilmer')
				),
				'default' => 'title'
			]
		);

		$this->add_control(
			'featured_image_size',
			[
				'label'     => esc_html__( 'Featured Image Proportions', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer'),
					'full' => esc_html__( 'Original', 'wilmer'),
					'wilmer_mikado_image_square' => esc_html__( 'Square', 'wilmer'),
					'wilmer_mikado_image_landscape' => esc_html__( 'Landscape', 'wilmer'),
					'wilmer_mikado_image_portrait' => esc_html__( 'Portrait', 'wilmer'),
					'medium' => esc_html__( 'Medium', 'wilmer'),
					'large' => esc_html__( 'Large', 'wilmer'),
					'woocommerce_single' => esc_html__( 'Shop Single', 'wilmer'),
					'woocommerce_thumbnail' => esc_html__( 'Shop Thumbnail', 'wilmer')
				),
				'default' => 'full',
				'condition' => [
					'product_info_type' => array( 'featured_image' )
				]
			]
		);

		$this->add_control(
			'add_to_cart_skin',
			[
				'label'     => esc_html__( 'Add To Cart Skin', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer'),
					'white' => esc_html__( 'White', 'wilmer'),
					'dark' => esc_html__( 'Dark', 'wilmer')
				),
				'default' => '',
				'condition' => [
					'product_info_type' => array( 'add_to_cart' )
				]
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
			'product_info_color',
			[
				'label'     => esc_html__( 'Product Info Color', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::COLOR,
				'condition' => [
					'product_info_type' => array( 'title', 'category', 'excerpt', 'price', 'rating', 'tag', 'author', 'date' )
				]
			]
		);

		$this->add_control(
			'title_tag',
			[
				'label'     => esc_html__( 'Title Tag', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Set title tag for product title element', 'wilmer' ),
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer'),
					'h1' => esc_html__( 'h1', 'wilmer'),
					'h2' => esc_html__( 'h2', 'wilmer'),
					'h3' => esc_html__( 'h3', 'wilmer'),
					'h4' => esc_html__( 'h4', 'wilmer'),
					'h5' => esc_html__( 'h5', 'wilmer'),
					'h6' => esc_html__( 'h6', 'wilmer'),
					'p' => esc_html__( 'p', 'wilmer')
				),
				'default' => 'h2',
				'condition' => [
					'product_info_type' => array( 'title' )
				]
			]
		);

		$this->add_control(
			'category_tag',
			[
				'label'     => esc_html__( 'Category Tag', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'description' => esc_html__( 'Set category tag for product category element', 'wilmer' ),
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
					'product_info_type' => array( 'category' )
				]
			]
		);

		$this->add_control(
			'add_to_cart_size',
			[
				'label'     => esc_html__( 'Add To Cart Size', 'wilmer' ),
				'type'      => \Elementor\Controls_Manager::SELECT,
				'options' => array(
					'' => esc_html__( 'Default', 'wilmer'),
					'small' => esc_html__( 'Small', 'wilmer'),
					'medium' => esc_html__( 'Medium', 'wilmer'),
					'large' => esc_html__( 'Large', 'wilmer')
				),
				'default' => '',
				'condition' => [
					'product_info_type' => array( 'wilmer' )
				]
			]
		);


		$this->end_controls_section();
	}
	public function render() {

		$params = $this->get_settings_for_display();

	    $params['product_id'] = !empty($params['product_id']) ? $params['product_id'] : get_the_ID();
	    $params['product_info_style'] = $this->getProductInfoStyle($params);
		    
		$html = '';
			$html .= '<div class="mkdf-product-info">';

	            switch ($params['product_info_type']) {
		            case 'title':
			            $html .= $this->getItemTitleHtml($params);
			            break;
		            case 'featured_image':
			            $html .= $this->getItemFeaturedImageHtml($params);
			            break;
		            case 'category':
			            $html .= $this->getItemCategoryHtml($params);
			            break;
		            case 'excerpt':
			            $html .= $this->getItemExcerptHtml($params);
			            break;
		            case 'price':
			            $html .= $this->getItemPriceHtml($params);
			            break;
		            case 'rating':
			            $html .= $this->getItemRatingHtml($params);
			            break;
		            case 'add_to_cart':
			            $html .= $this->getItemAddToCartHtml($params);
			            break;
		            case 'tag':
			            $html .= $this->getItemTagHtml($params);
			            break;
		            case 'author':
			            $html .= $this->getItemAuthorHtml($params);
			            break;
		            case 'date':
			            $html .= $this->getItemDateHtml($params);
			            break;
		            default:
			            $html .= $this->getItemTitleHtml($params);
			            break;
	            }

			$html .= '</div>';

        echo wilmer_mikado_get_module_part( $html );
	}

	private function getProductInfoStyle( $params ) {
		$styles = array();
		
		if ( ! empty( $params['product_info_color'] ) ) {
			$styles[] = 'color: ' . $params['product_info_color'];
		}
		
		return $styles;
	}

	public function getItemTitleHtml( $params ) {
		$html               = '';
		$product_id         = $params['product_id'];
		$title              = get_the_title( $product_id );
		$title_tag          = $params['title_tag'];
		$product_info_style = $params['product_info_style'];
		
		if ( ! empty( $title ) ) {
			$html = '<' . wilmer_mikado_escape_title_tag( $title_tag ) . ' itemprop="name" class="mkdf-pi-title entry-title" ' . wilmer_mikado_get_inline_style( $product_info_style ) . '>';
				$html .= '<a itemprop="url" href="' . esc_url( get_the_permalink( $product_id ) ) . '">' . esc_html( $title ) . '</a>';
			$html .= '</' . wilmer_mikado_escape_title_tag( $title_tag ) . '>';
		}
		
		return $html;
	}

	public function getItemFeaturedImageHtml( $params ) {
		$html                = '';
		$product_id          = $params['product_id'];
		$featured_image_size = ! empty( $params['featured_image_size'] ) ? $params['featured_image_size'] : 'full';
		$featured_image      = get_the_post_thumbnail( $product_id, $featured_image_size );
		
		if ( ! empty( $featured_image ) ) {
			$html = '<a itemprop="url" class="mkdf-pi-image" href="' . esc_url( get_the_permalink( $product_id ) ) . '">' . $featured_image . '</a>';
		}
		
		return $html;
	}

	public function getItemCategoryHtml( $params ) {
		$html               = '';
		$product_id         = $params['product_id'];
		$categories         = wp_get_post_terms( $product_id, 'product_cat' );
		$product_info_style = $params['product_info_style'];
		
		if ( ! empty( $categories ) ) {
			$html .= '<div class="mkdf-pi-category">';
				foreach ( $categories as $cat ) {
					if ( ! empty( $params['category_tag'] ) ) {
						$html .= '<' . wilmer_mikado_escape_title_tag( $params['category_tag'] ) . ' ' . wilmer_mikado_get_inline_style( $product_info_style ) . '>';
						$html .= '<a itemprop="url" class="mkdf-pi-category-item" href="' . esc_url( get_term_link( $cat->term_id ) ) . '">' . esc_html( $cat->name ) . '</a>';
						$html .= '</' . wilmer_mikado_escape_title_tag( $params['category_tag'] ) . '>';
					} else {
						$html .= '<a itemprop="url" class="mkdf-pi-category-item" href="' . esc_url( get_term_link( $cat->term_id ) ) . '" ' . wilmer_mikado_get_inline_style( $product_info_style ) . '>' . esc_html( $cat->name ) . '</a>';
					}
				}
			$html .= '</div>';
		}

		return $html;
	}

	public function getItemExcerptHtml( $params ) {
		$html               = '';
		$product_id         = $params['product_id'];
		$excerpt            = get_the_excerpt( $product_id );
		$product_info_style = $params['product_info_style'];
		
		if ( ! empty( $excerpt ) ) {
			$html = '<div class="mkdf-pi-excerpt"><p itemprop="description" class="mkdf-pi-excerpt-item" ' . wilmer_mikado_get_inline_style( $product_info_style ) . '>' . esc_html( $excerpt ) . '</p></div>';
		}
		
		return $html;
	}

	public function getItemPriceHtml( $params ) {
		$html               = '';
		$product_id         = $params['product_id'];
		$product            = wc_get_product( $product_id );
		$product_info_style = $params['product_info_style'];
		
		if ( $price_html = $product->get_price_html() ) {
			$html = '<div class="mkdf-pi-price" ' . wilmer_mikado_get_inline_style( $product_info_style ) . '>' . $price_html . '</div>';
		}
		
		return $html;
	}

	public function getItemRatingHtml( $params ) {
		$html               = '';
		$product_id         = $params['product_id'];
		$product            = wc_get_product( $product_id );
		$product_info_style = $params['product_info_style'];
		
		if ( get_option( 'woocommerce_enable_review_rating' ) !== 'no' ) {
			$average = $product->get_average_rating();
			
			$html = '<div class="mkdf-pi-rating" title="' . sprintf( esc_attr__( "Rated %s out of 5", "wilmer" ), $average ) . '" ' . wilmer_mikado_get_inline_style( $product_info_style ) . '><span style="width:' . ( ( $average / 5 ) * 100 ) . '%"></span></div>';
		}
		
		return $html;
	}

	public function getItemAddToCartHtml( $params ) {
		$product_id = $params['product_id'];
		$product    = wc_get_product( $product_id );
		
		$button_classes = 'button add_to_cart_button ajax_add_to_cart mkdf-btn mkdf-btn-solid';
		
		if ( ! $product->is_in_stock() ) {
			$button_classes = 'button ajax_add_to_cart mkdf-btn mkdf-btn-solid mkdf-out-of-stock';
		} else if ( $product->get_type() === 'variable' ) {
			$button_classes = 'button product_type_variable add_to_cart_button mkdf-btn mkdf-btn-solid';
		} else if ( $product->get_type() === 'external' ) {
			$button_classes = 'button product_type_external mkdf-btn mkdf-btn-solid';
		}
		
		if ( ! empty( $params['add_to_cart_skin'] ) ) {
			$button_classes .= ' mkdf-' . $params['add_to_cart_skin'] . '-skin mkdf-btn-custom-hover-color mkdf-btn-custom-hover-bg mkdf-btn-custom-border-hover';
		}
		
		if ( ! empty( $params['add_to_cart_size'] ) ) {
			$button_classes .= ' mkdf-btn-' . $params['add_to_cart_size'];
		}
		
		$html = '<div class="mkdf-pi-add-to-cart">';
		$html .= apply_filters( 'wilmer_mikado_filter_product_info_add_to_cart_link',
			sprintf( '<a rel="nofollow" href="%s" data-quantity="%s" data-product_id="%s" data-product_sku="%s" class="%s">%s</a>',
				esc_url( $product->add_to_cart_url() ),
				esc_attr( isset( $quantity ) ? $quantity : 1 ),
				esc_attr( $product_id ),
				esc_attr( $product->get_sku() ),
				esc_attr( $button_classes ),
				esc_html( $product->add_to_cart_text() )
			),
			$product );
		$html .= '</div>';
		
		return $html;
	}

	public function getItemTagHtml( $params ) {
		$html               = '';
		$product_id         = $params['product_id'];
		$tags               = wp_get_post_terms( $product_id, 'product_tag' );
		$product_info_style = $params['product_info_style'];
		
		if ( ! empty( $tags ) ) {
			$html = '<div class="mkdf-pi-tag">';
				foreach ( $tags as $tag ) {
					$html .= '<a itemprop="url" class="mkdf-pi-tag-item" href="' . esc_url( get_term_link( $tag->term_id ) ) . '" ' . wilmer_mikado_get_inline_style( $product_info_style ) . '>' . esc_html( $tag->name ) . '</a>';
				}
			$html .= '</div>';
		}
		
		return $html;
	}

	public function getItemAuthorHtml( $params ) {
		$html               = '';
		$product_id         = $params['product_id'];
		$product_post       = get_post( $product_id );
		$autor_id           = $product_post->post_author;
		$author             = get_the_author_meta( 'display_name', $autor_id );
		$product_info_style = $params['product_info_style'];
		
		if ( ! empty( $author ) ) {
			$html = '<div class="mkdf-pi-author" ' . wilmer_mikado_get_inline_style( $product_info_style ) . '>' . esc_html( $author ) . '</div>';
		}
		
		return $html;
	}

	public function getItemDateHtml( $params ) {
		$html               = '';
		$product_id         = $params['product_id'];
		$date               = get_the_time( get_option( 'date_format' ), $product_id );
		$product_info_style = $params['product_info_style'];
		
		if ( ! empty( $date ) ) {
			$html = '<div class="mkdf-pi-date" ' . wilmer_mikado_get_inline_style( $product_info_style ) . '>' . esc_html( $date ) . '</div>';
		}
		
		return $html;
	}

}
\Elementor\Plugin::instance()->widgets_manager->register( new WilmerMikadoElementorProductInfo() );