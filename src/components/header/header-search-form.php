<div class="header-search">
	<form id="searchform" class="header-search-inner" role="search" method="get" action="<?php echo home_url("/"); ?>">
		<input id="s" name="s" class="header-search-input" type="text" placeholder="<?php _e('Hledat na...', 'BT_DOMAIN'); ?>">

		<button type="submit" class="header-search-submit btn submitButton">
			<span><?php _e("Vyhledat", "BT_DOMAIN"); ?></span>
		</button>
	</form>
	<div class="header-search-button">
		<?php echo KT_BT::renderSvg("magnifier"); ?>
	</div>
</div>