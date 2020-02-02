<header class="header-main">
	<div class="container">
		<a class="header-brand" href="<?php echo home_url(); ?>">

			<?php echo (is_front_page()) ? "<h1>" : ""; ?>
			<img src="" data-src="<?php echo KT_BT::getFooterHeaderSettingModel()->getHeaderLogoSrc(); ?>" alt="<?php echo get_bloginfo("name"); ?>" draggable="false" />
			<?php echo (is_front_page()) ? "</h1>" : ""; ?>

		</a>

		<nav class="nav-main">
			<ul>
				<li class="nav-home">
					<a href="<?php echo home_url(); ?>">
						<?php echo KT_BT::renderSvg("home"); ?>
						<span><?php _e("Úvod", "BT_DOMAIN"); ?></span>
					</a>
				</li>
				<?php KT::theWpNavMenu(KT_BT_NAVIGATION_MAIN_MENU, 3); ?>
			</ul>
		</nav>

		<?php KT_BT::getHeaderSearchForm(); ?>

		<div class="header-nav-button">
			menu
			<span></span>
			<span></span>
			<span></span>
			<span></span>
		</div>
	</div>
	<div class="header-mask"></div>
</header>