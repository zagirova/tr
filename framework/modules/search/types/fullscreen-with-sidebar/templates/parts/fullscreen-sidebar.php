<div class="mkdf-fullscren-search-sidebar-holder">
	<div class="mkdf-fullscren-search-sidebar-inner">
		<div class="mkdf-grid-row">
			<?php for($i = 1; $i <= $search_sidebar_columns; $i++) { ?>
				<div class="mkdf-column-content mkdf-grid-col-<?php echo esc_attr(12 / $search_sidebar_columns); ?>">
					<?php
						if(is_active_sidebar('fullscreen_search_column_'.$i)) {
							dynamic_sidebar('fullscreen_search_column_'.$i);
						}
					?>
				</div>
			<?php } ?>
		</div>
	</div>
</div>