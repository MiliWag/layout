<?php if (KT_BT::getThemeModel()->isBlogSocials()) : ?>

<?php $postPresenter = new KT_BT_Post_Presenter($postModel = new KT_BT_Post_Model($post)); ?>

<section class="post-share-section post-detail-other-section">
	<h2 class="post-share-heading article-heading"><?php _e("Sdílejte článek", "BT_DOMAIN"); ?></h2>

	<div class="post-share-platforms">
		<a class="post-share-link" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $postModel->getPermalink(); ?>">
			<img src="" data-src="<?php echo get_template_directory_uri(); ?>/images/ico/facebook.svg" alt="facebook logo">
			<span>Facebook</span>
		</a>

		<a class="post-share-link" href="https://twitter.com/home?status=<?php echo $postModel->getPermalink(); ?>">
			<img src="" data-src="<?php echo get_template_directory_uri(); ?>/images/ico/twitter.svg" alt="twitter logo">
			<span>Twitter</span>
		</a>

	</div>
</section>
<?php endif; ?>