<div class="mkdf-fullscreen-search-holder">
	<a <?php wilmer_mikado_class_attribute( $search_close_icon_class ); ?> href="javascript:void(0)">
		<?php echo wilmer_mikado_get_icon_sources_html( 'search', true, array( 'search' => 'yes' ) ); ?>
	</a>
	<div class="mkdf-fullscreen-search-table">
		<div class="mkdf-fullscreen-search-cell">
			<div class="mkdf-fullscreen-search-inner">
				<form action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mkdf-fullscreen-search-form" method="get">
					<div class="mkdf-form-holder">
						<div class="mkdf-form-holder-inner">
							<div class="mkdf-field-holder">
								<input type="text" placeholder="<?php esc_attr_e( 'Search for...', 'wilmer' ); ?>" name="s" class="mkdf-search-field" autocomplete="off" required />
							</div>
							<button type="submit" <?php wilmer_mikado_class_attribute( $search_submit_icon_class ); ?>>
								<?php echo wilmer_mikado_get_icon_sources_html( 'search', false, array( 'search' => 'yes' ) ); ?>
							</button>
							<div class="mkdf-line"></div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>