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
      style={{ backgroundColor: props.colour }}
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
            description="linked lists are a structure made
            up of nodes. nodes hold a data
            value, and know where the next
            node is by storing a pointer to it.
            this means insertions can easily
            be made, as it is only the pointers
            that need to be updated."
          />
          <DataType
            colour="#40B8ED"
            title="bubble sort"
            description="linked lists are a structure made
            up of nodes. nodes hold a data
            value, and know where the next
            node is by storing a pointer to it.
            this means insertions can easily
            be made, as it is only the pointers
            that need to be updated."
          />
          <DataType
            url="/quicksort"
            colour="#D586F8"
            title="quick sort"
            description="linked lists are a structure made
            up of nodes. nodes hold a data
            value, and know where the next
            node is by storing a pointer to it.
            this means insertions can easily
            be made, as it is only the pointers
            that need to be updated."
          />
          <DataType
            colour="#FFA5B2"
            title="bucket sort"
            description="linked lists are a structure made
            up of nodes. nodes hold a data
            value, and know where the next
            node is by storing a pointer to it.
            this means insertions can easily
            be made, as it is only the pointers
            that need to be updated."
          />
          <DataType
            url="/dijkstra"
            colour="#6BEBD8"
            title="dijkstra's algorithm"
            description="alinked lists are a structure made
            up of nodes. nodes hold a data
            value, and know where the next
            node is by storing a pointer to it.
            this means insertions can easily
            be made, as it is only the pointers
            that need t
            o be updated."
          />
          <DataType
            url="/bfs"
            colour="#FFE26A"
            title="BFS"
            description="alinked lists are a structure made
            up of nodes. nodes hold a data
            value, and know where the next
            node is by storing a pointer to it.
            this means insertions can easily
            be made, as it is only the pointers
            that need to be updated."
          />
        </ItemRow>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default Algorithms;
