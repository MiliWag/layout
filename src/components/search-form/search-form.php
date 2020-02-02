<div class="search-form-wrap">
	<h2 class="search-form-heading article-heading"><?php _e("Vyhledávání pro:", "BT_DOMAIN"); ?></h2>

	<form id="searchform" role="search" method="get" class="search-form" action="<?php echo home_url("/"); ?>">
		<input name="s" class="search-form-input" type="text" value="<?php echo KT::stringEscape(get_search_query(false)); ?>">
		<button class="search-form-submit" type="submit"><img src="" data-src="<?php echo get_template_directory_uri(); ?>/images/ico/magnifier.svg" alt="magnifier icon"></button>
	</form>
</div>