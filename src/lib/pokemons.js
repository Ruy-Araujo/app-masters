export async function getPokemon(id = "1") {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();
  return data;
}

//Sort pokemons by ID ASC
export function sortPokemons(pokemonList) {
  return pokemonList.sort((poke1, poke2) => (poke1.id > poke2.id ? 1 : -1));
}

// Format pokemon name to concat ID and Name
export function formatName(pokemon) {
  return `${pokemon.id}. ${
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  }`;
}

// Return background color for type of pokemon
export function backgrounForType(pokemonType) {
  const pokemonTypeColor = {
    default: "#FCFCFC",
    fire: "#F08030",
    water: "#559EDF",
    grass: "#55DF9E",
    bug: "#A8B820",
    electric: "#FAE078",
    dragon: "#FF00FF",
    flying: "#A890F0",
    fighting: "#C03028",
    ghost: "#705898",
    ground: "#E0C068",
    ice: "#98D8D8",
    normal: "#A8A878",
    poison: "#A040A0",
    psychic: "#F85888",
    rock: "#B8A038",
  };

  if (pokemonType in pokemonTypeColor) {
    return pokemonTypeColor[pokemonType];
  } else {
    return pokemonTypeColor["default"];
  }
}

// Return backgroun color with #hex alfa aplyed
export function backgrounGradient(pokemonType) {
  return `${backgrounForType(pokemonType)}B3`;
}

