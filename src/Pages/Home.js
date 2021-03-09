import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { TopWrapper, media } from "./Shared";

import { ReactComponent as Plus } from "./homeimages/plus.svg";
import { ReactComponent as QS } from "./homeimages/qs.svg";
import { ReactComponent as Dijkstra } from "./homeimages/dijkstra.svg";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: transparent;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const BodyWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: white;
  flex-grow: 20;
  align-items: center;
  justify-content: space-evenly;

  ${media.mobile} {
    justify-content: flex-start;
    margin-top: 10vh;
  }
`;

const HomeTitle = styled.h1`
  font-size: 6vh;
  color: black;
  padding-left: 5%;
`;

const Item = styled.div`
  min-width: 600px;
  min-height: 250px;
  width: 30vw;
  height: auto;
  margin: 1vw;
  border-radius: 4vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  margin-bottom: 1vh;
  text-decoration: none;
  text-align: center;

  h1 {
    font-size: calc(6vh + 1vw);
    font-weight: bolder;
    color: white;
    margin-left: 2vw;
    margin-right: 2vw;
  }
  p {
    font-size: 2vh;
    font-weight: bolder;
    color: white;
    margin-left: 2vw;
    margin-right: 2vw;
    margin-bottom: 2vh;
    margin-top: 2vh;
    transform: translateY(-30%);
    text-align: justify;
    text-justify: inter-word;
  }

  ${media.mobile} {
    min-width: 150px;
    min-height: 100px;
    width: 90vw;
    border-radius: 8vh;
  }
`;

const IconHolder = styled.div`
  position: absolute;

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

  ${media.mobile} {
    display: none;
  }
`;

function DataStructures(props) {
  return (
    <Item
      BackLink
      as={Link}
      to={props.url}
      style={{ backgroundColor: props.colour }}
    >
      <h1>{props.title}</h1>

      <p>{props.description}</p>
    </Item>
  );
}

function Algorithms() {
  return (
    <Item
      as={Link}
      to="/algorithms"
      style={{ backgroundColor: "#6DD3CE", textDecoration: "none" }}
    >
      <p style={{ paddingLeft: "10%" }}>algorithms</p>
    </Item>
  );
}

function Home() {
  return (
    <HomeWrapper>
      <TopWrapper>
        <HomeTitle>adsref.cc</HomeTitle>
        <IconHolder>
          <Plus
            style={{
              position: "absolute",
              top: "60vh",
              left: "10vw",
              width: "15vw",
            }}
          />
          <QS
            style={{
              position: "absolute",
              top: "10vh",
              left: "9vw",
              width: "18vw",
            }}
          />
          <Dijkstra
            style={{
              position: "absolute",
              top: "20vh",
              left: "72vw",
              width: "28vw",
            }}
          />
        </IconHolder>
      </TopWrapper>
      <BodyWrapper>
        <DataStructures url="/algorithms" colour="#85DEDA" title="algorithms" />
        <DataStructures
          url="/datastructures"
          colour="#8CE278"
          title="data structures"
        />
      </BodyWrapper>
    </HomeWrapper>
  );
}

export default Home;
