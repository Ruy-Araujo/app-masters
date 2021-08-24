//Sort pokemons - NOT implemented
export function sortPokemons(pokemonList, sortBy = "id", asc = true) {
  switch (sortBy) {
    case "id":
      if (asc) {
        return pokemonList.sort((poke1, poke2) =>
          poke1.id > poke2.id ? 1 : -1
        );
      }
      return pokemonList
        .sort((poke1, poke2) => (poke1.id < poke2.id ? 1 : -1))
        .reverse();

    case "name":
      if (asc) {
        return pokemonList.sort((poke1, poke2) =>
          poke1.name > poke2.name ? 1 : -1
        );
      }
      return pokemonList
        .sort((poke1, poke2) => (poke1.name < poke2.name ? 1 : -1))
        .reverse();

    case "type":
      if (asc) {
        return pokemonList.sort((poke1, poke2) =>
          poke1.types[0].type.name > poke2.types[0].type.name ? 1 : -1
        );
      }
      return pokemonList
        .sort((poke1, poke2) =>
          poke1.types[0].type.name < poke2.types[0].type.name ? 1 : -1
        )
        .reverse();

    default:
      return pokemonList;
  }
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

/* 
Diseble for precaution

This block if for future implementation, to store favorite,rate and gotcha status of user

 const initialState = {
          id: pokemonID,
          favorite: null,
          rate: null,
          gotcha: null,
        };
        
const [state, dispatch] = useReducer(reducer, initialState);

        function reducer(state, action) {
          switch (action.type) {
            case "setFavorite":
              return { ...state, favorite: action.favorite };
            case "setRate":
              return { ...state, rate: action.rate };
            case "setGotcha":
              return { ...state, gotcha: action.gotcha };
            default:
              return state;
          }
        }

        const setFavorite = (value) => {
          dispatch({ type: "setFavorite", favorite: value });
        };

        const setRate = (value) => {
          dispatch({ type: "setRate", rate: value });
        };

        const setGotcha = (value) => {
          dispatch({ type: "setGotch", gotcha: value });
        }; */
