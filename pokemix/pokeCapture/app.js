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
	const pokemonElement = document.createElement('div');
	pokemonElement.classList.add(`pokemon`, pokemon.name);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const pokeInnerHTML = `
    <div class='img-container '>
     <img src='https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png'/>
    </div>
    `;

	pokemonElement.innerHTML = pokeInnerHTML;
	poke_container.appendChild(pokemonElement);
	const pokeHandler = () => capturePokemon(name, pokemon.id);
	pokemonElement.addEventListener('click', pokeHandler);
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

const reset = (id) => {
	const pokemonsImgs = document.querySelectorAll('img');
	url = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;

	pokemonsImgs.forEach((img) => (img.src = url));
};

const capturePokemon = (name, id) => {
	const pokemonToFind = document.querySelector('.tofind');
	const helper = document.querySelector('h4');

	if (name.toLowerCase() == pokemonToFind.classList[0]) {
		helper.addEventListener('click', () => location.reload());
		helper.style.cursor = 'pointer';
		helper.style.color = 'green';
		helper.innerHTML = `Well done ! Click here to try again!`;

		reset(id);
	} else {
		helper.innerHTML = `No that was ${name}`;
	}
};

fetchPokemons();
