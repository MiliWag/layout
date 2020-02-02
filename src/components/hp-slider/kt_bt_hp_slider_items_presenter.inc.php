<?php

class KT_BT_HP_Slider_Items_Presenter extends KT_Presenter_Base
{
    const DEFAULT_COUNT = 3;

    private $posts;
    private $postsCount;
    private $maxCount;

    public function __construct($maxCount = self::DEFAULT_COUNT, $withInitParams = true)
    {
        parent::__construct();
        $this->maxCount = KT::tryGetInt($maxCount) ? : self::DEFAULT_COUNT;
    }

    // --- getry & setry ------------------------------

    /** @return array */
    public function getPosts()
    {
        if (KT::issetAndNotEmpty($this->posts)) {
            return $this->posts;
        }
        $this->initPosts();
        return $this->posts;
    }

    /** @return int */
    public function getPostsCount()
    {
        if (isset($this->postsCount)) {
            return $this->postsCount;
        }
        $this->initPosts();
        return $this->postsCount;
    }

    /** @return int */
    public function getMaxCount()
    {
        return $this->maxCount;
    }

    // --- veřejné metody ------------------------------

    /** @return boolean */
    public function hasPosts()
    {
        return $this->getPostsCount() > 0;
    }

    public function thePosts()
    {
        if ($this->hasPosts()) {
            self::theItemsLoops($this->getPosts(), KT_BT_SLIDER_LOOP);
        }
    }


    // --- neveřejné metody ------------------------------

    private function initPosts()
    {
        $args = [
            "post_type" => KT_BT_SLIDER_KEY,
            "post_status" => "publish",
            "posts_per_page" => $this->getMaxCount(),
            "orderby" => "menu_order title",
            "order" => KT_Repository::ORDER_ASC,
        ];
        $query = new WP_Query();
        $posts = $query->query($args);
        if (KT::arrayIssetAndNotEmpty($posts)) {
            $this->posts = $posts;
            $this->postsCount = count($posts);
        } else {
            $this->posts = [];
            $this->postsCount = 0;
        }
    }
}