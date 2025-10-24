<?php
/*
Template Name: Coming Soon Page
*/
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php
	/**
	 * wilmer_mikado_action_header_meta hook
	 *
	 * @see wilmer_mikado_header_meta() - hooked with 10
	 * @see wilmer_mikado_user_scalable_meta() - hooked with 10
	 * @see wilmer_core_set_open_graph_meta - hooked with 10
	 */
	do_action( 'wilmer_mikado_action_header_meta' );
	
	wp_head(); ?>
</head>
<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage">
	<?php wp_body_open(); ?>
	<?php
	/**
	 * wilmer_mikado_action_after_body_tag hook
	 *
	 * @see wilmer_mikado_get_side_area() - hooked with 10
	 * @see wilmer_mikado_smooth_page_transitions() - hooked with 10
	 */
	do_action( 'wilmer_mikado_action_after_body_tag' ); ?>

	<div class="mkdf-wrapper">
		<div class="mkdf-wrapper-inner">
			<div class="mkdf-content">
				<div class="mkdf-content-inner">
					<?php get_template_part( 'slider' ); ?>
					<div class="mkdf-full-width">
						<div class="mkdf-full-width-inner">
							<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
								<?php the_content(); ?>
							<?php endwhile; endif; ?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<?php wp_footer(); ?>
</body>
</html>