var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	//mode buttons even listeners
	setUpModeButtons();
	setUpSquares();
	reset();
}

function setUpModeButtons() {
	for (let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function () {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			} else {
				numSquares = 6;
			}
			reset();
		});
	}
}

function setUpSquares() {
	for (var i = 0; i < squares.length; i++) {
		// add click listener to squares
		squares[i].addEventListener("click", function () {
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare oclor of pickedColor
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "correct!";
				changedColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "try again";
			}
		});
	}
}

function reset() {
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colordisplay to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = "New Colors";
	messageDisplay.textContent = "";

	//change colors of squares
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function () {
	reset();
});

function changedColors(color) {
	//loop through all squares
	for (let i = 0; i < squares.length; i++) {
		// change each colors to match
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//add num random colors to arr
	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
		//get random color and push into array
	}
	//return that array

	return arr;
}

function randomColor() {
	//pick a "red" from 0 to 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 to 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 to 255
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}
