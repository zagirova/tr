<aside class="mkdf-sidebar">
	<?php
		$mkdf_sidebar = wilmer_mikado_get_sidebar();
		
		if ( is_active_sidebar( $mkdf_sidebar ) ) {
			dynamic_sidebar( $mkdf_sidebar );
		}
	?>
</aside>