import { useState, useEffect } from "react";
import CardsArea from "../components/CardsArea";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setCookie, parseCookies } from "nookies";
import { getPokemon } from "../lib/pokemons";

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

export default function Home(props) {
  const [pokemons, setPokemons] = useState([...props.USER_POKEMONS]);

  /* Save user pokemons locally */
  useEffect(() => {
    const list = pokemons.map((e) => e.id);
    setCookie(
      null,
      "USER_POKEMONS",
      list,
      {
        maxAge: 86400 * 7,
        path: "/",
      },
      [pokemons]
    );
  });

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
              const pokemon = dataForm.get("inputPokemon").toLowerCase();
              if (pokemon && !havePokemon(pokemon)) {
                isNaN(pokemon)
                  ? getPokemonByName(pokemon)
                  : getPokemonById(pokemon);
              }
            }}
          >
            <div className="inputContainer">
              <TextField name="inputPokemon" label="ID or Name" fullWidth={true} />
              <Button
                name="add"
                type="submit"
                variant="contained"
                color="primary"
              >
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

//Render after page load, only in server side
export async function getServerSideProps(context) {
  //get user cookie with pokemon list
  const cookies = parseCookies(context);

  const pokemonsList = cookies.USER_POKEMONS
    ? cookies.USER_POKEMONS.split(",")
    : [];

  //Fetch all pokemons in list
  const pokemons = await Promise.all(
    pokemonsList.map((e) => {
      return fetch(`https://pokeapi.co/api/v2/pokemon/${e}`);
    })
  );

  //Convert all to objects
  const list = await Promise.all(
    pokemons.map(async (e) => {
      return e.json();
    })
  );

  return {
    props: {
      USER_POKEMONS: list,
    }, // will be passed to the page component as props
  };
}