import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { TopWrapper, media } from "./Shared";

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #61dafb;
  justify-content: center;
  align-items: center;
`;

const BodyWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: honeydew;
  flex-grow: 20;
  align-items: center;
  justify-content: space-evenly;

  ${media.mobile} {
    justify-content: flex-start;
  }
`;

const Item = styled.div`
  width: 35%;
  height: 45%;
  border-radius: 4vw;
  min-width: 672px;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  p {
    font-size: 4em;
    font-weight: bolder;
    color: white;
  }

  ${media.mobile} {
    min-width: 0px;
    width: 80%;
    height: 25%;
    border-radius: 8vw;
    margin-top: 20%;

    p {
      font-size: calc(4vh + 1vw);
    }
  }
`;

const HomeTitle = styled.h1`
  font-size: 6vh;
  color: black;
  padding-left: 5%;
`;

function DataStructures() {
  return (
    <Item
      as={Link}
      to="/datastructures"
      style={{ backgroundColor: "#78FC59", textDecoration: "none" }}
    >
      <p style={{ paddingLeft: "10%" }}>data</p>
      <p
        style={{
          alignSelf: "flex-end",
          paddingRight: "3%",
        }}
      >
        structures
      </p>
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
      </TopWrapper>
      <BodyWrapper>
        <DataStructures />
        <Algorithms />
      </BodyWrapper>
    </HomeWrapper>
  );
}

export default Home;
