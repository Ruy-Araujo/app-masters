import React from "react";
import CardsArea from "../components/CardsArea";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .title {
    font-size: 24px;
    padding: 0px 80px;
    margin: 40px 0px;
    text-align: center;
  }

  .inputContainer {
    display: flex;
    flex-direction: column;
    width: 400px;
  }

  .inputContainer:first-child div {
    margin-bottom: 10px;
  }
`;

export default function Home() {
  const [pokemons, setPokemons] = React.useState([]);

  function getPokemonByName(name = "pikachu") {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((resp) => resp.json())
      .then((pokemon) => setPokemons([...pokemons, pokemon]))
      .catch((erro) => console.log("deu ruim"));
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
    <>
      <Container>
        <Header>
          <div className="title">
            This is an interview project, where you can list your favorite
            Pokémon. Start to add some Pokémon, typing in box below a Pokémon
            name, e.g. Pikachu
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const dataForm = new FormData(e.target);
              const pokemon = dataForm.get("pokemon");
              if (pokemon && !havePokemon(pokemon)) {
                isNaN(pokemon)
                  ? getPokemonByName(pokemon)
                  : getPokemonById(pokemon);
              }
            }}
          >
            <div className="inputContainer">
              <TextField name="pokemon" label="ID or Name" fullWidth={true} />
              <Button type="submit" variant="contained" color="primary">
                ADD
              </Button>
            </div>
          </form>
        </Header>
        <CardsArea pokemons={pokemons} />
      </Container>
    </>
  );
}
