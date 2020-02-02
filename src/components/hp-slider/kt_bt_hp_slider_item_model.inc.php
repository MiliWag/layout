<?php

class KT_BT_HP_Slider_Item_Model extends KT_WP_Post_Base_Model
{
    private $thumbnailSrc;

    public function __construct(WP_Post $post)
    {
        parent::__construct($post, KT_BT_HP_Slider_Item_Config::FORM_PREFIX);
    }

    // --- getry & setry ------------------------


    public function getParamsTitle()
    {
        return $this->getMetaValue(KT_BT_HP_Slider_Item_Config::PARAMS_TITLE);
    }

    public function getParamsDescription()
    {
        return $this->getMetaValue(KT_BT_HP_Slider_Item_Config::PARAMS_DESCRIPTION);
    }

    public function getParamsButtonText()
    {
        return $this->getMetaValue(KT_BT_HP_Slider_Item_Config::PARAMS_BUTTON_TEXT);
    }

    public function getParamsUrl()
    {
        return $this->getMetaValue(KT_BT_HP_Slider_Item_Config::PARAMS_URL);
    }

    public function getParamFontColor()
    {
        return $this->getMetaValue(KT_BT_HP_Slider_Item_Config::PARAMS_FONT_COLOR);
    }

    // --- veřejné funkce ------------------------


    public function isParamsTitle()
    {
        return KT::issetAndNotEmpty($this->getParamsTitle());
    }

    public function isParamsDescription()
    {
        return KT::issetAndNotEmpty($this->getParamsDescription());
    }

    public function isParamsButtonText()
    {
        return KT::issetAndNotEmpty($this->getParamsButtonText());
    }

    public function isParamsUrl()
    {
        return KT::issetAndNotEmpty($this->getParamsUrl());
    }

    public function isParamFontColor()
    {
        return KT::issetAndNotEmpty($this->getParamFontColor());
    }


}