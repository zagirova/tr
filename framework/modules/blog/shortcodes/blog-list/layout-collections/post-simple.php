<li class="mkdf-bl-item mkdf-item-space clearfix">
	<div class="mkdf-bli-inner">
		<?php if ( $post_info_image == 'yes' ) {
			wilmer_mikado_get_module_template_part( 'templates/parts/media', 'blog', '', $params );
		} ?>
		<div class="mkdf-bli-content">
			<?php wilmer_mikado_get_module_template_part( 'templates/parts/title', 'blog', '', $params ); ?>
			<?php wilmer_mikado_get_module_template_part( 'templates/parts/post-info/date', 'blog', '', $params ); ?>
		</div>
	</div>
</li>