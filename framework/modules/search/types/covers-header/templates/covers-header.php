<form action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mkdf-search-cover" method="get">
	<?php if ( $search_in_grid ) { ?>
	<div class="mkdf-container">
        <div class="mkdf-search-cover-icon">
            <div class="mkdf-search-cover-icon-holder">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 18 18" style="enable-background:new 0 0 18 18;" xml:space="preserve">
                 <path class="st0" d="M17.9,16.7l-4.2-4.2c1.1-1.4,1.7-3,1.7-4.8c0-2-0.8-4-2.2-5.4c-1.4-1.4-3.4-2.2-5.4-2.2s-4,0.8-5.4,2.2
                    S0.1,5.7,0.1,7.7s0.8,4,2.2,5.4c1.4,1.4,3.4,2.2,5.4,2.2c1.8,0,3.4-0.6,4.8-1.7l4.2,4.2c0.2,0.2,0.4,0.2,0.6,0.2
                    c0.2,0,0.4-0.1,0.6-0.2c0.2-0.2,0.2-0.4,0.2-0.6C18.1,17.1,18,16.9,17.9,16.7z M13.7,7.7c0,1.6-0.6,3.1-1.8,4.2l0,0
                    c-1.1,1.1-2.6,1.7-4.2,1.7c-3.3,0-6-2.7-6-6c0-3.3,2.7-6,6-6C11,1.7,13.7,4.4,13.7,7.7z"/>
                </svg>
            </div>
        </div>
		<div class="mkdf-full-width mkdf-serarch-cover-holder clearfix">
	<?php } ?>
			<div class="mkdf-form-holder-outer">
				<div class="mkdf-form-holder">
					<div class="mkdf-form-holder-inner">
						<input type="text" placeholder="<?php esc_attr_e( 'Type your search', 'wilmer' ); ?>" name="s" class="mkdf_search_field" autocomplete="off" required />
					</div>
				</div>
			</div>
	<?php if ( $search_in_grid ) { ?>
            <a <?php wilmer_mikado_class_attribute( $search_close_icon_class ); ?> href="#">
                <?php echo wilmer_mikado_get_icon_sources_html( 'search', true, array( 'search' => 'yes' ) ); ?>
            </a>
		</div>
	</div>
	<?php } ?>
</form>