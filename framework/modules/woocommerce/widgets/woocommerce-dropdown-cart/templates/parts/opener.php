<a itemprop="url" <?php wilmer_mikado_class_attribute( wilmer_mikado_get_dropdown_cart_icon_class() ); ?> href="<?php echo esc_url( wc_get_cart_url() ); ?>">
    <span class="mkdf-sc-opener-icon"><?php echo wilmer_mikado_get_icon_sources_html( 'dropdown_cart', false, array( 'dropdown_cart' => 'yes' ) ); ?></span>
    <span class="mkdf-sc-opener-count"><?php echo WC()->cart->cart_contents_count; ?></span>
</a>