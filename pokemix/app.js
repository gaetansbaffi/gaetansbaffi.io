const pokemons_number = 150;
let pokemons = [];
const loadingDiv = document.querySelector('.loading');

const fetchPokemons = async () => {
	let loading = true;
	for (let i = 1; i <= pokemons_number; i++) {
		await getPokemon(i);
	}
	loading = false;
	loading
		? (loadingDiv.style.display = 'block')
		: (loadingDiv.style.display = 'none');
	sessionStorage.setItem('pokemons', JSON.stringify(pokemons));
};

const getPokemon = async (i) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	const { name, id, types } = pokemon;
	pokemons.push({ name, id, types });
};

fetchPokemons();
