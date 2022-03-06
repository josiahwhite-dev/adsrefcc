import styled from "styled-components";
import {  media, Item } from "../Shared";

export const AlgorithmsWrapper = styled.div`
display: flex;
flex-direction: column;
position: absolute;
height: auto;
width: 100%;
background-color: #61dafb;
justify-content: center;
align-items: center;
overflow-x: scroll;

${media.mobile} {
  justify-content: center;
  align-items: center;
}
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  background-color: white;
  flex-grow: 20;
  align-items: flex-start;

  justify-content: space-evenly;
  overflow-y: visible;
  overflow-x: hidden;

  ${media.mobile} {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: flex-start
  }
`;

export const ItemRowDescription = styled.div`
  min-width: 40%;
  background-color: transparent;
  display: grid;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin-left: 10%;
  width: 100vw;
  overflow: visible;

  justify-content: space-evenly;
  ${media.mobile} {
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0%;
    padding-top: 2vh;
  }
`;

export const ItemRowContent = styled.div`
  max-width: 30vw;
  padding-left: 10vw;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  height: auto;
  margin-right: 10%;
  width: 100vw;

  justify-content: center;
  ${media.mobile} {
    justify-content: flex-start;
    align-items: center;
    min-width: 100vw
    height: 40vh;
    padding-left: 0vw;
    margin: 0%;
  }
`;

export const ArrayHolder = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
background-color: transparent;
height: auto;
padding-top: 2vh;

align-items: center;
overflow-y: visible;
overflow-x: hidden;

h1 {
  color: #535353;
  font-size: 4vh;
  font-weight: bold;
  animation: bob 3s infinite ease;
}

@keyframes bob {
  0% {
    transform: translate(0vh, 0vh);
  }
  50% {
    transform: translate(0vh, -2vh);
  }
  100% {
    transform: translate(0vh, 0vh);
  }
}

${media.mobile} {
  justify-content: flex-start;
  align-items: center;
  margin: 0%;
  height: 49vh;
  margin-left: 3vw;
}
`;


export const ArrayPosHolder = styled.div`
  display: grid;
  background-color: transparent;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr auto;

  ${media.mobile} {
    width: 100vw;
  }
`;

export function Info(props) {
  return (
    <Item style={{ backgroundColor: props.colour }}>
      <h1>{props.title}</h1>

      <div>{props.description}</div>
    </Item>
  );
}

export function MainInfo(props) {
  var screenSize;
  var itemPadding;
  if (window.innerWidth < 1024) {
    screenSize = "50vh";
    itemPadding = "2vh";
  } else {
    screenSize = "30vh";
    itemPadding = "0vh";
  }

  return (
    <Item
      id="mainInfo"
      style={{
        backgroundColor: props.colour,
        minHeight: screenSize,
        margin: itemPadding,
      }}
    >
      <h1>{props.title}</h1>

      <div>{props.description}</div>
    </Item>
  );
}