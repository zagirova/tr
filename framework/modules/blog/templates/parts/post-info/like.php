<?php if( wilmer_mikado_is_plugin_installed( 'core' ) ) { ?>
    <div class="mkdf-blog-like">
        <?php if( function_exists('wilmer_mikado_get_like') ) wilmer_mikado_get_like(); ?>
        <?php echo esc_html__('Likes', 'wilmer') ?>
    </div>
<?php } ?>