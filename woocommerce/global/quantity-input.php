<?php
/**
 * Product quantity inputs
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/global/quantity-input.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://woocommerce.com/document/template-structure/
 * @package WooCommerce\Templates
 * @version 10.1.0
 *
 * @var bool   $readonly If the input should be set to readonly mode.
 * @var string $type     The input type attribute.
 */

defined( 'ABSPATH' ) || exit;

if ( ! isset( $input_id ) ) {
	$input_id = 'mkdf-quantity-id-' . wp_unique_id();
}

/* translators: %s: Quantity. */
$label = ! empty( $args['product_name'] ) ? sprintf( esc_html__( '%s quantity', 'wilmer' ), wp_strip_all_tags( $args['product_name'] ) ) : esc_html__( 'Quantity', 'wilmer' );

$holder_classes = array(
	'mkdf-quantity-buttons',
	'quantity',
);

// In some cases we wish to display the quantity but not allow for it to be changed.
if ( $max_value && $min_value === $max_value ) {
	$is_readonly = true;
	$input_value = $min_value;
	$hidden           = true;
	$holder_classes[] = 'hidden';
} else {
	$is_readonly = false;
	$hidden = false;
}
?>
<div class="<?php echo implode( ' ', $holder_classes ); ?>">
	<?php
	/**
	 * Hook to output something before the quantity input field.
	 *
	 * @since 7.2.0
	 */
	do_action( 'woocommerce_before_quantity_input_field' );
	?>
	<label class="screen-reader-text" for="<?php echo esc_attr( $input_id ); ?>"><?php echo esc_attr( $label ); ?></label>
	<span class="mkdf-quantity-minus icon_minus-06"></span>
	<input
			type="text"
		<?php echo esc_attr( $is_readonly ) ? 'readonly="readonly"' : ''; ?>
			id="<?php echo esc_attr( $input_id ); ?>"
			class="<?php echo esc_attr( join( ' ', (array) $classes ) ); ?> mkdf-quantity-input"
			name="<?php echo esc_attr( $input_name ); ?>"
			value="<?php echo esc_attr( ! empty( $input_value ) ? $input_value : 0 ); ?>"
			title="<?php echo esc_attr_x( 'Qty', 'Product quantity input tooltip', 'wilmer' ); ?>"
			<?php if ( in_array( $type, array( 'text', 'search', 'tel', 'url', 'email', 'password' ), true ) ) : ?>
				size="4"
			<?php endif; ?>
			data-min="<?php echo esc_attr( $min_value ); ?>"
			data-max="<?php echo esc_attr( 0 < $max_value ? $max_value : '' ); ?>"
			data-step="<?php echo esc_attr( $step ); ?>"
		<?php if ( ! $is_readonly ) : ?>
			placeholder="<?php echo esc_attr( $placeholder ); ?>"
			inputmode="<?php echo esc_attr( $inputmode ); ?>"
			autocomplete="<?php echo esc_attr( isset( $autocomplete ) ? $autocomplete : 'on' ); ?>"
		<?php endif; ?>
	/>
	<span class="mkdf-quantity-plus icon_plus"></span>
	<?php
	/**
	 * Hook to output something after quantity input field
	 *
	 * @since 3.6.0
	 */
	do_action( 'woocommerce_after_quantity_input_field' );
	?>
</div>
