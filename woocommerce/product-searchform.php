<?php
/**
 * The template for displaying product search form
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/product-searchform.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 7.0.1
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<form role="search" method="get" class="mkdf-searchform woocommerce-product-search" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text"><?php esc_html_e( 'Search for:', 'wilmer' ); ?></label>
	<div class="input-holder clearfix">
		<input type="search" class="search-field" placeholder="<?php esc_attr_e( 'Search', 'wilmer' ); ?>" value="<?php echo get_search_query(); ?>" name="s" title="<?php esc_attr_e( 'Search for:', 'wilmer' ); ?>"/>
		<button type="submit" class="mkdf-search-submit <?php echo esc_attr( wc_wp_theme_get_element_class_name( 'button' ) ); ?>">
			<svg height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
				<path d="M17.9,16.7l-4.2-4.2c1.1-1.4,1.7-3,1.7-4.8c0-2-0.8-4-2.2-5.4c-1.4-1.4-3.4-2.2-5.4-2.2s-4,0.8-5.4,2.2
				S0.1,5.7,0.1,7.7s0.8,4,2.2,5.4c1.4,1.4,3.4,2.2,5.4,2.2c1.8,0,3.4-0.6,4.8-1.7l4.2,4.2c0.2,0.2,0.4,0.2,0.6,0.2
				c0.2,0,0.4-0.1,0.6-0.2c0.2-0.2,0.2-0.4,0.2-0.6C18.1,17.1,18,16.9,17.9,16.7z M13.7,7.7c0,1.6-0.6,3.1-1.8,4.2l0,0
				c-1.1,1.1-2.6,1.7-4.2,1.7c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6C11,1.7,13.7,4.4,13.7,7.7z"></path>
			</svg>
		</button>
		<input type="hidden" name="post_type" value="product"/>
	</div>
</form>
