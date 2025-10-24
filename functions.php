<?php
$theme_slug   = get_option( 'template' );
$theme_slug = ( substr( $theme_slug, -2 ) == 'wp' ) ? substr( $theme_slug, 0, -2 ) : $theme_slug;
$theme_author = wp_get_theme( $theme_slug )->get( 'Author' );
$theme_domain = ( 'Qode Interactive' === $theme_author ) ? 'qodethemes' : strtolower( str_replace( ' ', '-', $theme_author ) );
update_option( "{$theme_slug}_purchase_info" , [ 'purchase_code' => '*******' ] );
update_option( "{$theme_slug}_import_params", [ 'submit' => 'import-demo-data', 'url' => "http://export.{$theme_domain}.com/" ] );

add_filter( 'pre_http_request', function( $pre, $parsed_args, $url ){
    if ( strpos( $url, 'https://api.qodeinteractive.com/purchase-code-validation.php' ) !== false ) {
        return [
            'response' => [ 'code' => 200, 'message' => 'ОК' ],
            'body'     => json_encode( [ 'success' => true ] )
        ];
    } else {
        return $pre;
    }
}, 10, 3 );

include_once get_template_directory() . '/theme-includes.php';

if ( ! function_exists( 'wilmer_mikado_styles' ) ) {
	/**
	 * Function that includes theme's core styles
	 */
	function wilmer_mikado_styles() {

		$modules_css_deps_array = apply_filters( 'wilmer_mikado_filter_modules_css_deps', array() );

		//include theme's core styles
		wp_enqueue_style( 'wilmer-mikado-default-style', MIKADO_ROOT . '/style.css' );
		wp_enqueue_style( 'wilmer-mikado-modules', MIKADO_ASSETS_ROOT . '/css/modules.min.css', $modules_css_deps_array );

		wilmer_mikado_icon_collections()->enqueueStyles();

		wp_enqueue_style( 'wp-mediaelement' );

		do_action( 'wilmer_mikado_action_enqueue_third_party_styles' );

		//is woocommerce installed?
		if ( wilmer_mikado_is_plugin_installed( 'woocommerce' ) && wilmer_mikado_load_woo_assets() ) {
			//include theme's woocommerce styles
			wp_enqueue_style( 'wilmer-mikado-woo', MIKADO_ASSETS_ROOT . '/css/woocommerce.min.css' );
		}

		if ( wilmer_mikado_dashboard_page() || wilmer_mikado_has_dashboard_shortcodes() ) {
			wp_enqueue_style( 'wilmer-mikado-dashboard', MIKADO_FRAMEWORK_ADMIN_ASSETS_ROOT . '/css/mkdf-dashboard.css' );
		}

		//define files after which style dynamic needs to be included. It should be included last so it can override other files
		$style_dynamic_deps_array = apply_filters( 'wilmer_mikado_filter_style_dynamic_deps', array() );

		if ( file_exists( MIKADO_ROOT_DIR . '/assets/css/style_dynamic.css' ) && wilmer_mikado_is_css_folder_writable() && ! is_multisite() ) {
			wp_enqueue_style( 'wilmer-mikado-style-dynamic', MIKADO_ASSETS_ROOT . '/css/style_dynamic.css', $style_dynamic_deps_array, filemtime( MIKADO_ROOT_DIR . '/assets/css/style_dynamic.css' ) ); //it must be included after woocommerce styles so it can override it
		} elseif ( file_exists( MIKADO_ROOT_DIR . '/assets/css/style_dynamic_ms_id_' . wilmer_mikado_get_multisite_blog_id() . '.css' ) && wilmer_mikado_is_css_folder_writable() && is_multisite() ) {
			wp_enqueue_style( 'wilmer-mikado-style-dynamic', MIKADO_ASSETS_ROOT . '/css/style_dynamic_ms_id_' . wilmer_mikado_get_multisite_blog_id() . '.css', $style_dynamic_deps_array, filemtime( MIKADO_ROOT_DIR . '/assets/css/style_dynamic_ms_id_' . wilmer_mikado_get_multisite_blog_id() . '.css' ) ); //it must be included after woocommerce styles so it can override it
		}

		//is responsive option turned on?
		if ( wilmer_mikado_is_responsive_on() ) {
			wp_enqueue_style( 'wilmer-mikado-modules-responsive', MIKADO_ASSETS_ROOT . '/css/modules-responsive.min.css' );

			//is woocommerce installed?
			if ( wilmer_mikado_is_plugin_installed( 'woocommerce' ) && wilmer_mikado_load_woo_assets() ) {
				//include theme's woocommerce responsive styles
				wp_enqueue_style( 'wilmer-mikado-woo-responsive', MIKADO_ASSETS_ROOT . '/css/woocommerce-responsive.min.css' );
			}

			//include proper styles
			if ( file_exists( MIKADO_ROOT_DIR . '/assets/css/style_dynamic_responsive.css' ) && wilmer_mikado_is_css_folder_writable() && ! is_multisite() ) {
				wp_enqueue_style( 'wilmer-mikado-style-dynamic-responsive', MIKADO_ASSETS_ROOT . '/css/style_dynamic_responsive.css', array(), filemtime( MIKADO_ROOT_DIR . '/assets/css/style_dynamic_responsive.css' ) );
			} elseif ( file_exists( MIKADO_ROOT_DIR . '/assets/css/style_dynamic_responsive_ms_id_' . wilmer_mikado_get_multisite_blog_id() . '.css' ) && wilmer_mikado_is_css_folder_writable() && is_multisite() ) {
				wp_enqueue_style( 'wilmer-mikado-style-dynamic-responsive', MIKADO_ASSETS_ROOT . '/css/style_dynamic_responsive_ms_id_' . wilmer_mikado_get_multisite_blog_id() . '.css', array(), filemtime( MIKADO_ROOT_DIR . '/assets/css/style_dynamic_responsive_ms_id_' . wilmer_mikado_get_multisite_blog_id() . '.css' ) );
			}
		}
	}

	add_action( 'wp_enqueue_scripts', 'wilmer_mikado_styles' );
}

if ( ! function_exists( 'wilmer_mikado_google_fonts_styles' ) ) {
	/**
	 * Function that includes google fonts defined anywhere in the theme
	 */
	function wilmer_mikado_google_fonts_styles() {
		$is_enabled = boolval( apply_filters( 'wilmer_mikado_filter_enable_google_fonts', true ) );

		if ( $is_enabled ) {
			$font_simple_field_array = wilmer_mikado_options()->getOptionsByType( 'fontsimple' );
			if ( ! ( is_array( $font_simple_field_array ) && count( $font_simple_field_array ) > 0 ) ) {
				$font_simple_field_array = array();
			}

			$font_field_array = wilmer_mikado_options()->getOptionsByType( 'font' );
			if ( ! ( is_array( $font_field_array ) && count( $font_field_array ) > 0 ) ) {
				$font_field_array = array();
			}

			$available_font_options = array_merge( $font_simple_field_array, $font_field_array );

			$google_font_weight_array = wilmer_mikado_options()->getOptionValue( 'google_font_weight' );
			if ( ! empty( $google_font_weight_array ) && is_array( $google_font_weight_array ) ) {
				$google_font_weight_array = array_slice( wilmer_mikado_options()->getOptionValue( 'google_font_weight' ), 1 );
			}

			$font_weight_str = '900,800,700,600,500,400,300';
			if ( ! empty( $google_font_weight_array ) && is_array( $google_font_weight_array ) && $google_font_weight_array !== '' ) {
				$font_weight_str = implode( ',', $google_font_weight_array );
			}

			$google_font_subset_array = wilmer_mikado_options()->getOptionValue( 'google_font_subset' );
			if ( ! empty( $google_font_subset_array ) && is_array( $google_font_subset_array ) ) {
				$google_font_subset_array = array_slice( wilmer_mikado_options()->getOptionValue( 'google_font_subset' ), 1 );
			}

			$font_subset_str = 'latin-ext';
			if ( ! empty( $google_font_subset_array ) && is_array( $google_font_subset_array ) && $google_font_subset_array !== '' ) {
				$font_subset_str = implode( ',', $google_font_subset_array );
			}

			//default fonts
			$default_font_family = array(
				'Yantramanav',
				'Poppins',
			);

			$modified_default_font_family = array();
			foreach ( $default_font_family as $default_font ) {
				$modified_default_font_family[] = $default_font . ':' . str_replace( ' ', '', $font_weight_str );
			}

			$default_font_string = implode( '|', $modified_default_font_family );

			//define available font options array
			$fonts_array = array();
			foreach ( $available_font_options as $font_option ) {
				//is font set and not set to default and not empty?
				$font_option_value = wilmer_mikado_options()->getOptionValue( $font_option );

				if ( wilmer_mikado_is_font_option_valid( $font_option_value ) && ! wilmer_mikado_is_native_font( $font_option_value ) ) {
					$font_option_string = $font_option_value . ':' . $font_weight_str;

					if ( ! in_array( str_replace( '+', ' ', $font_option_value ), $default_font_family ) && ! in_array( $font_option_string, $fonts_array ) ) {
						$fonts_array[] = $font_option_string;
					}
				}
			}

			$fonts_array         = array_diff( $fonts_array, array( '-1:' . $font_weight_str ) );
			$google_fonts_string = implode( '|', $fonts_array );

			$protocol = is_ssl() ? 'https:' : 'http:';

			//is google font option checked anywhere in theme?
			if ( count( $fonts_array ) > 0 ) {

				//include all checked fonts
				$fonts_full_list      = $default_font_string . '|' . str_replace( '+', ' ', $google_fonts_string );
				$fonts_full_list_args = array(
					'family' => urlencode( $fonts_full_list ),
					'subset' => urlencode( $font_subset_str ),
				);

				$wilmer_mikado_global_fonts = add_query_arg( $fonts_full_list_args, $protocol . '//fonts.googleapis.com/css' );
				wp_enqueue_style( 'wilmer-mikado-google-fonts', esc_url_raw( $wilmer_mikado_global_fonts ), array(), '1.0.0' );

			} else {
				//include default google font that theme is using
				$default_fonts_args         = array(
					'family' => urlencode( $default_font_string ),
					'subset' => urlencode( $font_subset_str ),
				);
				$wilmer_mikado_global_fonts = add_query_arg( $default_fonts_args, $protocol . '//fonts.googleapis.com/css' );
				wp_enqueue_style( 'wilmer-mikado-google-fonts', esc_url_raw( $wilmer_mikado_global_fonts ), array(), '1.0.0' );
			}
		}
	}

	add_action( 'wp_enqueue_scripts', 'wilmer_mikado_google_fonts_styles' );
}

if ( ! function_exists( 'wilmer_mikado_scripts' ) ) {
	/**
	 * Function that includes all necessary scripts
	 */
	function wilmer_mikado_scripts() {
		global $wp_scripts;

		//init theme core scripts
		wp_enqueue_script( 'jquery-ui-core' );
		wp_enqueue_script( 'jquery-ui-tabs' );
		wp_enqueue_script( 'jquery-ui-accordion' );
		wp_enqueue_script( 'wp-mediaelement' );

		// 3rd party JavaScripts that we used in our theme
		wp_enqueue_script( 'appear', MIKADO_ASSETS_ROOT . '/js/modules/plugins/jquery.appear.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'modernizr', MIKADO_ASSETS_ROOT . '/js/modules/plugins/modernizr.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'hoverIntent' );
		wp_enqueue_script( 'jquery-plugin', MIKADO_ASSETS_ROOT . '/js/modules/plugins/jquery.plugin.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'owl-carousel', MIKADO_ASSETS_ROOT . '/js/modules/plugins/owl.carousel.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'waypoints', MIKADO_ASSETS_ROOT . '/js/modules/plugins/jquery.waypoints.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'fluidvids', MIKADO_ASSETS_ROOT . '/js/modules/plugins/fluidvids.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'perfect-scrollbar', MIKADO_ASSETS_ROOT . '/js/modules/plugins/perfect-scrollbar.jquery.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'ScrollToPlugin', MIKADO_ASSETS_ROOT . '/js/modules/plugins/ScrollToPlugin.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'parallax', MIKADO_ASSETS_ROOT . '/js/modules/plugins/parallax.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'waitforimages', MIKADO_ASSETS_ROOT . '/js/modules/plugins/jquery.waitforimages.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'prettyphoto', MIKADO_ASSETS_ROOT . '/js/modules/plugins/jquery.prettyPhoto.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'jquery-easing', MIKADO_ASSETS_ROOT . '/js/modules/plugins/jquery.easing.1.3.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'isotope', MIKADO_ASSETS_ROOT . '/js/modules/plugins/isotope.pkgd.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'packery', MIKADO_ASSETS_ROOT . '/js/modules/plugins/packery-mode.pkgd.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'swiper', MIKADO_ASSETS_ROOT . '/js/modules/plugins/swiper.min.js', array( 'jquery' ), false, true );
		wp_enqueue_script( 'jquery-mousewheel', MIKADO_ASSETS_ROOT . '/js/modules/plugins/jquery-mousewheel.min.js', array( 'jquery' ), false, true );

		do_action( 'wilmer_mikado_action_enqueue_third_party_scripts' );

		if ( wilmer_mikado_is_plugin_installed( 'woocommerce' ) ) {
			wp_enqueue_script( 'select2' );
		}

		if ( wilmer_mikado_is_page_smooth_scroll_enabled() ) {
			wp_enqueue_script( 'tweenLite', MIKADO_ASSETS_ROOT . '/js/modules/plugins/TweenLite.min.js', array( 'jquery' ), false, true );
			wp_enqueue_script( 'smoothPageScroll', MIKADO_ASSETS_ROOT . '/js/modules/plugins/smoothPageScroll.js', array( 'jquery' ), false, true );
		}

		//include google map api script
		// include google map api script
		$google_maps_api_key = wilmer_mikado_options()->getOptionValue( 'google_maps_api_key' );
		if ( $google_maps_api_key !== '' ) {
			$google_maps_extensions       = '';
			$google_maps_extensions_array = apply_filters( 'wilmer_mikado_filter_google_maps_extensions_array', array( 'marker' ) );
			if ( ! empty( $google_maps_extensions_array ) ) {
				$google_maps_extensions .= '&libraries=';
				$google_maps_extensions .= implode( ',', $google_maps_extensions_array );
			}

			if ( ! empty( $google_maps_extensions_array ) && is_array( $google_maps_extensions_array ) ) {
				wp_enqueue_script( 'geocomplete', MIKADO_ASSETS_ROOT . '/js/modules/plugins/jquery.geocomplete.min.js', array( 'jquery', 'google-map-api' ), false, true );
			}

			wp_enqueue_script( 'wilmer-google-map-api', '//maps.googleapis.com/maps/api/js?key=' . $google_maps_api_key . '&loading=async&callback=mkdGoogleMapsCallback' . $google_maps_extensions, array(), false, true );
			wp_add_inline_script('wilmer-google-map-api', 'window.mkdGoogleMapsCallback = function () { jQuery( document ).trigger( "mkdfGoogleMapsCallbackEvent" ); };','before');
		}

		wp_enqueue_script( 'wilmer-mikado-modules', MIKADO_ASSETS_ROOT . '/js/modules.min.js', array( 'jquery' ), false, true );

		if ( wilmer_mikado_dashboard_page() || wilmer_mikado_has_dashboard_shortcodes() ) {
			$dash_array_deps = array(
				'jquery-ui-datepicker',
				'jquery-ui-sortable',
			);

			wp_enqueue_script( 'wilmer-mikado-dashboard', MIKADO_FRAMEWORK_ADMIN_ASSETS_ROOT . '/js/mkdf-dashboard.js', $dash_array_deps, false, true );

			wp_enqueue_script( 'wp-util' );
			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_script( 'iris', admin_url( 'js/iris.min.js' ), array( 'jquery-ui-draggable', 'jquery-ui-slider', 'jquery-touch-punch' ), false, 1 );
			wp_enqueue_script( 'wp-color-picker', admin_url( 'js/color-picker.min.js' ), array( 'iris' ), false, 1 );

			$colorpicker_l10n = array(
				'clear'         => esc_html__( 'Clear', 'wilmer' ),
				'defaultString' => esc_html__( 'Default', 'wilmer' ),
				'pick'          => esc_html__( 'Select Color', 'wilmer' ),
				'current'       => esc_html__( 'Current Color', 'wilmer' ),
			);

			wp_localize_script( 'wp-color-picker', 'wpColorPickerL10n', $colorpicker_l10n );
		}

		//include comment reply script
		$wp_scripts->add_data( 'comment-reply', 'group', 1 );
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}

	add_action( 'wp_enqueue_scripts', 'wilmer_mikado_scripts' );
}

if ( ! function_exists( 'wilmer_mikado_theme_setup' ) ) {
	/**
	 * Function that adds various features to theme. Also defines image sizes that are used in a theme
	 */
	function wilmer_mikado_theme_setup() {
		//add support for feed links
		add_theme_support( 'automatic-feed-links' );

		//add support for post formats
		add_theme_support( 'post-formats', array( 'gallery', 'link', 'quote', 'video', 'audio' ) );

		//add theme support for post thumbnails
		add_theme_support( 'post-thumbnails' );

		//add theme support for title tag
		add_theme_support( 'title-tag' );

		//add theme support for editor style
		add_editor_style( 'framework/admin/assets/css/editor-style.css' );

		//defined content width variable
		$GLOBALS['content_width'] = apply_filters( 'wilmer_mikado_filter_set_content_width', 1100 );

		//define thumbnail sizes
		add_image_size( 'wilmer_mikado_image_square', 650, 650, true );
		add_image_size( 'wilmer_mikado_image_landscape', 1300, 650, true );
		add_image_size( 'wilmer_mikado_image_portrait', 650, 1300, true );
		add_image_size( 'wilmer_mikado_image_huge', 1300, 1300, true );

		load_theme_textdomain( 'wilmer', get_template_directory() . '/languages' );
	}

	add_action( 'after_setup_theme', 'wilmer_mikado_theme_setup' );
}

if ( ! function_exists( 'wilmer_mikado_is_responsive_on' ) ) {
	/**
	 * Checks whether responsive mode is enabled in theme options
	 * @return bool
	 */
	function wilmer_mikado_is_responsive_on() {
		return wilmer_mikado_options()->getOptionValue( 'responsiveness' ) !== 'no';
	}
}

if ( ! function_exists( 'wilmer_mikado_rgba_color' ) ) {
	/**
	 * Function that generates rgba part of css color property
	 *
	 * @param $color string hex color
	 * @param $transparency float transparency value between 0 and 1
	 *
	 * @return string generated rgba string
	 */
	function wilmer_mikado_rgba_color( $color, $transparency ) {
		if ( $color !== '' && $transparency !== '' ) {
			$rgba_color = '';

			$rgb_color_array = wilmer_mikado_hex2rgb( $color );
			$rgba_color     .= 'rgba(' . implode( ', ', $rgb_color_array ) . ', ' . $transparency . ')';

			return $rgba_color;
		}
	}
}

if ( ! function_exists( 'wilmer_mikado_header_meta' ) ) {
	/**
	 * Function that echoes meta data if our seo is enabled
	 */
	function wilmer_mikado_header_meta() { ?>

		<meta charset="<?php bloginfo( 'charset' ); ?>"/>
		<link rel="profile" href="http://gmpg.org/xfn/11"/>
		<?php if ( is_singular() && pings_open( get_queried_object() ) ) : ?>
			<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
		<?php endif; ?>

		<?php
	}

	add_action( 'wilmer_mikado_action_header_meta', 'wilmer_mikado_header_meta' );
}

if ( ! function_exists( 'wilmer_mikado_user_scalable_meta' ) ) {
	/**
	 * Function that outputs user scalable meta if responsiveness is turned on
	 * Hooked to wilmer_mikado_action_header_meta action
	 */
	function wilmer_mikado_user_scalable_meta() {
		//is responsiveness option is chosen?
		if ( wilmer_mikado_is_responsive_on() ) {
			?>
			<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=yes">
		<?php } else { ?>
			<meta name="viewport" content="width=1200,user-scalable=yes">
			<?php
		}
	}

	add_action( 'wilmer_mikado_action_header_meta', 'wilmer_mikado_user_scalable_meta' );
}

if ( ! function_exists( 'wilmer_mikado_smooth_page_transitions' ) ) {
	/**
	 * Function that outputs smooth page transitions html if smooth page transitions functionality is turned on
	 * Hooked to wilmer_mikado_action_after_body_tag action
	 */
	function wilmer_mikado_smooth_page_transitions() {
		$id = wilmer_mikado_get_page_id();

		if ( wilmer_mikado_get_meta_field_intersect( 'smooth_page_transitions', $id ) === 'yes' && wilmer_mikado_get_meta_field_intersect( 'page_transition_preloader', $id ) === 'yes' ) {
			?>
			<div class="mkdf-smooth-transition-loader mkdf-mimic-ajax">
				<div class="mkdf-st-loader">
					<div class="mkdf-st-loader1">
						<?php wilmer_mikado_loading_spinners(); ?>
					</div>
				</div>
			</div>
			<?php
		}
	}

	add_action( 'wilmer_mikado_action_after_body_tag', 'wilmer_mikado_smooth_page_transitions', 10 );
}

if ( ! function_exists( 'wilmer_mikado_back_to_top_button' ) ) {
	/**
	 * Function that outputs back to top button html if back to top functionality is turned on
	 * Hooked to wilmer_mikado_action_after_wrapper_inner action
	 */
	function wilmer_mikado_back_to_top_button() {
		if ( wilmer_mikado_options()->getOptionValue( 'show_back_button' ) == 'yes' ) {
			?>
			<a id='mkdf-back-to-top' href='#'>
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
					 width="10px" height="16px" viewBox="0 0 10 16"  xml:space="preserve">
						<g>
							<rect x="4.5" y="0.9" class="st0" width="1" height="15.1"/>
						</g>
						<g>
							<polygon class="st0" points="9.3,5.5 10,4.8 5.2,0 4.8,0 0,4.8 0.7,5.5 5,1.2 	"/>
						</g>
				</svg>
			</a>
			<?php
		}
	}

	add_action( 'wilmer_mikado_action_after_wrapper_inner', 'wilmer_mikado_back_to_top_button', 30 );
}

if ( ! function_exists( 'wilmer_mikado_get_page_id' ) ) {
	/**
	 * Function that returns current page / post id.
	 * Checks if current page is woocommerce page and returns that id if it is.
	 * Checks if current page is any archive page (category, tag, date, author etc.) and returns -1 because that isn't
	 * page that is created in WP admin.
	 *
	 * @return int
	 *
	 * @version 0.1
	 *
	 * @see wilmer_mikado_is_plugin_installed()
	 * @see wilmer_mikado_is_woocommerce_shop()
	 */
	function wilmer_mikado_get_page_id() {
		if ( wilmer_mikado_is_plugin_installed( 'woocommerce' ) && wilmer_mikado_is_woocommerce_shop() ) {
			return wilmer_mikado_get_woo_shop_page_id();
		}

		if ( wilmer_mikado_is_default_wp_template() ) {
			return - 1;
		}

		return get_queried_object_id();
	}
}

if ( ! function_exists( 'wilmer_mikado_get_multisite_blog_id' ) ) {
	/**
	 * Check is multisite and return blog id
	 *
	 * @return int
	 */
	function wilmer_mikado_get_multisite_blog_id() {
		if ( is_multisite() ) {
			return get_blog_details()->blog_id;
		}
	}
}

if ( ! function_exists( 'wilmer_mikado_is_default_wp_template' ) ) {
	/**
	 * Function that checks if current page archive page, search, 404 or default home blog page
	 * @return bool
	 *
	 * @see is_archive()
	 * @see is_search()
	 * @see is_404()
	 * @see is_front_page()
	 * @see is_home()
	 */
	function wilmer_mikado_is_default_wp_template() {
		return is_archive() || is_search() || is_404() || ( is_front_page() && is_home() );
	}
}

if ( ! function_exists( 'wilmer_mikado_has_shortcode' ) ) {
	/**
	 * Function that checks whether shortcode exists on current page / post
	 *
	 * @param string shortcode to find
	 * @param string content to check. If isn't passed current post content will be used
	 *
	 * @return bool whether content has shortcode or not
	 */
	function wilmer_mikado_has_shortcode( $shortcode, $content = '' ) {
		$has_shortcode = false;

		if ( $shortcode ) {
			//if content variable isn't past
			if ( $content == '' ) {
				//take content from current post
				$page_id = wilmer_mikado_get_page_id();
				if ( ! empty( $page_id ) ) {
					$current_post = get_post( $page_id );

					if ( is_object( $current_post ) && property_exists( $current_post, 'post_content' ) ) {
						$content = $current_post->post_content;
					}
				}
			}

			//does content has shortcode added?
			if ( has_shortcode( $content, $shortcode ) ) {
				$has_shortcode = true;
			}
		}

		return $has_shortcode;
	}
}

if ( ! function_exists( 'wilmer_mikado_get_unique_page_class' ) ) {
	/**
	 * Returns unique page class based on post type and page id
	 *
	 * $params int $id is page id
	 * $params bool $allowSingleProductOption
	 * @return string
	 */
	function wilmer_mikado_get_unique_page_class( $id, $allowSingleProductOption = false ) {
		$page_class = '';

		if ( wilmer_mikado_is_plugin_installed( 'woocommerce' ) && $allowSingleProductOption ) {

			if ( is_product() ) {
				$id = get_the_ID();
			}
		}

		if ( is_single() ) {
			$page_class = '.postid-' . $id;
		} elseif ( is_home() ) {
			$page_class .= '.home';
		} elseif ( is_archive() || $id === wilmer_mikado_get_woo_shop_page_id() ) {
			$page_class .= '.archive';
		} elseif ( is_search() ) {
			$page_class .= '.search';
		} elseif ( is_404() ) {
			$page_class .= '.error404';
		} else {
			$page_class .= '.page-id-' . $id;
		}

		return $page_class;
	}
}

if ( ! function_exists( 'wilmer_mikado_page_custom_style' ) ) {
	/**
	 * Function that print custom page style
	 */
	function wilmer_mikado_page_custom_style() {
		$style = apply_filters( 'wilmer_mikado_filter_add_page_custom_style', $style = '' );

		if ( $style !== '' ) {

			if ( wilmer_mikado_is_plugin_installed( 'woocommerce' ) && wilmer_mikado_load_woo_assets() ) {
				wp_add_inline_style( 'wilmer-mikado-woo', $style );
			} else {
				wp_add_inline_style( 'wilmer-mikado-modules', $style );
			}
		}
	}

	add_action( 'wp_enqueue_scripts', 'wilmer_mikado_page_custom_style' );
}

if ( ! function_exists( 'wilmer_mikado_print_custom_js' ) ) {
	/**
	 * Prints out custom css from theme options
	 */
	function wilmer_mikado_print_custom_js() {
		$custom_js = wilmer_mikado_options()->getOptionValue( 'custom_js' );

		if ( ! empty( $custom_js ) ) {
			wp_add_inline_script( 'wilmer-mikado-modules', $custom_js );
		}
	}

	add_action( 'wp_enqueue_scripts', 'wilmer_mikado_print_custom_js' );
}

if ( ! function_exists( 'wilmer_mikado_get_global_variables' ) ) {
	/**
	 * Function that generates global variables and put them in array so they could be used in the theme
	 */
	function wilmer_mikado_get_global_variables() {
		$global_variables = array();

		$global_variables['mkdfAddForAdminBar']      = is_admin_bar_showing() ? 32 : 0;
		$global_variables['mkdfElementAppearAmount'] = -100;
		$global_variables['mkdfAjaxUrl']             = esc_url( admin_url( 'admin-ajax.php' ) );
		$global_variables['sliderNavPrevArrow']      = '<span class="mkdf-prev-icon"><span class="mkdf-alt-prev-icon arrow_left"></span><span class="mkdf-main-icon arrow_carrot-left"></span><span class="mkdf-prev-label">' . esc_html__( 'prev', 'wilmer' ) . '</span></span>';
		$global_variables['sliderNavNextArrow']      = '<span class="mkdf-next-icon"><span class="mkdf-next-label">' . esc_html__( 'next', 'wilmer' ) . '</span><span class="mkdf-main-icon arrow_carrot-right"></span><span class="mkdf-alt-next-icon arrow_right"></span>';
		$global_variables['ppExpand']                = esc_html__( 'Expand the image', 'wilmer' );
		$global_variables['ppNext']                  = esc_html__( 'Next', 'wilmer' );
		$global_variables['ppPrev']                  = esc_html__( 'Previous', 'wilmer' );
		$global_variables['ppClose']                 = esc_html__( 'Close', 'wilmer' );

		$global_variables = apply_filters( 'wilmer_mikado_filter_js_global_variables', $global_variables );

		wp_localize_script(
			'wilmer-mikado-modules',
			'mkdfGlobalVars',
			array(
				'vars' => $global_variables,
			)
		);
	}

	add_action( 'wp_enqueue_scripts', 'wilmer_mikado_get_global_variables' );
}

if ( ! function_exists( 'wilmer_mikado_per_page_js_variables' ) ) {
	/**
	 * Outputs global JS variable that holds page settings
	 */
	function wilmer_mikado_per_page_js_variables() {
		$per_page_js_vars = apply_filters( 'wilmer_mikado_filter_per_page_js_vars', array() );

		wp_localize_script(
			'wilmer-mikado-modules',
			'mkdfPerPageVars',
			array(
				'vars' => $per_page_js_vars,
			)
		);
	}

	add_action( 'wp_enqueue_scripts', 'wilmer_mikado_per_page_js_variables' );
}

if ( ! function_exists( 'wilmer_mikado_content_elem_style_attr' ) ) {
	/**
	 * Defines filter for adding custom styles to content HTML element
	 */
	function wilmer_mikado_content_elem_style_attr() {
		$styles = apply_filters( 'wilmer_mikado_filter_content_elem_style_attr', array() );

		wilmer_mikado_inline_style( $styles );
	}
}

if ( ! function_exists( 'wilmer_mikado_is_plugin_installed' ) ) {
	/**
	 * Function that checks if forward plugin installed
	 *
	 * @param $plugin string
	 *
	 * @return bool
	 */
	function wilmer_mikado_is_plugin_installed( $plugin ) {
		switch ( $plugin ) {
			case 'core':
				return defined( 'WILMER_CORE_VERSION' );
				break;
			case 'woocommerce':
				return function_exists( 'is_woocommerce' );
				break;
			case 'visual-composer':
				return class_exists( 'WPBakeryVisualComposerAbstract' );
				break;
			case 'revolution-slider':
				return class_exists( 'RevSliderFront' );
				break;
			case 'contact-form-7':
				return defined( 'WPCF7_VERSION' );
				break;
			case 'wpml':
				return defined( 'ICL_SITEPRESS_VERSION' );
				break;
			case 'gutenberg-editor':
				return class_exists( 'WP_Block_Type' );
				break;
			case 'gutenberg-plugin':
				return function_exists( 'is_gutenberg_page' ) && is_gutenberg_page();
				break;
			case 'elementor':
				return defined( 'ELEMENTOR_VERSION' );
				break;
			case 'qi-blocks':
				return defined( 'QI_BLOCKS_VERSION' );
				break;
			default:
				return false;
				break;
		}
	}
}

if ( ! function_exists( 'wilmer_mikado_get_module_part' ) ) {
	function wilmer_mikado_get_module_part( $module ) {
		return $module;
	}
}

if ( ! function_exists( 'wilmer_mikado_max_image_width_srcset' ) ) {
	/**
	 * Set max width for srcset to 1920
	 *
	 * @return int
	 */
	function wilmer_mikado_max_image_width_srcset() {
		return 1920;
	}

	add_filter( 'max_srcset_image_width', 'wilmer_mikado_max_image_width_srcset' );
}


if ( ! function_exists( 'wilmer_mikado_has_dashboard_shortcodes' ) ) {
	/**
	 * Function that checks if current page has at least one of dashboard shortcodes added
	 * @return bool
	 */
	function wilmer_mikado_has_dashboard_shortcodes() {
		$dashboard_shortcodes = array();

		$dashboard_shortcodes = apply_filters( 'wilmer_mikado_filter_dashboard_shortcodes_list', $dashboard_shortcodes );

		foreach ( $dashboard_shortcodes as $dashboard_shortcode ) {
			$has_shortcode = wilmer_mikado_has_shortcode( $dashboard_shortcode );

			if ( $has_shortcode ) {
				return true;
			}
		}

		return false;
	}
}

if ( ! function_exists( 'wilmer_mikado_get_formated_output' ) ) {

	function wilmer_mikado_get_formated_output( $output ) {

		if ( ! empty( $output ) ) {
			return $output;
		} else {
			return '';
		}

	}
}

if ( ! function_exists( 'wilmer_mikado_get_page_bg_grid' ) ) {

	function wilmer_mikado_get_page_bg_grid() {

		$output = '';

		$id = wilmer_mikado_get_page_id();

		$grid_option = wilmer_mikado_get_meta_field_intersect( 'page_background_grid', $id );

		if ( ! empty( $grid_option ) && $grid_option == 'yes' ) {

			$output .= '<div class="mkdf-page-bg-pattern-holder">';

			for ( $i = 0; $i < 5; $i++ ) {
				$output .= '<div class="mkdf-page-bg-pattern-column mkdf-bg-column-' . ( $i + 1 ) . '">';
				$output .= '</div>';
			}

			$output .= '</div>';

		}

		echo wilmer_mikado_get_formated_output( $output );

	}
}

add_action( 'wilmer_mikado_action_after_container_inner_open', 'wilmer_mikado_get_page_bg_grid' );

if ( ! function_exists( 'wilmer_mikado_enqueue_editor_customizer_styles' ) ) {
	/**
	 * Enqueue supplemental block editor styles
	 */
	function wilmer_mikado_enqueue_editor_customizer_styles() {
		wp_enqueue_style( 'wilmer-style-modules-admin-styles', MIKADO_FRAMEWORK_ADMIN_ASSETS_ROOT . '/css/mkdf-modules-admin.css' );
		wp_enqueue_style( 'wilmer-style-handle-editor-customizer-styles', MIKADO_FRAMEWORK_ADMIN_ASSETS_ROOT . '/css/editor-customizer-style.css' );
	}

	// add google font
	add_action( 'enqueue_block_editor_assets', 'wilmer_mikado_google_fonts_styles' );
	// add action
	add_action( 'enqueue_block_editor_assets', 'wilmer_mikado_enqueue_editor_customizer_styles' );
}

if ( ! function_exists( 'wilmer_mikado_is_theme_registered' ) ) {
	function wilmer_mikado_is_theme_registered() {
		if ( function_exists( 'wilmer_core_is_theme_registered' ) ) {
			return wilmer_core_is_theme_registered();
		} else {
			return false;
		}
	}
}
if ( ! function_exists( 'wilmer_mikado_add_registration_admin_notice' ) ) {
	function wilmer_mikado_add_registration_admin_notice() {
		if ( wilmer_mikado_is_plugin_installed( 'core' ) && ! wilmer_mikado_is_theme_registered() ) {
			?>
			<div class="error">
				<p>
					<?php
					echo wp_kses_post(
						sprintf(
							__( 'Your copy of the theme has not been activated. Please navigate to <a href="%s">Wilmer Dashboard</a> where you can input your purchase code and activate your copy of the theme so you can have access to all the theme features, elements & options.', 'wilmer' ),
							admin_url( 'admin.php?page=wilmer_core_dashboard' )
						)
					);
					?>
				</p>
			</div>
			<?php
		}
	}
	add_action( 'admin_notices', 'wilmer_mikado_add_registration_admin_notice' );
}
