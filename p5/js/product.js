function openWin() {
	let win = window.open("./produit.html");
	num = Number(document.activeElement.className);
	fetch("https://oc-p5-api.herokuapp.com/api/teddies").then((response) =>
		response.json().then((data) => {
			// console.log(data[num].colors);
			let colors = "";
			for (let i = 0; i < data[num].colors.length; i++) {
				colors += "<option>" + data[num].colors[i] + "</option>";
			}

			win.document.body.innerHTML += `;

				<div class="container" id=" ${num}">
				<img src="${data[num].imageUrl}" alt=""></img>
					<h4 class="name">${data[num].name}</h4>
					<p class="description">${data[num].description}</p>
                    <p class="price">${data[num].price}€</p>
					<p>Choisissez votre couleur</p>
					<select name="colors" id="color">${colors}</select>
					<button onClick="addToBasket()">Ajouter au panier</button>
					</div>`;
			console.log(num);
		})
	);
}
