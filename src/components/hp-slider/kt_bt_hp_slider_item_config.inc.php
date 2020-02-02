<?php

class KT_BT_HP_Slider_Item_Config implements KT_Configable
{
    const FORM_PREFIX = "kt-bt-slider";

    // --- fieldsety ---------------------------

    public static function getAllGenericFieldsets()
    {
        return self::getAllNormalFieldsets() + self::getAllSideFieldsets();
    }

    public static function getAllNormalFieldsets()
    {
        return [
            self::PARAMS_FIELDSET => self::getParamsFieldset(),
        ];
    }

    public static function getAllSideFieldsets()
    {
        return [];
    }

    // --- parametry ---------------------------

    const PARAMS_FIELDSET = "kt-bt-slider-params";
    const PARAMS_TITLE = "kt-bt-slider-params-title";
    const PARAMS_DESCRIPTION = "kt-bt-slider-params-description";
    const PARAMS_BUTTON_TEXT = "kt-bt-slider-params-button-text";
    const PARAMS_URL = "kt-bt-slider-params-url";
    const PARAMS_FONT_COLOR = "kt-bt-slider-params-font-color";

    public static function getParamsFieldset()
    {
        $fieldset = new KT_Form_Fieldset(self::PARAMS_FIELDSET, __("Parametry", "BT_DOMAIN"));
        $fieldset->setPostPrefix(self::PARAMS_FIELDSET);

        $fontColors = new KT_BT_Font_Color_Enum();
        $fontColorOptions = KT::arrayRemoveByKey($fontColors->getTranslates(), KT_BT_Font_Color_Enum::NONE);

        $fieldset->addText(self::PARAMS_TITLE, __("Titulek:", "BT_DOMAIN"));
        $fieldset->addText(self::PARAMS_DESCRIPTION, __("Popisek:", "BT_DOMAIN"));
        $fieldset->addText(self::PARAMS_BUTTON_TEXT, __("Text tlačítka:", "BT_DOMAIN"));
        $fieldset->addText(self::PARAMS_URL, __("Cílová URL:", "BT_DOMAIN"));
        $fieldset->addSelect(self::PARAMS_FONT_COLOR, __("Barva textu:", "BT_DOMAIN"))
            ->setOptionsData($fontColorOptions);


        return $fieldset;
    }
}