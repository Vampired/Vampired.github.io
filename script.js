function load() {
	const progres = document.querySelector('.progres')
	let width = 1;
	let id = setInterval(frame, 20);
	const arrow = document.getElementById("arrow");
	const wait = document.querySelector("h4");
	const loading_text = document.querySelector("h3");
	function frame() {
		if (width >= 100) {
			clearInterval(id);
		} else {
			width++;
			progres.innerHTML = width + "%";
			progres.style.width = width + '%';
			if (width == 100) {
				arrow.style.display = "block";
				wait.style.display = "none";
				loading_text.innerHTML = "Gotowe!"
				
			}
		}
	}
}

window.addEventListener("load", load);

// jQuery
$("#arrow").on("click", function () {
	$("body,html").animate({
		scrollTop: $(".headerBar").offset().top
	}, 1000)
})
