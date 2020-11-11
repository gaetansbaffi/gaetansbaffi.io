const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const url = "http://localhost:3000/api/teddies/";
let products = [];
let cart = [];
const app = document.getElementById("app");
let count = document.getElementById("item-amount");

//UI
const getProducts = async () => {
	await fetch(url)
		.then(function (res) {
			return res.json();
		})
		.then(function (data) {
			for (const product of data) {
				let tempProduct = {};
				tempProduct.id = product._id;
				tempProduct.imageUrl = product.imageUrl;
				tempProduct.name = product.name;
				tempProduct.price = product.price / 100;
				tempProduct.description = product.description;
				tempProduct.colors = product.colors;
				tempProduct.count = 0;
				products.push(tempProduct);
			}
			if (urlParams.get("product")) {
				showSingleProduct(products);
				cartLogic();
				displayCount();
			} else {
				showProducts(products);
				cartLogic();
				displayCount();
			}
		})

		.catch(function (err) {
			console.log(err);
		});
};

const showProducts = (products) => {
	for (const product of products) {
		let productTemplate = `
		<div class="product-item">
		<h2>${product.name}</h2>
		<img src=${product.imageUrl}>
		<p>${product.price}€</p>
	<div class="product-btns">
			<button class="add-basket" id=${product.id}>Ajouter au panier</button>
			<a href="produit.html?product=${product.id}" class="more-info">Plus d'informations</a>
	</div>
		</div>
		`;
		app.innerHTML += productTemplate;
	}
};

const showSingleProduct = (products) => {
	const colorsList = (colors) => {
		let tempStr = "";
		for (color of colors) {
			tempStr += `<option>${color}</option>`;
		}
		return tempStr;
	};
	for (const product of products) {
		if (product.id === urlParams.get("product")) {
			let productTemplate = `
			<div class="single-product-item">
			<h2>${product.name}</h2>
			<img src=${product.imageUrl}
			<p>${product.description}</p>
			<p>${product.price}€</p>
			
			<select>${colorsList(product.colors)}</select>
			<button class="add-basket" id=${product.id}>Ajouter au panier</button>
			
			</div>
			`;
			app.innerHTML += productTemplate;
		}
	}
};

const displayCount = () => {
	let amount = 0;
	let total = 0;
	for (const item of cart) {
		amount += item.count;
		total += item.count * item.price;
	}
	count.innerHTML = amount;
	return [amount, total];
};
//end of UI

//cart logic
const cartLogic = () => {
	addToCart();
	clearCart();
	removeItem();
	cartBtns();
};

const addToCart = () => {
	const buttons = document.querySelectorAll(".add-basket");
	for (const button of buttons) {
		button.addEventListener("click", () => {
			for (const product of products) {
				if (product.id === button.id) {
					for (let item of cart) {
						if (item.id === button.id) {
							item.count++;
							saveCart();
							displayCount();
							return;
						}
					}
					product.count++;
					cart.push(product);
					saveCart();
					displayCount();
				}
			}
		});
	}
};

const removeItem = () => {
	const removeBtns = document.querySelectorAll(".remove");
	for (const btn of removeBtns) {
		btn.addEventListener("click", () => {
			for (const item in cart) {
				if (cart[item].id === btn.id) {
					try {
						cart.splice(item, 1);
					} catch (error) {
						console.log(error);
					}
				}
			}
			saveCart();
			loadCart();
			displayCount();
			showCart();
			cartLogic();
		});
	}
};

const cartBtns = () => {
	const plusBtns = document.querySelectorAll(".plus");
	const minusBtns = document.querySelectorAll(".minus");

	for (const btn of plusBtns) {
		btn.addEventListener("click", () => {
			let id = btn.parentElement.parentElement.querySelector(".remove").id;
			for (const item of cart) {
				if (id === item.id) {
					item.count++;
					saveCart();
					showCart();
					cartLogic();
				}
			}
		});
	}
	for (const btn of minusBtns) {
		btn.addEventListener("click", () => {
			let id = btn.parentElement.parentElement.querySelector(".remove").id;
			for (const item in cart) {
				if (cart[item].id === id) {
					cart[item].count--;
					if (cart[item].count > 0) {
						saveCart();
						showCart();
					} else {
						cart.splice(item, 1);
						saveCart();
						showCart();
					}
				}
			}
			displayCount();
			cartLogic();
		});
	}
};

const clearCart = () => {
	const deleteCart = document.querySelector("#delete-cart");

	try {
		deleteCart.addEventListener("click", () => {
			cart = [];
			console.log(cart);
			saveCart();
			loadCart();
			displayCount();
			showCart();
		});
	} catch (error) {
		console.log("le panier est vide");
	}
};

const showCart = () => {
	const table = document.querySelector("table");
	table.innerHTML = "";
	if (cart.length > 0) {
		for (const item of cart) {
			table.innerHTML += `<tr>
		<td>${item.name}</td>
		<td>${item.price}€</td>
		<td><button class="minus">-</button>  ${
			item.count
		} <button class='plus'>+</button></td>
		<td>${item.price * item.count}€</td>
		<td><button class="remove" id=${item.id}>Supprimer</button></td>
		</tr>`;
		}
		table.innerHTML += `<tr class="total-row">
		<td>Total</td>
		<td></td>
		<td>${displayCount()[0]}</td>
		<td>${displayCount()[1]}€</td>
		<td><button id="delete-cart">Vider le panier</button></td>
		</tr>`;
	} else {
		table.innerHTML += "Le panier est vide...";
		table.className = "empty";
		document.querySelector("form").className = "hidden";
	}
};

const createTag = (tagName, parent, content = "", className = "") => {
	const tag = document.createElement(tagName);
	tag.className = className;
	tag.innerHTML = content;
	parent.appendChild(tag);
	return tag;
};

// Save cart
function saveCart() {
	localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

// Load cart
function loadCart() {
	cart = JSON.parse(localStorage.getItem("shoppingCart"));
}
if (localStorage.getItem("shoppingCart") != null) {
	loadCart();
}

//init

if (window.location.href.indexOf("panier") != -1) {
	loadCart();
	displayCount();
	showCart();
	cartLogic();
} else {
	getProducts();
}
