import styled from "styled-components";
import React from "react";
import Image from "next/image";
import Rating from "@material-ui/lab/Rating";
import Switch from "@material-ui/core/Switch";

const CardsArea = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
`;

const Card = styled.li`
  width: 300px;
  height: 550px;
  border-radius: 12px;
  background-color: ${(props) => props.theme};
  margin: 10px;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;

  .favoriteContainer {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: flex-end;
  }

  .imgContainer {
    width: 200px;
    height: 200px;
    position: relative;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin-bottom: -40px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 340px;
  border-radius: 40px 40px 12px 12px;
  background-color: #fafafa;

  @font-face {
    font-family: "ABeeZee";
    src: url("https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&display=swap");
  }

  .title {
    margin: 0;
    text-align: center;
    font-size: 24px;
    color: #4f4f4f;
    font-family: "sans-serif";
    padding-top: 40px;
    font-weight: normal;
    font-style: italic;
  }

  .typeContainer {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }

  .statsContainer {
    width: 100%;
    height: 150px;
    padding: 10px;
    overflow: hidden;
  }

  .footer {
    width: 100%;

    position: absolute;
    bottom: 0;
    padding: 10px;

    display: flex;
    justify-content: space-evenly;
    align-items: center;
  }
`;

const TypeContainer = styled.div`
  width: 70px;
  height: 25px;
  border-radius: 20px;
  background-color: ${(props) => props.theme};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 10px 5px;
  text-align: center;
  font-size: 0.9em;
  line-height: 25px;
  color: #fafafa;
`;

export default function Cards(props) {
  function sortPokemons(pokemonList) {
    return pokemonList.sort((poke1, poke2) => (poke1.id > poke2.id ? 1 : -1));
  }

  function formatedName(pokemon) {
    return `${pokemon.id}. ${
      pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    }`;
  }

  function backgrounForType(pokemonType) {
    const pokemonTypeColor = {
      default: "#FCFCFC",
      fire: "#FF0000",
      water: "#559EDF",
      grass: "#55DF9E",
      bug: "#A8B820",
      electric: "#FFFF00",
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

  return (
    <CardsArea>
      {sortPokemons(props.pokemons).map((pokemon) => {
        const pokemonID = pokemon.id;
        const pokemonType = pokemon.types[0].type.name;

        const pokemonPic =
          pokemon.sprites.other["official-artwork"].front_default;

        return (
          <Card key={pokemonID} theme={backgrounForType(pokemonType)}>
            <div className="favoriteContainer">
              <Rating
                defaultValue={0}
                max={1}
                name={pokemonID + "a"}
                size="large"
              />
            </div>
            <div className="imgContainer">
              <Image src={pokemonPic} alt={pokemon.name} layout="fill" />
            </div>
            <ContentWrapper>
              <h5 className="title">{formatedName(pokemon)}</h5>

              <div className="typeContainer">
                {pokemon.types.map((e) => {
                  return (
                    <TypeContainer theme={backgrounForType(e.type.name)}>
                      {e.type.name.toUpperCase()}
                    </TypeContainer>
                  );
                })}
              </div>

              <div className="statsContainer">
                Quisque pellentesque lectus nec diam ornare aliquet. Phasellus
                ante mi, vulputate id augue quis, maximus vulputate erat.
                Praesent nulla libero, aliquam ac risus non, elementum
                ullamcorper orci.
              </div>

              <div className="footer">
                Rate
                <Rating
                  defaultValue={0}
                  name={pokemonID + "b"}
                  className="rating"
                />
                Gotcha
                <Switch color="primary" name={pokemonID + "c"} />
              </div>
            </ContentWrapper>
          </Card>
        );
      })}
    </CardsArea>
  );
}
