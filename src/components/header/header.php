<?php KT_BT::getContactFormPresenterPrepared();
KT_BT_JSONLD::addSite();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<?php get_template_part(COMPONENTS_PATH . "header/header-head"); ?>

<body <?php body_class(); ?>>

	<?php KT_BT::renderAnalyticsBodyCode(); ?>
	<?php get_template_part(COMPONENTS_PATH . "header/header-main"); ?>

	<main>

		<?php get_template_part(COMPONENTS_PATH . "project-notices/project-notices"); ?>
		<?php get_template_part(COMPONENTS_PATH . "breadcrumbs/breadcrumbs"); ?>