<?php get_header(); ?>
                <div class="mkdf-container-inner">
                    <div class="mkdf-404-table-holder">
                        <div class="mkdf-404-table-cell-holder">
                            <div class="mkdf-page-not-found">
                                <?php
                                $mkdf_title_image_404 = wilmer_mikado_options()->getOptionValue( '404_page_title_image' );
                                $mkdf_title_404       = wilmer_mikado_options()->getOptionValue( '404_title' );
                                $mkdf_intro_title_404 = wilmer_mikado_options()->getOptionValue( '404_intro_title' );
                                $mkdf_subtitle_404    = wilmer_mikado_options()->getOptionValue( '404_subtitle' );
                                $mkdf_text_404        = wilmer_mikado_options()->getOptionValue( '404_text' );
                                $mkdf_button_label    = wilmer_mikado_options()->getOptionValue( '404_back_to_home' );
                                $mkdf_button_style    = wilmer_mikado_options()->getOptionValue( '404_button_style' );

                                if ( ! empty( $mkdf_title_image_404 ) ) { ?>
                                    <div class="mkdf-404-title-image">
                                        <img src="<?php echo esc_url( $mkdf_title_image_404 ); ?>" alt="<?php esc_attr_e( '404 Title Image', 'wilmer' ); ?>" />
                                    </div>
                                <?php } ?>

                                <div class="mkdf-404-intro-title">
                                    <?php if ( ! empty( $mkdf_intro_title_404 ) ) {
                                        echo esc_html( $mkdf_intro_title_404 );
                                    } else {
                                        esc_html_e( 'Error 404', 'wilmer' );
                                    } ?>
                                </div>

                                <h1 class="mkdf-404-title">
                                    <?php if ( ! empty( $mkdf_title_404 ) ) {
                                        echo esc_html( $mkdf_title_404 );
                                    } else {
                                        esc_html_e( 'Page not found', 'wilmer' );
                                    } ?>
                                </h1>


                                <?php if ( ! empty( $mkdf_subtitle_404 ) ) { ?>
                                    <h3 class="mkdf-404-subtitle">
                                        <?php echo esc_html( $mkdf_subtitle_404 ); ?>
                                    </h3>
                                <?php } ?>

                                <p class="mkdf-404-text">
                                    <?php if ( ! empty( $mkdf_text_404 ) ) {
                                        echo esc_html( $mkdf_text_404 );
                                    } else {
                                        esc_html_e( 'Oops! The page you are looking for does not exist. It might have been moved or deleted.', 'wilmer' );
                                    } ?>
                                </p>

                                <?php
                                $button_params = array(
                                    'link' => esc_url( home_url( '/' ) ),
                                    'text' => ! empty( $mkdf_button_label ) ? $mkdf_button_label : esc_html__( 'Back to home', 'wilmer' )
                                );

                                if ( $mkdf_button_style == 'light-style' ) {
                                    $button_params['custom_class'] = 'mkdf-btn-light-style';
                                }

                                echo wilmer_mikado_return_button_html( $button_params );
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
			</div>
		</div>
	</div>
</div>
<?php get_footer(); ?>
</body>
</html>