<?php
if($show_header_top) {
	do_action('wilmer_mikado_action_before_header_top');
	?>
	
	<?php if($show_header_top_background_div){ ?>
		<div class="mkdf-top-bar-background"></div>
	<?php } ?>

    <?php
    $top_bar_skin = wilmer_mikado_get_meta_field_intersect('top_bar_skin', get_the_ID());

    $additonal_classes = '';

    if(! empty($top_bar_skin) ){
        $additonal_classes .= 'mkdf-top-bar-' . $top_bar_skin . '-skin';
    }

    ?>

	<div class="mkdf-top-bar <?php echo esc_attr($additonal_classes); ?>">
		<?php do_action( 'wilmer_mikado_action_after_header_top_html_open' ); ?>
		
		<?php if($top_bar_in_grid) : ?>
			<div class="mkdf-grid">
		<?php endif; ?>
				
			<div class="mkdf-vertical-align-containers">
				<div class="mkdf-position-left"><!--
				 --><div class="mkdf-position-left-inner">
                            <?php wilmer_mikado_get_top_bar_widget_area_one(); ?>
					</div>
				</div>
				<div class="mkdf-position-right"><!--
				 --><div class="mkdf-position-right-inner">
                        <?php wilmer_mikado_get_top_bar_widget_area_two(); ?>
					</div>
				</div>
			</div>
				
		<?php if($top_bar_in_grid) : ?>
			</div>
		<?php endif; ?>
		
		<?php do_action( 'wilmer_mikado_action_before_header_top_html_close' ); ?>
	</div>
	
	<?php do_action('wilmer_mikado_action_after_header_top');
}