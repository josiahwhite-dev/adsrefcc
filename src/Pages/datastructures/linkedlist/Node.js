import styled from "styled-components";
import { media } from "../../Shared";
import { useState } from "react";

const NodeWrapper = styled.div`
  width: 12vh;
  height: 12vh;

  border-radius: 50%;
  background-color: #72ff98;
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
    width: 10vh;
    height: 10vh;
  }
`;

const NodeBackground = styled.div`
  position: relative;
  width: 12vh;
  height: 12vh;
  border-radius: 50%;
  background-color: #9bffb6;

  z-index: 1;
  margin-left: 2vh;

  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  ${media.mobile} {
    width: 10vh;
    height: 10vh;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin: 2vh;
  margin-left: 0vh;

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

const SVGLine = styled.svg`
  /*grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
  overflow: visible;
  z-index: 20;*/
  position: absolute;
  overflow: visible;
`;

const SVGLineBackground = styled.svg`
  position: absolute;
  grid-column-start: 1;
  grid-column-end: 10;
  grid-row-start: 1;
`;

export default function Node(props) {
  if (props.startNode) {
    // console.log("FirstX: " + props.startNode.getBoundingClientRect().x);
    console.log("FirstY: " + props.startNode.getBoundingClientRect().y);
    console.log("Second: " + props.endNode.getBoundingClientRect().y);
    console.log(
      "HolderRef: " + props.holderRef.current.getBoundingClientRect().right
    );
    console.log(
      "RealPadding: " + props.paddingRef.current.getBoundingClientRect().right
    );
    console.log("NodeX: " + props.startNode.getBoundingClientRect().right);
  }
  let truePadding;
  let averageRef;
  let averagePadding;

  if (props.startNode) {
    truePadding =
      props.holderRef.current.getBoundingClientRect().x +
      props.paddingRef.current.getBoundingClientRect().x;
  }

  //let test = props.startNode.getBoundingClientRect().y +

  return (
    <Container>
      <NodeWrapper
        style={{
          transform: props.movement,
        }}
      >
        <p>{props.value}</p>
      </NodeWrapper>
      <NodeBackground
        style={{
          transform: props.movement,
        }}
      />
      <SVGLine>
        {props.startNode && (
          <line
            x1={
              props.startNode.getBoundingClientRect().x -
              (props.holderRef.current.getBoundingClientRect().x +
                props.paddingRef.current.getBoundingClientRect().x)
            }
            x2={1}
            y1={
              (props.startNode.getBoundingClientRect().y +
                props.startNode.getBoundingClientRect().bottom) /
                2 -
              props.startNode.getBoundingClientRect().y
            }
            y2={
              (props.endNode.getBoundingClientRect().y +
                props.endNode.getBoundingClientRect().bottom) /
                2 -
              props.startNode.getBoundingClientRect().y
            }
            stroke="#72ff98"
            strokeWidth={"2vh"}
          />
        )}
      </SVGLine>
      <SVGLine style={{ transform: "translate(1vh,0vh)", zIndex: "-1" }}>
        {props.startNode && (
          <line
            x1={
              (props.holderRef.current.getBoundingClientRect().x +
                props.holderRef.current.getBoundingClientRect().right) /
                2 -
              truePadding
            }
            x2={
              (props.holderRef.current.getBoundingClientRect().x +
                props.holderRef.current.getBoundingClientRect().right) /
                2 -
              truePadding
            }
            y1={
              (props.startNode.getBoundingClientRect().y +
                props.startNode.getBoundingClientRect().bottom) /
                2 -
              props.startNode.getBoundingClientRect().y
            }
            y2={
              (props.endNode.getBoundingClientRect().y +
                props.endNode.getBoundingClientRect().bottom) /
                2 -
              props.startNode.getBoundingClientRect().y
            }
            stroke="#9bffb6"
            strokeWidth={"2vh"}
          />
        )}
      </SVGLine>
    </Container>
  );
}
