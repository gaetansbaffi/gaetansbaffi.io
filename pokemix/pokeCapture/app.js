const poke_container = document.getElementById('poke_container');
const pokemons_number = 150;
const pokemons = [];

const fetchPokemons = async () => {
	const randomPokemons = [];
	const pokemonsDisplayed = 4;
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}

	while (randomPokemons.length < 4) {
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
	pokemonElement.addEventListener('click', () => capturePokemon(name));
};

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	pokemons.push({ id: pokemon.id, name: pokemon.name });
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

const capturePokemon = (name) => {
	const pokemonToFind = document.querySelector('.tofind');
	const helper = document.querySelector('h4');

	if (name.toLowerCase() == pokemonToFind.classList[0]) {
		helper.addEventListener('click', () => location.reload());
		helper.style.cursor = 'pointer';
		helper.innerHTML = `Well done ! Click here to try again!`;
	} else {
		helper.innerHTML = `No that was ${name}`;
	}
};

fetchPokemons();
