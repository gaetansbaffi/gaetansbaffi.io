const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const pokemons = JSON.parse(sessionStorage.getItem('pokemons'));
const found = false;

const fetchPokemons = async () => {
	const randomPokemons = [];
	const pokemonsDisplayed = 4;

	while (randomPokemons.length < pokemonsDisplayed) {
		var item = pokemons[Math.floor(Math.random() * pokemons.length)];
		if (!randomPokemons.find((pokemon) => pokemon.id == item.id)) {
			randomPokemons.push(item);
			createPokemonCard(item);
		}
	}
	addPokemonTofind(randomPokemons);
};

const createPokemonCard = (pokemon) => {
	console.log(pokemon);
	const pokemonElement = document.createElement('div');
	pokemonElement.classList.add(`pokemon`, pokemon.name);
	const name = capitalize(pokemon.name);
	const pokeInnerHTML = `
    <div class='img-container '>
     <img src='https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png'/>
    </div>
    `;

	pokemonElement.innerHTML = pokeInnerHTML;
	poke_container.appendChild(pokemonElement);
	pokemonElement.addEventListener('click', () =>
		capturePokemon(name, pokemon.id)
	);
};

const addPokemonTofind = (arr) => {
	const pokemonToFind = arr[Math.floor(Math.random() * arr.length)].name;
	const pokemonToFindEl = document.createElement('h3');
	const helper = document.createElement('h4');
	pokemonToFindEl.classList.add(pokemonToFind, 'tofind');
	pokemonToFindEl.innerHTML = `Capture ${pokemonToFind} !`;
	poke_container.appendChild(pokemonToFindEl);
	poke_container.appendChild(helper);
};

const capturePokemon = (name, id) => {
	const pokemonToFind = document.querySelector('.tofind');
	const pokemonDivs = document.querySelectorAll('.pokemon');
	const helper = document.querySelector('h4');
	const capturedPokemon = pokemons.filter((pokemon) => {
		return pokemon.name === name.toLowerCase();
	});
	console.log(capturedPokemon[0]);

	if (name.toLowerCase() == pokemonToFind.classList[0]) {
		//remove all pokemons
		pokemonDivs.forEach((element) =>
			element.parentElement.removeChild(element)
		);
		pokemonToFind.parentElement.removeChild(pokemonToFind);
		//create the card of the pokemon found
		createPokemonCard(capturedPokemon[0]);
		const foundDiv = document.querySelector('.pokemon');
		const foundName = document.createElement('h3');
		const foundId = document.createElement('p');
		foundDiv.append(foundId);
		foundDiv.append(foundName);
		foundName.textContent = name;
		foundId.textContent = '#' + id;
		foundDiv.querySelector('h3').textContent = name;

		//click to try again
		helper.addEventListener('click', () => location.reload());
		helper.style.cursor = 'pointer';
		helper.style.color = 'green';
		helper.innerHTML = `Well done ! Click here to try again!`;
	} else {
		helper.innerHTML = `No that was ${name}`;
	}
};

function capitalize(s) {
	return s[0].toUpperCase() + s.slice(1);
}

fetchPokemons();
