<?php if (KT_BT::getThemeModel()->isBlogPostAuthor()) : ?>
<section class="post-author-section post-detail-other-section">
	<header>
		<h2 class="post-author-section-heading article-heading"><?php _e("Autor článku", "BT_DOMAIN"); ?></h2>

		<?php get_template_part(COMPONENTS_PATH . "post-author-item/post-author-item"); ?>

	</header>
</section>
<?php endif; ?>