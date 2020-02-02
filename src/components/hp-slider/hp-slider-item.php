<?php
$sliderPresenter = new KT_BT_HP_Slider_Item_Presenter($sliderModel = new KT_BT_HP_Slider_Item_Model($post));

$sliderTitle = $sliderPresenter->getSliderTitle();
$sliderImageSrc = $sliderPresenter->getSrc();
$sliderUrl = $sliderModel->getParamsUrl();
$sliderFontColor = $sliderPresenter->getSliderColorClass();

?>

<div class="hp-slider-item <?= $sliderFontColor; ?>">

	<div class="hp-slider-img">
		<img data-lazy="<?= $sliderImageSrc; ?>" alt="<?= $sliderTitle; ?>">
	</div>

	<div class="hp-slider-text container">

		<h2 class="hp-slider-heading hp-heading"><?= $sliderTitle; ?></h2>

		<?php if ($sliderModel->isParamsDescription()) : ?>
		<p class="hp-slider-description"><?= $sliderModel->getParamsDescription(); ?></p>
		<?php endif; ?>

		<?php if ($sliderModel->isParamsButtonText()) : ?>
		<a class="hp-slider-button btn btn-large" href="<?= $sliderUrl; ?>">
			<span><?= $sliderModel->getParamsButtonText(); ?></span>
		</a>
		<?php endif; ?>
	</div>
</div>