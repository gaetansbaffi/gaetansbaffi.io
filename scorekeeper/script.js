var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var resetButton = document.querySelector("#reset");
var score1 = document.querySelector(".score1");
var score2 = document.querySelector(".score2");
var numInput = document.querySelector("input");
var target = document.querySelector(".target");
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

p1Button.addEventListener("click", function () {
	if (!gameOver) {
		p1Score++;
		if (p1Score === winningScore) {
			gameOver = true;
			score1.classList.add("winner");
		}
		score1.textContent = p1Score;
	}
});

p2Button.addEventListener("click", function () {
	if (!gameOver) {
		p2Score++;
		if (p2Score === winningScore) {
			gameOver = true;
			score2.classList.add("winner");
		}
		score2.textContent = p2Score;
	}
});

resetButton.addEventListener("click", function () {
	reset();
});

numInput.addEventListener("change", function () {
	target.textContent = numInput.value;
	winningScore = Number(numInput.value);
	reset();
});

function reset() {
	p1Score = 0;
	p2Score = 0;
	score1.textContent = p1Score;
	score2.textContent = p2Score;
	score1.classList.remove("winner");
	score2.classList.remove("winner");
	gameOver = false;
}
