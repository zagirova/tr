<?php do_action('wilmer_mikado_action_before_page_header'); ?>

<header class="mkdf-page-header">
	<?php do_action('wilmer_mikado_action_after_page_header_html_open'); ?>
	
	<?php if($show_fixed_wrapper) : ?>
		<div class="mkdf-fixed-wrapper">
	<?php endif; ?>
		
	<div class="mkdf-menu-area">
		<?php do_action('wilmer_mikado_action_after_header_menu_area_html_open'); ?>
		
        <div class="mkdf-vertical-align-containers">
            <div class="mkdf-position-left"><!--
             --><div class="mkdf-position-left-inner">
                    <?php if(!$hide_logo) {
                        wilmer_mikado_get_logo();
                    } ?>
                </div>
            </div>
            <div class="mkdf-position-center"><!--
             --><div class="mkdf-position-center-inner">
                    <?php wilmer_mikado_get_main_menu(); ?>
                </div>
            </div>
            <div class="mkdf-position-right"><!--
             --><div class="mkdf-position-right-inner">
					<?php wilmer_mikado_get_header_widget_area_one(); ?>
                </div>
            </div>
        </div>
	</div>
		
	<?php if($show_fixed_wrapper) { ?>
		</div>
	<?php } ?>
	
	<?php if($show_sticky) {
		wilmer_mikado_get_sticky_header();
	} ?>
	
	<?php do_action('wilmer_mikado_action_before_page_header_html_close'); ?>
</header>

<?php do_action('wilmer_mikado_action_after_page_header'); ?>