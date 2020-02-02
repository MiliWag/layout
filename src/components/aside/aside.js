//Document ready
$(function() {
	asideNavMobile();
});

//Resize
//Resize
$(window).resize(function() {
	if (window.matchMedia("(min-width: 62em)").matches) {
		asideNavResizeReset();
	}
});

//Functions
function asideNavMobile() {
	$(".widget_categories .widgettitle").click(function() {
		//Up to tablet portrait - up to 991px
		if (window.matchMedia("(max-width: 61.938em)").matches) {
			$(this)
				.closest(".widget_categories")
				.find("ul")
				.stop()
				.slideToggle(300);

			$(this).toggleClass("js-open");
		}
	});

	$(".widget_nav_menu .widgettitle").click(function() {
		//Up to tablet portrait - up to 991px
		if (window.matchMedia("(max-width: 61.938em)").matches) {
			$(".widget_nav_menu > div > ul")
				.stop()
				.slideToggle(300);

			$(this).toggleClass("js-open");
		}
	});

	$(".widget_pages .widgettitle").click(function() {
		//Up to tablet portrait - up to 991px
		if (window.matchMedia("(max-width: 61.938em)").matches) {
			$(".widget_pages > ul")
				.stop()
				.slideToggle(300);

			$(this).toggleClass("js-open");
		}
	});

	//Widget categories with select
	$(".widget_categories select")
		.closest(".widget_categories")
		.addClass("widget_categories_select");

	$(".widget_categories select").selectric();
}

function asideNavResizeReset() {
	$(".aside-nav-heading").removeClass("js-open");
	$(".aside-nav nav").removeAttr("style");
	$(".widget ul").removeAttr("style");
}
