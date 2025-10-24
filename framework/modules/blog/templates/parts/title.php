<?php
$title_tag    = isset( $title_tag ) ? $title_tag : 'h2';
$title_styles = isset( $this_object ) && isset( $params ) ? $this_object->getTitleStyles( $params ) : array();
?>

<<?php echo wilmer_mikado_escape_title_tag($title_tag);?> itemprop="name" class="entry-title mkdf-post-title" <?php wilmer_mikado_inline_style($title_styles); ?>>
    <?php if(wilmer_mikado_blog_item_has_link()) { ?>
        <a itemprop="url" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
    <?php } ?>
        <?php the_title(); ?>
    <?php if(wilmer_mikado_blog_item_has_link()) { ?>
        </a>
    <?php } ?>
</<?php echo wilmer_mikado_escape_title_tag($title_tag);?>>