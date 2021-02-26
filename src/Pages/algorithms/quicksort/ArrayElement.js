import styled from "styled-components";
import { media } from "../../Shared";

const ElementWrapper = styled.div`
  width: 10vh;

  height: 10vh;
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
    width: 7vh;
    height: 7vh;
    border-radius: 2vh;
    p {
      font-size: 4vh;
    }
  }
`;

const ElementBackground = styled.div`
  position: relative;
  width: 10vh;
  height: 10vh;
  border-radius: 3vh;
  background-color: #a8a8a8;
  margin-top: 1vh;

  z-index: 1;
  margin-left: 2vh;

  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  ${media.mobile} {
    width: 7vh;
    height: 7vh;
    margin-left: 1vh;
    border-radius: 2vh;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;

  margin-right: 4vh;
  ${media.mobile} {
    margin: 1vh;
  }

  animation: bob 3s infinite ease;

  p {
    color: white;
    font-size: 3vh;
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
      <p style={{ color: props.textColour, marginLeft: "1vh" }}>
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
