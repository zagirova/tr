<?php if(comments_open()) { ?>
	<div class="mkdf-post-info-comments-holder">
		<a itemprop="url" class="mkdf-post-info-comments" href="<?php comments_link(); ?>">
            <i class='icon_star_alt' aria-hidden='true'></i>
			<?php //comments_number('0' . esc_html__('Comments','wilmer'), '1 '.esc_html__('Comment','wilmer'), '% '.esc_html__('Comments','wilmer') ); ?>
		    <?php echo esc_html__('Comments','wilmer'); ?>
        </a>
	</div>
<?php } ?>