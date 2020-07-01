const productUrl =
	"http://localhost:3000/api/teddies/" + localStorage.getItem("id");

async function getProduct(api) {
	// try {
	// 	let result = await fetch(api);
	// 	let data = await result.json();
	// 	let products = data;

	// 	products = products.map((item) => {
	// 		const price = JSON.parse(item.price);
	// 		const name = item.name;
	// 		const id = item._id;
	// 		const image = item.imageUrl;
	// 		const description = item.description;
	// 		return { name, price, id, image, description };
	// 	});

	// 	return products;
	// } catch (error) {
	// 	console.log(error);
	// }
	console.log(api);
	let result = await fetch(api);
	let data = await result.json();
	// let product = data;
	const products = document.querySelector(".products");
	console.log(data.imageUrl);
	// console.log(product.name);
	products.innerHtml = `
            <!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img
                        src="${data.imageUrl}"
                        alt="product"
                        class="product-img"
                    />
                    
				</div>
                <h3>${data.name}</h3>
                <p>${data.description}</p>
				<h4>$${data.price}</h4>
				<button class="more-btn">Plus d'informations</button>
               
            </article>
            <!-- end of single product -->
            
            `;

	console.log(data);
}

// getProduct("http://localhost:3000/api/teddies/5beaa8bf1c9d440000a57d94");

async function fetchProduct() {
	await getProduct(productUrl);
}

fetchProduct();
