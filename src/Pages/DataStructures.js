import { Link } from "react-router-dom";
import { ReactComponent as BackArrow } from "./icons/BackArrow.svg";
import styled from "styled-components";
import { TopWrapper, Title, media, Item } from "./Shared";

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
  background-color: white;
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

const BackLink = styled.div`
  /* lets use react link */
`;

function DataType(props) {
  return (
    <Item
      BackLink
      as={Link}
      to={props.url}
      style={{ backgroundColor: props.colour, opacity: props.opacity }}
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
            colour="#F76146"
            title="array"
            url="/array"
            description={
              <div>
                <p>
                  "arrays store elements containing data right next to each
                  other (contiguously) in computer memory, making them ideal for
                  storing data you will be accessing regularly "
                </p>
              </div>
            }
          />
          <DataType
            colour="#40B8ED"
            opacity="0.3"
            title="vector"
            description={
              <div>
                <p>"coming soon... "</p>
              </div>
            }
          />
          <DataType
            colour="#7CED61"
            url="/linkedlist"
            title="linked list"
            description={
              <div>
                <p>
                  "linked lists store data in nodes that are allocated random
                  addresses in memory. this means inserting/removing data is
                  fast, but accessing is slow"
                </p>
              </div>
            }
          />
          <DataType
            colour="#FFA5B2"
            title="binary tree"
            opacity="0.5"
            description={
              <div>
                <p>"coming soon... "</p>
              </div>
            }
          />
          <DataType
            colour="#FFE26A"
            opacity="0.5"
            title="red black tree"
            description={
              <div>
                <p>"coming soon... "</p>
              </div>
            }
          />
        </ItemRow>
      </BodyWrapper>
    </DataStructuresWrapper>
  );
}

export default DataStructures;
