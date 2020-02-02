<?php
$themeModel = KT_BT::getThemeModel();
$footerHeader = KT_BT::getFooterHeaderSettingModel();
?>
</main>

<footer class="footer-main">
	<?php if ($footerHeader->isFooterLargeVisible()) : ?>
	<div class="footer-top">
		<div class="container">
			<div class="row justify-content-center">
				<div class="footer-block col-sm-6 col-md-4 col-lg-3">

					<h2 class="article-heading"><?php echo $footerHeader->getFooterFirstColTitle(); ?></h2>

					<div class="entry-content">
						<?php echo $footerHeader->getFooterFirstColEditorContent(); ?>
					</div>

				</div>

				<div class="footer-block col-sm-6 col-md-4 col-lg-3">
					<h2 class="article-heading"><?php echo $footerHeader->getFooterSecondColTitle(); ?></h2>
					<div class="entry-content">
						<?php echo $footerHeader->getFooterSecondColEditorContent(); ?>
					</div>
				</div>

				<?php if (has_nav_menu(KT_BT_NAVIGATION_FOOTER_TOP)) : ?>
				<div class="footer-block col-sm-6 col-md-4 col-lg-3">

					<h2 class="article-heading"><?php echo $footerHeader->getFooterThirdColTitle(); ?></h2>

					<nav class="footer-top-nav">
						<ul>
							<?php KT::theWpNavMenu(KT_BT_NAVIGATION_FOOTER_TOP); ?>
						</ul>
					</nav>

				</div>
				<?php endif; ?>

				<div class="footer-block col-sm-6 col-md-12 col-lg-3 text-md-center">
					<div class="d-inline-block">
						<a class="footer-brand" href="<?php echo home_url(); ?>">
							<div class="footer-brand-img-wrap">
								<img src="" data-src="<?php echo $footerHeader->getFooterFourthColLogoSrc(); ?>" alt="<?php echo get_bloginfo("name"); ?>">
							</div>
							<span><?php echo $footerHeader->getFooterFourthColTitle(); ?></span>
						</a>

						<?php if ($footerHeader->isFooterSocialsTop() && $themeModel->isSocials()) : ?>
						<div class="footer-social footer-top-social">
							<?php get_template_part(COMPONENTS_PATH . "social-icons-listing/social-icons-listing"); ?>
						</div>
						<?php endif; ?>

					</div>
				</div>
			</div>
		</div>
	</div>
	<?php endif; ?>

	<?php if ($footerHeader->isFooterSmallVisible()) : ?>
	<div class="footer-bottom">
		<div class="container">
			<span class="footer-copy">Copyright &copy; <?php echo date("Y"); ?> - <?php _e("Všechna práva vyhrazena ", "BT_DOMAIN"); ?> | <?php echo bloginfo(); ?></span>

			<?php if (has_nav_menu(KT_BT_NAVIGATION_FOOTER_BOTTOM)) : ?>
			<nav class="footer-bottom-nav">
				<ul>
					<?php KT::theWpNavMenu(KT_BT_NAVIGATION_FOOTER_BOTTOM); ?>
				</ul>
			</nav>
			<?php endif; ?>

			<?php if ($footerHeader->isFooterSocialsBottom() && $themeModel->isSocials()) : ?>
			<div class="footer-social footer-bottom-social">
				<?php get_template_part(COMPONENTS_PATH . "social-icons-listing/social-icons-listing"); ?>
			</div>
			<?php endif; ?>

		</div>
	</div>
	<?php endif; ?>

	<div class="footer-brilo">
		<div class="container">
			<a href="https://www.brilo.cz/" rel="nofollow">
				<span><?php _e("Vytvořilo", "BT_DOMAIN"); ?></span>
				<img src="" data-src="<?php echo get_template_directory_uri(); ?>/images/ico/brilo-logo.svg" alt="brilo logo">
			</a>
		</div>
	</div>
</footer>

<?php
wp_footer();
KT_BT_JSONLD::render();
?>




</body>

</html>