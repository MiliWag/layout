<?php if (function_exists("yoast_breadcrumb") && !(is_front_page() || is_404())) : ?>
<?php
$extraClass = "";
if (!KT_BT::isAsideVisible()) {
    $extraClass = "container-narrow";
} ?>

<div class="breadcrumbs-container container <?php echo $extraClass; ?>">
	<div class="breadcrumbs">
		<?php yoast_breadcrumb(); ?>
	</div>
</div>
<?php endif; ?>