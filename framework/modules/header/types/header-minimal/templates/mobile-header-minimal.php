<?php do_action('wilmer_mikado_action_before_mobile_header'); ?>

<?php
$id            = wilmer_mikado_get_page_id();
$is_text_logo = wilmer_mikado_get_meta_field_intersect('logo_source', $id) == 'text' ? true : false;
?>

<header class="mkdf-mobile-header">
	<?php do_action('wilmer_mikado_action_after_mobile_header_html_open'); ?>
	
	<div class="mkdf-mobile-header-inner">
		<div class="mkdf-mobile-header-holder">
            <div class="mkdf-vertical-align-containers">
                <div class="mkdf-position-left"><!--
                 --><div class="mkdf-position-left-inner">
                        <?php if(! $is_text_logo ){
                            wilmer_mikado_get_mobile_logo();
                        } else{
                            wilmer_mikado_get_logo();
                        } ?>
                    </div>
                </div>
                <div class="mkdf-position-right"><!--
                 --><div class="mkdf-position-right-inner">
                        <a href="javascript:void(0)" <?php wilmer_mikado_class_attribute( $fullscreen_menu_icon_class ); ?>>
                            <span class="mkdf-fullscreen-menu-close-icon">
                                <?php echo wilmer_mikado_get_icon_sources_html( 'fullscreen_menu', true ); ?>
                            </span>
                            <span class="mkdf-fullscreen-menu-opener-icon">
                                <?php echo wilmer_mikado_get_icon_sources_html( 'fullscreen_menu' ); ?>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
		</div>
	</div>
	
	<?php do_action('wilmer_mikado_action_before_mobile_header_html_close'); ?>
</header>

<?php do_action('wilmer_mikado_action_after_mobile_header'); ?>