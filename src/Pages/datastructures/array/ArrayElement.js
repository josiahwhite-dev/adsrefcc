import styled from "styled-components";
import { media } from "../../Shared";

const ElementWrapper = styled.div`
  width: 10vh;
  height: 10vh;

  border-radius: 3vh;
  background-color: #6dd3ce;
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
  background-color: #63c4bf;

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
      <ElementWrapper>
        <p>{props.value}</p>
      </ElementWrapper>
      <ElementBackground />
    </Container>
  );
}
