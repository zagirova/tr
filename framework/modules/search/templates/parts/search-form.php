<form action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mkdf-search-page-form" method="get">
	<h2 class="mkdf-search-title"><?php esc_html_e( 'New search:', 'wilmer' ); ?></h2>
	<div class="mkdf-form-holder">
		<div class="mkdf-column-left">
			<input type="text" name="s" class="mkdf-search-field" autocomplete="off" value="" placeholder="<?php esc_attr_e( 'Type here', 'wilmer' ); ?>"/>
		</div>
		<div class="mkdf-column-right">
			<button type="submit" class="mkdf-search-submit">
                <svg height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
                <path d="M17.9,16.7l-4.2-4.2c1.1-1.4,1.7-3,1.7-4.8c0-2-0.8-4-2.2-5.4c-1.4-1.4-3.4-2.2-5.4-2.2s-4,0.8-5.4,2.2
                    S0.1,5.7,0.1,7.7s0.8,4,2.2,5.4c1.4,1.4,3.4,2.2,5.4,2.2c1.8,0,3.4-0.6,4.8-1.7l4.2,4.2c0.2,0.2,0.4,0.2,0.6,0.2
                    c0.2,0,0.4-0.1,0.6-0.2c0.2-0.2,0.2-0.4,0.2-0.6C18.1,17.1,18,16.9,17.9,16.7z M13.7,7.7c0,1.6-0.6,3.1-1.8,4.2l0,0
                    c-1.1,1.1-2.6,1.7-4.2,1.7c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6C11,1.7,13.7,4.4,13.7,7.7z"></path>
                </svg>
            </button>
		</div>
	</div>
	<div class="mkdf-search-label">
		<?php esc_html_e( 'If you are not happy with the results below please do another search', 'wilmer' ); ?>
	</div>
</form>