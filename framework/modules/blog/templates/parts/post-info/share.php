<?php
$share_type = isset( $share_type ) ? $share_type : 'list';
?>
<?php if ( wilmer_mikado_is_plugin_installed( 'core' ) && wilmer_mikado_options()->getOptionValue( 'enable_social_share' ) === 'yes' && wilmer_mikado_options()->getOptionValue( 'enable_social_share_on_post' ) === 'yes' ) { ?>
	<div class="mkdf-blog-share">
		<?php echo wilmer_mikado_get_social_share_html( array( 'type' => $share_type ) ); ?>
	</div>
<?php } ?>