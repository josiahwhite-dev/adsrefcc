import { Link, useHistory } from "react-router-dom";
import { ReactComponent as BackArrow } from "./icons/BackArrow.svg";
import styled from "styled-components";
import { TopWrapper, Title, media } from "./Shared";

const DataStructuresWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #61dafb;
  justify-content: center;
  align-items: center;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: honeydew;
  flex-grow: 20;
  align-items: center;
  justify-content: space-evenly;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ItemRow = styled.div`
  width: 66%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  overflow: visible;

  justify-content: space-evenly;
  ${media.mobile} {
    justify-content: center;
    align-items: center;
    width: 80%;
  }
`;

const Item = styled.div`
  min-width: 300px;
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

  h1 {
    font-size: 8vh;
    font-weight: bolder;
    color: white;
  }
  p {
    font-size: 2vh;
    font-weight: bolder;
    color: white;
    margin: 2vh;
    margin-top: 4vh;
    transform: translateY(-30%);
  }

  ${media.mobile} {
    width: 90vw;
    border-radius: 8vh;
  }
`;

const BackLink = styled.div`
  /* lets use react link */
`;

function DataType(props) {
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

function DataStructures() {
  return (
    <DataStructuresWrapper>
      <TopWrapper>
        <BackLink as={Link} to="/" style={{ paddingLeft: "2%" }}>
          <BackArrow />
        </BackLink>

        <Title>data structures</Title>
      </TopWrapper>
      <BodyWrapper>
        <ItemRow>
          <DataType
            colour="#F06449"
            title="array"
            url="/array"
            description="arrays are data structures that store data
right next to each other in computer 
memory, making them ideal for storing 
data you will be accessing regularly "
          />
          <DataType
            colour="#6DD3CE"
            title="vector"
            description="arrays are data structures that store data
right next to each other in computer 
memory, making them ideal for storing 
data you will be accessing regularly "
          />
          <DataType
            colour="#78FC59"
            url="/linkedlist"
            title="linked list"
            description="arrays are data structures that store data
right next to each other in computer 
memory, making them ideal for storing 
data you will be accessing regularly "
          />
          <DataType
            colour="#FFA5B2"
            title="bst"
            description="arrays are data structures that store data
right next to each other in computer 
memory, making them ideal for storing 
data you will be accessing regularly "
          />
          <DataType
            colour="#F3D34A"
            title="red black tree"
            description="arrays are data structures that store data
right next to each other in computer 
memory, making them ideal for storing 
data you will be accessing regularly "
          />
        </ItemRow>
      </BodyWrapper>
    </DataStructuresWrapper>
  );
}

export default DataStructures;
