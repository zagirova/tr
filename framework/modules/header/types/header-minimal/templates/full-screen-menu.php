<div class="mkdf-fullscreen-menu-holder-outer">
        <?php
//            echo 'logo-get';
//            wilmer_mikado_get_logo();
        ?>
	<div class="mkdf-fullscreen-menu-holder">
		<div class="mkdf-fullscreen-menu-holder-inner">
			<?php if ($fullscreen_menu_in_grid) : ?>
				<div class="mkdf-container-inner">
			<?php endif; ?>

			<div class="mkdf-fullscreen-above-menu-widget-holder">
				<?php wilmer_mikado_get_header_widget_area_one(); ?>
			</div>
			
			<?php 
			//Navigation
			wilmer_mikado_get_module_template_part('templates/full-screen-menu-navigation', 'header/types/header-minimal');;

			?>

			<div class="mkdf-fullscreen-below-menu-widget-holder">
				<?php wilmer_mikado_get_header_widget_area_two(); ?>
			</div>
			
			<?php if ($fullscreen_menu_in_grid) : ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</div>