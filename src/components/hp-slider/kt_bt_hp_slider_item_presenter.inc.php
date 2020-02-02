<?php

class KT_BT_HP_Slider_Item_Presenter extends KT_WP_Post_Base_Presenter
{

    private $thumbnailSrc;
    private $originalSrc;
    private $sliderTitle;

    function __construct(KT_BT_HP_Slider_Item_Model $model)
    {
        parent::__construct($model);
    }

    // --- getry & setry ------------------------------

    /** @return KT_BT_HP_Slider_Item_Model */
    public function getModel()
    {
        return parent::getModel();
    }

    // --- veřejné metody ------------------------------

    public function getThumbnailSrc()
    {
        if (isset($this->thumbnailSrc)) {
            return $this->thumbnailSrc;
        }
        if ($this->getModel()->hasThumbnail()) {
            $src = wp_get_attachment_image_src($this->getModel()->getThumbnailId(), KT_BT_IMAGE_SIZE_1920x720);
            if (KT::arrayIssetAndNotEmpty($src)) {
                return $this->thumbnailSrc = reset($src);
            }
        }
        return $this->thumbnailSrc = "";
    }

    public function getOriginalSrc()
    {
        if (isset($this->originalSrc)) {
            return $this->originalSrc;
        }
        if ($this->getModel()->hasThumbnail()) {
            $src = wp_get_attachment_image_src($this->getModel()->getThumbnailId(), KT_WP_IMAGE_SIZE_ORIGINAL);
            if (KT::arrayIssetAndNotEmpty($src)) {
                return $this->originalSrc = reset($src);
            }
        }
        return $this->originalSrc = "";
    }

    public function getSrc()
    {
        if (KT_BT::getFrontPageModel()->getSliderSize() == 1) {
            return $this->getThumbnailSrc();
        } else return $this->getOriginalSrc();
    }

    public function getSliderTitle()
    {
        if (isset($this->sliderTitle)) {
            return $this->sliderTitle;
        }
        if ($this->getModel()->isParamsTitle()) {
            return $this->sliderTitle = $this->getModel()->getParamsTitle();
        } else {
            return $this->sliderTitle = $this->getModel()->getTitle();
        }
    }

    public function getSliderColorClass()
    {
        if ($this->getModel()->getParamFontColor() == 2) {
            return "hp-slider-item-dark";
        } else {
            return "";
        }
    }
}