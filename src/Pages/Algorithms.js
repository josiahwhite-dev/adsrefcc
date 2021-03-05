import { Link, useHistory } from "react-router-dom";
import { ReactComponent as BackArrow } from "./icons/BackArrow.svg";
import styled from "styled-components";
import { TopWrapper, Title, media, Item } from "./Shared";

const AlgorithmsWrapper = styled.div`
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
  padding-left: 2%;
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

function Algorithms() {
  return (
    <AlgorithmsWrapper>
      <TopWrapper>
        <BackLink as={Link} to="/">
          <BackArrow />
        </BackLink>

        <Title>algorithms</Title>
      </TopWrapper>
      <BodyWrapper>
        <ItemRow>
          <DataType
            url="/binarysearch"
            colour="#7CED61"
            title="binary search"
            description={
              <div>
                <p>
                  a simple searching algorithm for arrays to find a given
                  element
                </p>
              </div>
            }
          />

          <DataType
            url="/quicksort"
            colour="#D586F8"
            title="quick sort"
            description={
              <div>
                <p>
                  an efficient sorting algorithm for arrays to order elements
                  from low to high
                </p>
              </div>
            }
          />
          <DataType
            url="/dijkstra"
            colour="#6BEBD8"
            title="dijkstra's algorithm"
            description={
              <div>
                <p>
                  an efficient algorithm for finding the shortest path between
                  nodes when the distances between them are known
                </p>
              </div>
            }
          />
          <DataType
            url="/bfs"
            colour="#FFE26A"
            title="BFS"
            description={
              <div>
                <p>
                  an efficient algorithm for finding the shortest path between
                  nodes when the distances between them aren't specified
                </p>
              </div>
            }
          />
          <DataType
            colour="#40B8ED"
            title="bubble sort"
            opacity="0.3"
            description={
              <div>
                <p>coming soon... </p>
              </div>
            }
          />
          <DataType
            colour="#FFA5B2"
            title="bucket sort"
            opacity="0.5"
            description={
              <div>
                <p>coming soon... </p>
              </div>
            }
          />
        </ItemRow>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default Algorithms;
