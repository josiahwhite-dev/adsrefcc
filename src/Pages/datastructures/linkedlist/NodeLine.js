import styled, { keyframes } from "styled-components";

const NodeLineStyle = styled.div`
  position: absolute;

  height: 5vh;
  width: 2vh;
  background-color: #72ff98;

  z-index: 20;

  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

const NodeLineStyleBackground = styled.div`
  position: absolute;

  height: 5vh;
  width: 2vh;
  background-color: #9bffb6;
  z-index: 10;
  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  margin-left: 0.8vh;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;
/*margin-left: 0.8vh;
  margin-top: 2.4vh; */

const SVGLine = styled.svg`
  position: absolute;
  overflow: visible;
  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;

  top: 0px;

  z-index: 20;
`;

const SVGLineBackground = styled.svg`
  position: absolute;
  top: 0px;

  overflow: visible;
  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
`;

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vh;
  z-index: 10000;
  overflow: visible;

  margin: 0vh;

  animation: bob 3s infinite ease;

  @keyframes bob {
    0% {
      transform: translate(0vh, 0vh);
    }
    50% {
      transform: translate(0vh, -1vh);
    }
    100% {
      transform: translate(0vh, 0vh);
    }
  }
`;

export default function NodeLine(props) {
  console.log(props.coordinates);

  return (
    <Container>
      {/*<NodeLineStyle
        style={{
          transform: props.movement,
        }}
      />
      <NodeLineStyleBackground
        style={{
          transform: props.movement,
        }}
      />*/}
      <SVGLine>
        {props.startNode && (
          <line
            x1={
              props.startNode.getBoundingClientRect().x -
              props.holderRef.getBoundingClientRect().x
            }
            x2={
              props.endNode.getBoundingClientRect().x -
              props.holderRef.getBoundingClientRect().x
            }
            y1={
              props.startNode.getBoundingClientRect().y -
              props.holderRef.getBoundingClientRect().y
            }
            y2={
              props.endNode.getBoundingClientRect().y -
              props.holderRef.getBoundingClientRect().y
            }
            stroke="#72ff98"
            strokeWidth={"2vh"}
          />
        )}
      </SVGLine>

      <SVGLineBackground>
        {props.startNode && (
          <line
            x1={0}
            x2={0}
            y1={10}
            y2={10}
            stroke="#72ff98"
            strokeWidth={"2vh"}
          />
        )}
      </SVGLineBackground>
    </Container>
  );
}

/* /// OLD /// */

/* import styled from "styled-components";

const NodeLineStyle = styled.div`
  position: relative;

  height: 7vh;
  width: 2vh;
  background-color: #72ff98;
  transform: rotate(10deg);
  z-index: 20;

  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

const NodeLineStyleBackground = styled.div`
  position: relative;

  height: 7vh;
  width: 2vh;
  background-color: #9bffb6;
  transform: rotate(10deg);
  z-index: 10;
  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  margin-left: 0.4vw;
  margin-top: 2vh;
  margin-bottom: 2vh;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  margin: 0vh;

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

export default function NodeLine(props) {
  return (
    <Container
      style={{
        transform: props.rotation,
        paddingLeft: props.movement,
      }}
    >
      <NodeLineStyle />
      <NodeLineStyleBackground />
    </Container>
  );
}
 */
