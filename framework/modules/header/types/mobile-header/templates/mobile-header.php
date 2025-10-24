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
                            <?php if ( is_active_sidebar( 'mkdf-right-from-mobile-logo' ) ) {
                                dynamic_sidebar( 'mkdf-right-from-mobile-logo' );
                            } ?>
                            <?php if ( $show_navigation_opener ) : ?>
                                <div <?php wilmer_mikado_class_attribute( $mobile_icon_class ); ?>>
                                    <a href="javascript:void(0)">
                                        <?php if ( ! empty( $mobile_menu_title ) ) { ?>
                                            <h5 class="mkdf-mobile-menu-text"><?php echo esc_attr( $mobile_menu_title ); ?></h5>
                                        <?php } ?>
                                        <span class="mkdf-mobile-menu-icon">
                                            <?php echo wilmer_mikado_get_icon_sources_html( 'mobile' ); ?>
                                        </span>
                                    </a>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
			</div>
		</div>
		<?php wilmer_mikado_get_mobile_nav(); ?>
	</div>
	
	<?php do_action('wilmer_mikado_action_before_mobile_header_html_close'); ?>
</header>

<?php do_action('wilmer_mikado_action_after_mobile_header'); ?>