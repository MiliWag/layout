<?php $postsPresenter = new KT_BT_Posts_Related_Presenter(); ?>
<?php if (KT_BT::getThemeModel()->isBlogSimiliarArticles() && $postsPresenter->hasPosts()) : ?>

<section class="related-posts-section post-detail-other-section">
	<header>
		<h2 class="base-subheading">Podobné články</h2>

		<div class="article-wrap">
			<?php $postsPresenter->thePosts(); ?>
		</div>

	</header>
</section>
<?php endif; ?>