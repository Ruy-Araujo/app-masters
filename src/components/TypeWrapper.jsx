import { backgrounForType } from "../lib/pokemons";
import styled from "styled-components";

const TypeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const TypeBox = styled.div`
  width: 80px;
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

//Auto generate pokemon type box with dinamic colors
export default function TypeArea(props) {
  return (
    <TypeWrapper>
      {props.pokemon.types.map((e) => {
        return (
          <TypeBox
            theme={backgrounForType(e.type.name)}
            key={e.id + e.type.name}
          >
            {e.type.name.toUpperCase()}
          </TypeBox>
        );
      })}
    </TypeWrapper>
  );
}
