//Check off specific todos by clicking

$("ul").on("click", "li", function () {
	$(this).toggleClass("completed");
});

//removing todos when clicking on span
$("ul").on("click", "span", function (e) {
	e.stopPropagation();
	$(this)
		.parent()
		.fadeOut(500, function () {
			$(this).remove();
		});
});

//adding new todo
$("input[type='text'").keypress(function (event) {
	if (event.which === 13) {
		//grabbing text
		let todoText = $(this).val();
		$(this).val("");
		//create new li and add to ul
		$("ul").append(
			"<li><span><i class='fa fa-trash'></i></span>" + todoText + "</li>"
		);
	}
});

$("#toggle").click(function () {
	$("input").fadeToggle();
});
