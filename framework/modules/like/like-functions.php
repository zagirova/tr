<?php

if ( ! function_exists( 'wilmer_mikado_like' ) ) {
	/**
	 * Returns WilmerMikadoClassLike instance
	 *
	 * @return WilmerMikadoClassLike
	 */
	function wilmer_mikado_like() {
		return WilmerMikadoClassLike::get_instance();
	}
}

function wilmer_mikado_get_like() {
	
	echo wp_kses( wilmer_mikado_like()->add_like(), array(
		'span' => array(
			'class'       => true,
			'aria-hidden' => true,
			'style'       => true,
			'id'          => true
		),
		'i'    => array(
			'class' => true,
			'style' => true,
			'id'    => true
		),
		'a'    => array(
			'href'  => true,
			'class' => true,
			'id'    => true,
			'title' => true,
			'style' => true
		)
	) );
}