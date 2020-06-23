const basketTable = document.querySelector("table");
let parsed;

function allBasket() {
	for (i = 0; i < localStorage.length; i++) {
		parsed = JSON.parse(localStorage[i]);
		basketTable.innerHTML += `<tr>
        <td>${parsed._id}</td>
        <td>${parsed.name}</td>
        <td>${parsed.description}</td>
        <td class= "price">${parsed.price}</td>
        <td>
            <input type="number" value="1" class="numberOfArticles" onchange=(totalsFunc())>
        </td>
        <td class="total"></td>

         </tr>`;
	}
}

allBasket();

const numbersOfArticles = document.querySelectorAll(".numberOfArticles");
const prices = document.querySelectorAll(".price");
const totals = document.querySelectorAll(".total");
totalsFunc();

function totalsFunc() {
	for (i = 0; i < totals.length; i++) {
		totals[i].innerHTML =
			Number(numbersOfArticles[i].value) * Number(prices[i].innerHTML);
	}
}
