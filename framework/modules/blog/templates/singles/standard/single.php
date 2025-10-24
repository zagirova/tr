<?php

wilmer_mikado_get_single_post_format_html( $blog_single_type );

do_action( 'wilmer_mikado_action_after_article_content' );

wilmer_mikado_get_module_template_part( 'templates/parts/single/author-info', 'blog' );

wilmer_mikado_get_module_template_part( 'templates/parts/single/single-navigation', 'blog' );

wilmer_mikado_get_module_template_part( 'templates/parts/single/related-posts', 'blog', '', $single_info_params );

wilmer_mikado_get_module_template_part( 'templates/parts/single/comments', 'blog' );