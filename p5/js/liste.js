let num = Number(document.activeElement.className);

fetch("http://localhost:3000/api/teddies").then((response) =>
	response.json().then((data) => {
		const container = document.querySelector("main");

		for (i = 0; i < data.length; i++) {
			container.innerHTML += `
				<div class = "container bear${i}">
				<img src="${data[i].imageUrl}" alt=""></img>
					<h4 class="name">${data[i].name}</h4>
					<p class="description">${data[i].description}</p>
					<p class="price">${data[i].price}€</p>
					<button class="${i}" onClick="openWin()">Plus d'informations</button>
				</div>`;
		}
	})
);
