const productUrl =
	"http://localhost:3000/api/teddies/" + localStorage.getItem("id");
const product = document.querySelector(".products");

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

	let result = await fetch(api);
	let data = await result.json();
	let product = data;

	product.innerHtml = `
            <!-- single product -->
            <article class="product">
                <div class="img-container">
                    <img
                        src="${data.imageUrl}"
                        alt="product"
                        class="product-img"
                    />
                    
				</div>
                <h3>${product.name}</h3>
                <p>${data.description}</p>
				<h4>$${product.price}</h4>
				<button class="more-btn">Plus d'informations</button>
               
            </article>
            <!-- end of single product -->
            
            `;

	console.log(data._id);
}

getProduct("http://localhost:3000/api/teddies/5beaa8bf1c9d440000a57d94");
