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
	products.innerHTML = `
            <!-- single product -->
            <article class="single-product">
                <div class="img-container">
                    <img
                        src="${data.imageUrl}"
                        alt="product"
                        class="single-product-img"
                    />
                    
				</div>
                <h3>${data.name}</h3>
                <p>${data.description}</p>
                <h4>${data.price / 100}.00€</h4>
                <a href="./index.html#products" class="back-btn">Retour à la page d'accueil</a>
			
               
            </article>
            <!-- end of single product -->
            
            `;

	console.log(data);
}

getProduct(productUrl);
