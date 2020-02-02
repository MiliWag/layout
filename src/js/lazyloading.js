// Document ready
document.addEventListener("DOMContentLoaded", function () {
	LazyLoadingInit();
});

// Lazy loading Init
function LazyLoadingInit() {
	var myLazyLoad = new LazyLoad({
		elements_selector: "[data-src], [data-bg]",
		threshold: 400,
		callback_set: function (el) {
			objectFitImages(el);
		}
	});

	$(document).ajaxComplete(function () {
		myLazyLoad.update();
	});
}