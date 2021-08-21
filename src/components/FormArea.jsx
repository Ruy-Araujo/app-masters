import styled from "styled-components";

/* <FormWrapper>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const dataForm = new FormData(e.target);
              const pokemon = dataForm.get("searchPokemon");
              if (pokemon && !havePokemon(pokemon)) {
                isNaN(pokemon)
                  ? getPokemonByName(pokemon)
                  : getPokemonById(pokemon);
              }
            }}
          >
            <label htmlFor="searchPokemon">Sarch Pokemon</label>
            <input
              type="text"
              name="searchPokemon"
              placeholder="Use Number or Name"
            />
            <button type="submit">Search</button>
          </form>
        </FormWrapper> */

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #801336;

  form {
    display: flex;
    align-items: center;
  }
`;

export default function Form() {
  const [pokemons, setPokemons] = React.useState([]);

  function getPokemonByName(name = "pikachu") {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((resp) => resp.json())
      .then((pokemon) => setPokemons([...pokemons, pokemon]));
  }

  function getPokemonById(id = "1") {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((resp) => resp.json())
      .then((pokemon) => setPokemons([...pokemons, pokemon]));
  }

  function havePokemon(pokemon) {
    const name = pokemons.some((e) => e.name === pokemon);
    const id = pokemons.some((e) => e.id == pokemon);
    return name || id;
  }

  return (
    <FormWrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const dataForm = new FormData(e.target);
          const pokemon = dataForm.get("searchPokemon");
          if (pokemon && !havePokemon(pokemon)) {
            isNaN(pokemon)
              ? getPokemonByName(pokemon)
              : getPokemonById(pokemon);
          }
        }}
      >
        <label htmlFor="searchPokemon">Sarch Pokemon</label>
        <input
          type="text"
          name="searchPokemon"
          placeholder="Use Number or Name"
        />
        <button type="submit">Search</button>
      </form>
    </FormWrapper>
  );
}
