import { useState, useEffect } from "react";
import CardsArea from "../components/CardsArea";
import styled from "styled-components";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { setCookie, parseCookies } from "nookies";

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
  .inputContainer:first-child div {
    margin-bottom: 10px;
  }
`;

export default function Home(props) {
  const [pokemons, setPokemons] = useState([...props.USER_POKEMONS]);

  const [test, setTest] = useState([]);

  const set = (obj) => {
    if (test.find((x) => x.id === obj.id)) {
      function replaceObject(array, objId, newObj) {
        const index = array.findIndex((x) => x.id === objId);
        if (index >= 0) {
          array[index] = newObj;
        } else {
          array = [...array, newObj];
        }
        return array;
      }

      console.log("test", test);
      const array = replaceObject(test, obj.id, obj);
      setTest(array);
    } else {
      setTest([...test, obj]);
    }
  };
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

  useEffect(() => {
    console.log("test", test);
    setCookie(null, "USER_TEST", JSON.stringify(test), {
      maxAge: 86400 * 7,
      path: "/",
    });
  }, [test]);

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
                label="ID or Name"
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
        <CardsArea pokemons={pokemons} setTest={set} />
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
