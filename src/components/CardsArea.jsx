import styled from "styled-components";
import React from "react";
import Image from "next/image";
import Rating from "@material-ui/lab/Rating";
import Switch from "@material-ui/core/Switch";
import { sortPokemons, formatName, backgrounForType } from "../lib/pokemons";
import TypeWrapper from "./TypeWrapper";

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

export default function Cards(props) {
  return (
    <CardsArea>
      {sortPokemons(props.pokemons).map((pokemon) => {
        const pokemonID = pokemon.id;
        const pokemonType = pokemon.types[0].type.name;
        const pokemonPic =
          pokemon.sprites.other["official-artwork"].front_default;

        return (
          <Card key={pokemonID + "a"} theme={backgrounForType(pokemonType)}>
            <div className="favoriteContainer">
              <Rating
                defaultValue={0}
                max={1}
                size="large"
                name={pokemonID + "favorite"}
              />
            </div>

            <div className="imgContainer">
              <Image
                src={pokemonPic}
                alt={pokemon.name}
                layout="fill"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP0rwcAASMA0Na265IAAAAASUVORK5CYII="
              />
            </div>
            <ContentWrapper>
              <h5 className="title">{formatName(pokemon)}</h5>
              <TypeWrapper pokemon={pokemon} />

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
                  className="rating"
                  name={pokemonID + "rating"}
                />
                Gotcha
                <Switch color="primary" name={pokemonID + "gotcha"} />
              </div>
            </ContentWrapper>
          </Card>
        );
      })}
    </CardsArea>
  );
}
