<div class="qodef-gutenb-title-holder">
    <div class="qodef-gutenb-title-wrapper">
        <div class="qodef-gutenb-title-inner">
            <div class="qodef-grid">
                <?php if(!empty($title)) { ?>
                <<?php echo wilmer_mikado_escape_title_tag($title_tag); ?> class="qodef-page-title entry-title"><?php echo esc_html($title); ?></<?php echo wilmer_mikado_escape_title_tag($title_tag); ?>>
            <?php } ?>
            </div>
        </div>
    </div>
</div>