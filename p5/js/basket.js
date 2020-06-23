function addToBasket() {
	const num = Number(document.querySelector(".container").id);
	fetch("https://oc-p5-api.herokuapp.com/api/teddies").then((response) =>
		response.json().then((data) => {
			localStorage.setItem(num, JSON.stringify(data[num]));
		})
	);
}
