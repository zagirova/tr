<?php
/*
Template Name: WooCommerce
*/
?>
<?php
$mkdf_sidebar_layout  = wilmer_mikado_sidebar_layout();
$mkdf_grid_space_meta = wilmer_mikado_options()->getOptionValue( 'woo_list_grid_space' );
$mkdf_holder_classes  = ! empty( $mkdf_grid_space_meta ) ? 'mkdf-grid-' . $mkdf_grid_space_meta . '-gutter' : '';

get_header();
wilmer_mikado_get_title();
get_template_part( 'slider' );
do_action('wilmer_mikado_action_before_main_content');

//Woocommerce content
if ( ! is_singular( 'product' ) ) { ?>
	<div class="mkdf-container">
		<div class="mkdf-container-inner clearfix">
			<div class="mkdf-grid-row <?php echo esc_attr( $mkdf_holder_classes ); ?>">
				<div <?php echo wilmer_mikado_get_content_sidebar_class(); ?>>
					<?php wilmer_mikado_woocommerce_content(); ?>
				</div>
				<?php if ( $mkdf_sidebar_layout !== 'no-sidebar' ) { ?>
					<div <?php echo wilmer_mikado_get_sidebar_holder_class(); ?>>
						<?php get_sidebar(); ?>
					</div>
				<?php } ?>
			</div>
		</div>
	</div>
<?php } else { ?>
	<div class="mkdf-container">
		<div class="mkdf-container-inner clearfix">
			<?php wilmer_mikado_woocommerce_content(); ?>
		</div>
	</div>
<?php } ?>
<?php get_footer(); ?>