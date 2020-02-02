//Document ready
$(function() {
	commentResponse();
	commentResponseCancel();
});

//Functions
function commentResponse() {
	$(".comments-item-reply span").click(function() {
		$("#comment_parent").val(
			$(this)
				.parent(".comments-item-reply")
				.data("comment-id")
		);
		moveToHtmlTarget($("#commentform"), 90, 0);
		$(".comment-form-quote-notice").remove();
		$("#commentform").prepend(
			'<div class="comment-form-quote-notice"><span>Odpověď na:</span> <span>"' +
				$(this)
					.closest(".comments-item")
					.find(".comments-item-content p")
					.text()
					.substring(0, 115) +
				'..."</span><span class="quote-notice-remove"></span></div>'
		);
	});
}

function commentResponseCancel() {
	$(document).on("click", ".quote-notice-remove", function() {
		$(this)
			.parent(".comment-form-quote-notice")
			.remove();
		$("#comment_parent").val(0);
	});
}
