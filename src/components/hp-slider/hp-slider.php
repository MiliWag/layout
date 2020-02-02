<?php $slidersPresenter = new KT_BT_HP_Slider_Items_Presenter();
$sliderSizeClass = KT_BT::getFrontPageModel()->getSliderSizeClass(); ?>

<?php if ($slidersPresenter->hasPosts() && KT_BT::getFrontPageModel()->isSliderVisible()) : ?>
<section class="hp-slider-section <?= $sliderSizeClass; ?>">
	<div class="hp-slider">
		<?php $slidersPresenter->thePosts(); ?>
	</div>

	<div class="container">
		<div class="hp-slider-buttons">
			<span class="hp-slider-arrow hp-slider-prev"><img src="<?php echo get_template_directory_uri(); ?>/images/ico/arrow.svg" alt="arrow previous"></span>
			<span class="hp-slider-arrow hp-slider-next"><img src="<?php echo get_template_directory_uri(); ?>/images/ico/arrow.svg" alt="arrow next"></span>
		</div>
	</div>
</section>
<?php endif; ?>