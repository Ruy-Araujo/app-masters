import { useState, useEffect } from "react";
import CardsArea from "../components/CardsArea";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setCookie, parseCookies } from "nookies";
import { sortPokemons } from "../lib/pokemons";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import SortByAlphaIcon from "@material-ui/icons/SortByAlpha";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  .title {
    font-size: 1.5em;
    font-weight: 300;
    line-height: 1.6em;
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

  @media (max-width: 690px) {
    .title {
      font-size: 1.2em;
      padding: 0 10px;
      text-align: center;
    }

    .inputContainer {
      padding: 0 20px;
      width: 90vw;
    }
  }
`;

const BodyWrapper = styled.div`
  margin-top: 35px;

  @media (max-width: 690px) {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

export default function Home(props) {
  const [pokemons, setPokemons] = useState([...props.USER_POKEMONS]);
  const [alignment, setAlignment] = useState(props.USER_PREFERENCES);

  /* Save user pokemons locally */
  useEffect(() => {
    const list = pokemons.map((e) => e.id);

    setCookie(null, "USER_PREFERENCES", alignment, {
      maxAge: 86400 * 7,
      path: "/",
    });

    setCookie(null, "USER_POKEMONS", list, {
      maxAge: 86400 * 7,
      path: "/",
    });
  });

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSort = (str) => {
    const pokeList = sortPokemons(pokemons, str, true);
    setPokemons(pokeList);
  };

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

  //Veriy if pokemon is alredy in list
  function havePokemon(pokemon) {
    const name = pokemons.some((e) => e.name === pokemon);
    const id = pokemons.some((e) => e.id == pokemon);
    return name || id;
  }

  return (
    <>
      <Container className="header">
        <ContentWrapper>
          <div className="title">
            This is an interview project, where you can list your favorite
            Pokémon.
            <br /> Start to add some Pokémon, typing in box below a Pokémon
            name, e.g. Pikachu
          </div>

          <form
            className="form"
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
              <TextField
                name="inputPokemon"
                label="Name or Number"
                fullWidth={true}
              />
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
        </ContentWrapper>
      </Container>

      <Container className="body">
        <BodyWrapper>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton
              value="id"
              aria-label="sort by id"
              onClick={() => handleSort("id")}
            >
              <FormatListNumberedIcon /> | number
            </ToggleButton>
            <ToggleButton
              value="name"
              aria-label="sort by name"
              onClick={() => handleSort("name")}
            >
              <SortByAlphaIcon />| name
            </ToggleButton>
            <ToggleButton
              value="type"
              aria-label="sort by type"
              onClick={() => handleSort("type")}
            >
              type
            </ToggleButton>
          </ToggleButtonGroup>

          <CardsArea pokemons={pokemons} />
        </BodyWrapper>
      </Container>
    </>
  );
}

//Render before page load, only in server side.
export async function getServerSideProps(context) {
  //get user cookie with pokemon list
  const cookies = parseCookies(context);

  const pokemonsList = cookies.USER_POKEMONS
    ? cookies.USER_POKEMONS.split(",")
    : [];

  const preferences = cookies.USER_PREFERENCES
    ? cookies.USER_PREFERENCES
    : "id";

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
      USER_PREFERENCES: preferences,
    }, // will be passed to the page component as props
  };
}
