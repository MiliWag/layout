<?php $postsPageModel = KT_BT::getPostsPageModel(); ?>
<section>
	<header>
		<h1 class="base-heading"><?php _e("Výsledky vyhledávání", "BT_DOMAIN"); ?></h1>
	</header>

	<?php get_template_part(COMPONENTS_PATH . "search-form/search-form"); ?>

	<?php if (have_posts()) : ?>
	<div class="search-results-listing">
		<?php global $wp_query;
        KT_Presenter_Base::theQueryLoops($wp_query, KT_WP_POST_KEY); ?>
	</div>
	<?php echo KT::bootstrapPagination(); ?>

	<?php else : ?>
	<div class="no-result-block mt-1 mb-1 mb-md-2">
		<header>
			<h2><?php _e("Nenalezo", "BT_DOMAIN") ?></h2>
		</header>
		<p><?php _e("Nic ze zadaných parametrů neodpovídá", "BT_DOMAIN") ?></p>

	</div>
	<?php endif; ?>




</section>