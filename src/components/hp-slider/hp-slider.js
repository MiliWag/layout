//Document ready
$(function() {
	hpSliderInit();

	hpSliderButtonSize();
});

//Resize
$(window).resize(function() {
	hpSliderButtonSize();
});

//Functions

//Hp slider init
function hpSliderInit() {
	$(".hp-slider")
		.slick({
			infinite: false,
			lazyLoad: "ondemand",
			autoplay: true,
			autoplaySpeed: 3000,
			adaptiveHeight: true,
			//fade: true,
			prevArrow: $(".hp-slider-prev"),
			nextArrow: $(".hp-slider-next"),
			dots: true,
			appendDots: $(".hp-slider-buttons"),
			responsive: [
				{
					breakpoint: 768,
					settings: {
						autoplay: false
					}
				}
			]
		})
		.on("setPosition", function(event, slick) {
			slick.$slides.css("height", slick.$slideTrack.height() + "px");
		});
}

//Hp slider button size
function hpSliderButtonSize() {
	//Up to phone landscape - up to 767px
	if (window.matchMedia("(max-width: 47.938em)").matches) {
		$(".hp-slider-button").removeClass("btn-large");
		$(".hp-slider-button").addClass("btn-small");
	}

	//Tablet portrait - from 768px
	if (window.matchMedia("(min-width: 48em)").matches) {
		$(".hp-slider-button").removeClass("btn-small");
		$(".hp-slider-button").addClass("btn-large");
	}
}
