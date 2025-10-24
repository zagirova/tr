<?php do_action('wilmer_mikado_action_before_page_title'); ?>

<?php
$title_bg_text_responsive_padding_left = '';
$title_bg_text_responsive_padding_left_meta = get_post_meta(get_the_ID(), 'mkdf_title_area_background_text_left_offset_1440_meta', true);
if(! empty($title_bg_text_responsive_padding_left_meta) ){
    $title_bg_text_responsive_padding_left = $title_bg_text_responsive_padding_left_meta;
}
?>

<div class="mkdf-title-holder <?php echo esc_attr($holder_classes); ?>" <?php wilmer_mikado_inline_style($holder_styles); ?> <?php echo wilmer_mikado_get_inline_attrs($holder_data); ?>>
	<?php if(!empty($title_image)) { ?>
		<div class="mkdf-title-image">
			<img itemprop="image" src="<?php echo esc_url($title_image['src']); ?>" alt="<?php echo esc_attr($title_image['alt']); ?>" />
		</div>
	<?php } ?>
	<div class="mkdf-title-wrapper" <?php wilmer_mikado_inline_style($wrapper_styles); ?>>
		<div class="mkdf-title-inner">
			<div class="mkdf-grid">
                <?php if(!empty($additional_text)) { ?>
                    <<?php echo wilmer_mikado_escape_title_tag($additional_text_tag); ?> class="mkdf-page-title-additional-text" <?php wilmer_mikado_inline_style($additional_text_styles); ?>><?php echo esc_html($additional_text); ?></<?php echo wilmer_mikado_escape_title_tag($additional_text_tag); ?>>
                <?php } ?>
				<?php if(!empty($title)) { ?>
					<<?php echo wilmer_mikado_escape_title_tag($title_tag); ?> class="mkdf-page-title entry-title" <?php wilmer_mikado_inline_style($title_styles); ?>><?php echo esc_html($title); ?></<?php echo wilmer_mikado_escape_title_tag($title_tag); ?>>
				<?php } ?>
				<?php if(!empty($subtitle)){ ?>
					<<?php echo wilmer_mikado_escape_title_tag($subtitle_tag); ?> class="mkdf-page-subtitle" <?php wilmer_mikado_inline_style($subtitle_styles); ?>><?php echo esc_html($subtitle); ?></<?php echo wilmer_mikado_escape_title_tag($subtitle_tag); ?>>
				<?php } ?>
			</div>
            <?php if(!empty($background_text)) { ?>
                <div class="mkdf-title-background-text" <?php if( ! empty($title_bg_text_responsive_padding_left) ){ echo ('data-padding-left-1440="' . $title_bg_text_responsive_padding_left . '"'); } ?>>
                    <div class="mkdf-title-background-text-holder">
                        <div class="mkdf-title-background-text-holder-inner" <?php wilmer_mikado_inline_style($background_text_styles) ?>>
                            <?php echo esc_html($background_text); ?>
                        </div>
                    </div>
                </div>
            <?php } ?>
	    </div>
	</div>
</div>

<?php do_action('wilmer_mikado_action_after_page_title'); ?>
