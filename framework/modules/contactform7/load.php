<?php

if ( wilmer_mikado_is_plugin_installed( 'contact-form-7' ) ) {
	include_once MIKADO_FRAMEWORK_MODULES_ROOT_DIR.'/contactform7/options-map/map.php';
	include_once MIKADO_FRAMEWORK_MODULES_ROOT_DIR.'/contactform7/custom-styles/contact-form.php';
	include_once MIKADO_FRAMEWORK_MODULES_ROOT_DIR.'/contactform7/contact-form-7-config.php';
}