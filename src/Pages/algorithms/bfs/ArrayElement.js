import styled from "styled-components";
import { media } from "../../Shared";

const ElementWrapper = styled.div`
  width: 10vh;
  height: 10vh;

  border-radius: 50%;
  background-color: #7c7c7c;

  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 2;
  color: white;

  p {
    font-size: 5vh;
    font-weight: bold;
  }
`;

const ElementBackground = styled.div`
  position: relative;
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  background-color: #a8a8a8;

  margin-left: 2vh;

  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
`;

const Container = styled.div`
  background-color: purple;
  display: grid;

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
  console.log(props.value);
  return (
    <Container>
      <p style={{ color: props.textColour, marginLeft: "1vh" }}></p>
      <ElementWrapper style={{ backgroundImage: props.foreground }}>
        <p> {props.value}</p>
      </ElementWrapper>
      <ElementBackground style={{ backgroundImage: props.background }} />
    </Container>
  );
}
