// Document ready
document.addEventListener("DOMContentLoaded", function () {
	preventDefaultUtil();
	moveToHtmlTargetInit();
});

//Prevent Default
function preventDefaultUtil() {
	var preventDefaultItems = document.querySelectorAll(".js-prevent-default"),
		i;

	if (preventDefaultItems[0] != undefined) {
		for (i = 0; i < preventDefaultItems.length; ++i) {
			preventDefaultItems[i].addEventListener("click", function (e) {
				e.preventDefault();
			});
		}
	}
}

// Funkce pro animované posunutí na prvek v DOM dokumentu
function moveToHtmlTarget(elemnt, topOffset, bottomOffset) {
	var offset = elemnt.offset().top;

	if (topOffset > 0) {
		offset = offset - topOffset;
	}

	if (bottomOffset > 0) {
		offset = offset + bottomOffset;
	}

	$("html, body").animate({
			scrollTop: offset
		},
		1000
	);

	return this;
}

function moveToHtmlTargetInit() {
	$("[data-kt-target]").click(function () {
		var targetElement = $($(this).data("kt-target"));
		var targetBottomOffset = $(this).data("kt-bottom-offset");
		var targetTopOffset = $(this).data("kt-top-offset");
		moveToHtmlTarget(targetElement, targetTopOffset, targetBottomOffset);
	});
}