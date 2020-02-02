// Document ready
document.addEventListener("DOMContentLoaded", function () {
	//Fancybox inicializace
	galleryFancybox();

	fancyboxInit();
});

//WP gallery fancybox
function galleryFancybox() {
	if ($(".gallery").length) {
		var galleryID = "I";

		$(".gallery").each(function () {
			$(this)
				.find(".gallery-icon a")
				.attr("data-fancybox", galleryID);
			galleryID += "I";
		});
	}
	if ($(".wp-block-gallery").length) {
		var galleryID = "W";

		$(".wp-block-gallery").each(function () {
			$(this)
				.find(".blocks-gallery-item a")
				.attr("data-fancybox", galleryID);
			galleryID += "W";
		});
	}
}

//Fancybox init
function fancyboxInit() {
	if ($("[data-fancybox]").length) {
		$("[data-fancybox] , .kt-img-link").fancybox({
			animationEffect: "fade",
			idleTime: 99,
			thumbs: {
				autoStart: true,
				axis: "x"
			},
			buttons: [
				"close"
				//"zoom",
				//"share",
				//"slideShow",
				//"fullScreen",
				//"download",
				//"thumbs",
			]
		});
	}
}