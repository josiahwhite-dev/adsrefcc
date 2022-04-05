import styled from "styled-components";
import { media } from "../Shared";

const ElementWrapper = styled.div`
  width: calc(3vh + 3vw);
  height: calc(3vh + 3vw);
  margin-top: 1vh;

  border-radius: 3vh;
  background-color: #7c7c7c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-overflow: ellipsis;

  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  z-index: 2;
  position: relative;

  color: white;

  p {
    font-size: 5vh;
    font-weight: bold;
  }

  ${media.mobile} {
    width: calc(5vh + 3vw);
    height: calc(5vh + 3vw);
    border-radius: 2vh;
    p {
      font-size: 4vh;
    }
  }
`;

const ElementBackground = styled.div`
  position: relative;
  width: calc(3vh + 3vw);
  height: calc(3vh + 3vw);
  border-radius: 3vh;
  background-color: #a8a8a8;
  margin-top: 1vh;

  z-index: 1;
  margin-left: 2vh;

  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  ${media.mobile} {
    width: calc(5vh + 3vw);
    height: calc(5vh + 3vw);
    margin-left: 1vh;
    border-radius: 2vh;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;

  margin-right: 2vh;
  ${media.mobile} {
  }

  animation: bob 3s infinite ease;

  p {
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 0px;
    margin: 0px;
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
`;

export default function ArrayElement(props) {
  return (
    <Container>
      <p>{props.id}</p>
      <p style={{ color: props.textColour }}>
        {" "}
        {props.elementState}
      </p>
      <ElementWrapper style={{ backgroundImage: props.foreground }}>
        {props.textInsert}
      </ElementWrapper>
      <ElementBackground style={{ backgroundImage: props.background }} />
    </Container>
  );
}

