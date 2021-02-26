import { Link, useHistory } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../icons/BackArrow.svg";
import styled from "styled-components";
import { TopWrapper, Title, media } from "../../Shared";
import Node from "./Node";
import NodeLine from "./NodeLine";
import React, { useState, useEffect, useRef } from "react";
import Xarrow from "react-xarrows";
import Sketch from "react-p5";

const AlgorithmsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #61dafb;
  justify-content: center;
  align-items: center;

  ${media.mobile} {
    justify-content: center;
    align-items: center;
  }
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: honeydew;
  flex-grow: 20;
  align-items: center;
  justify-content: space-evenly;
  overflow-y: scroll;
  overflow-x: hidden;

  ${media.mobile} {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: flex-end;
  }
`;

const ItemRowDescription = styled.div`
  width: 66%;
  background-color: purple;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-left: 10%;
  width: 100vw;

  justify-content: space-evenly;
  ${media.mobile} {
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0%;
  }
`;

const ItemRowContent = styled.div`
  width: 66%;
  background-color: orange;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-right: 10%;
  width: 100vw;

  justify-content: space-evenly;
  ${media.mobile} {
    justify-content: center;
    align-items: center;
    width: 100%;

    height: 60vh;
    margin-top: "30vh";
    margin: 0%;
  }
`;

const Item = styled.div`
  min-width: 300px;
  width: 30vw;
  height: 35vh;
  margin: 1vw;
  border-radius: 4vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-overflow: ellipsis;

  h1 {
    font-size: 8vh;
    font-weight: bolder;
    color: white;
  }
  p {
    font-size: 2vh;
    font-weight: bolder;
    color: white;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 10%;
    transform: translateY(-30%);
  }
`;

const InputValue = styled.input`
  border: 0;
  background-color: #e8e8e8;

  border-radius: 4vh;
  text-align: center;
  font-size: 4vh;
  padding: 2vh;
  margin-top: 2vh;
  max-width: 15vw;
  font-weight: bold;
  color: #535353;
  outline: none;
  ${media.mobile} {
    max-width: none;
    border-radius: 2vh;
    width: 10vh;
    height: 2vh;
    margin-top: 0vh;
  }
`;

const AddButton = styled.div`
  display: flex;
  width: 10vh;
  height: 10vh;
  background-color: #78fc59;
  border-radius: 4vh;
  margin-top: 2vh;
  margin-left: 2vh;
  align-items: center;

  justify-content: center;

  p {
    font-weight: bold;
    color: white;
    font-size: 7vh;
  }

  ${media.mobile} {
    border-radius: 2vh;
    width: 6vh;
    height: 6vh;
    margin-top: 0vh;

    p {
      font-size: 5vh;
    }
  }
`;

const MinusButton = styled.div`
  display: flex;
  width: 10vh;
  height: 10vh;
  background-color: #f06449;
  border-radius: 4vh;
  margin-top: 2vh;
  margin-left: 2vh;
  align-items: center;

  justify-content: center;

  p {
    font-weight: bold;
    color: white;
    font-size: 7vh;
  }

  ${media.mobile} {
    border-radius: 2vh;
    width: 6vh;
    height: 6vh;
    margin-top: 0vh;
    p {
      font-size: 5vh;
    }
  }
`;

const NodeHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;

  background-color: red;
  height: 58vh;
  width: 30vw;
  padding-top: 2vh;

  overflow-y: auto;
  overflow-x: hidden;
  ${media.mobile} {
    justify-content: flex-start;
    align-items: center;
    width: 80%;
    margin: 0%;
    height: 49vh;
    margin-top: "30vh";
  }
`;

const ControlHolder = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 12vh;
  margin-bottom: 2vh;
  align-items: center;
  justify-content: center;

  z-index: 10000;
  background-color: blue;
  ${media.mobile} {
    height: 7vh;
    width: 100%;
    margin-bottom: 0vh;
  }
`;

const BackLink = styled.div`
  /* lets use react link */
  padding-left: 2%;
`;

function Info(props) {
  return (
    <Item style={{ backgroundColor: props.colour }}>
      <h1>{props.title}</h1>

      <p>{props.description}</p>
    </Item>
  );
}

function OldLinkedList() {
  const [nodeLink, setNodeLink] = useState([]);
  const [nodeValue, setNodeValue] = useState(10);
  const [nodeRotation, setNodeRotation] = useState("");
  const [nodeMovement, setNodeMovement] = useState("");
  const [indexToRemove, setIndexToRemove] = useState(null);
  const [nodeID, setNodeID] = useState(0);
  const [shouldChange, setShouldChange] = useState(0);

  //For Links Between

  const allNodeRefs = useRef([]);

  const holderRef = useRef();
  const paddingRef = useRef();

  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);

  const [test, setTest] = useState(0);

  const [realPadding, setRealPadding] = useState(0);

  const [movement, setMovement] = useState(0);

  function testClick() {
    /*
    const pleaseWork = nodeRef.current;
    const pleaseWorkv2 = nodeRef.current.getBoundingClientRect().x;
    setTestUpdater(pleaseWorkv2);

    console.log(pleaseWork);
    console.log(pleaseWorkv2);*/

    console.log("First: ");
    console.log(allNodeRefs.current[0]);

    console.log("Second: ");
    console.log(allNodeRefs.current[1]);
    console.log(allNodeRefs.current[1]);
    console.log("Third: ");
    console.log(allNodeRefs.current[2]);

    console.log(allNodeRefs);

    console.log("TESTREF: " + holderRef.current.getBoundingClientRect().x);
    console.log("PADDING: " + paddingRef.current.getBoundingClientRect().x);

    setRealPadding(
      holderRef.current.getBoundingClientRect().x -
        paddingRef.current.getBoundingClientRect().x
    );

    setTest(test + 1);
  }

  useEffect(() => {
    for (let i = 0; i < allNodeRefs.current.length; i++) {
      console.log(allNodeRefs.current[i].getBoundingClientRect().y);
    }

    let newNodeLink = [...nodeLink];

    for (let i = 0; i < nodeLink.length - 1; i++) {
      newNodeLink[i].startNode = allNodeRefs.current[i];
      newNodeLink[i].endNode = allNodeRefs.current[i + 1];
    }

    setNodeLink(newNodeLink);
  }, [test]);

  //For getting coordinates

  const movementMap = ["2vw", "-2vw"];

  //1 and 3 are the same
  const nodeMovementMap = ["2vw", "-2vw"];

  //Will run through 3 possible states
  const [movementIterator, setMovementIterator] = useState(0);
  const [transform, setTransform] = useState(movementMap[movementIterator]);

  const [nodeTransform, setNodeTransform] = useState(
    nodeMovementMap[movementIterator]
  );

  const initialNode = useEffect(() => {
    setNodeLink([
      ...nodeLink,
      {
        nodeValue,
        nodeRotation,
        nodeMovement,
        nodeID,
        transform,
        nodeTransform,
        startNode,
        endNode,
        holderRef,
        paddingRef,
        movement,
      },
    ]);
    setNodeID(nodeID + 1);
    setMovementIterator(1);

    setNodeValue(null);
  }, []);

  function onAdd(newRotation, newMovement) {
    setNodeLink([
      ...nodeLink,
      {
        nodeValue,
        nodeRotation,
        nodeMovement,
        nodeID,
        transform,
        nodeTransform,
        startNode,
        endNode,
        holderRef,
        paddingRef,
        movement,
      },
    ]);

    if (movementIterator < 1) {
      setMovementIterator(movementIterator + 1);
    } else {
      setMovementIterator(0);
    }
    setNodeID(nodeID + 1);
    setMovement(movement + 1);

    console.log(movement);
    console.log(nodeID);
  }

  //Moves the movement iterator up before the transformer gets updated
  useEffect(() => {
    setTransform(movementMap[movementIterator]);
    setNodeTransform(nodeMovementMap[movementIterator]);
  }, [movementIterator]);

  function handleRemoveItem() {
    setIndexToRemove(
      //Dont need to find index, but ID instead!
      //This finds the index at which the first value we want to remove is at
      nodeLink.findIndex((node) => node.nodeValue === nodeValue)
    );

    setShouldChange(shouldChange + 1);

    /* setNodeLink(nodeLink.filter((node) => node.nodeValue !== nodeValue));*/
  }

  const RemoveNode = useEffect(() => {
    //Stops from accessing undefined
    //Should change means that it is called whenever button pressed, cause ID can be same as before
    if (shouldChange > 0 && typeof nodeLink[indexToRemove] !== "undefined") {
      //Checks if current ID is the same as the ID at the index to remove in the array
      //If so, removes
      setNodeLink(
        nodeLink.filter(
          (node) => node.nodeID !== nodeLink[indexToRemove].nodeID
        )
      );

      //Not working - is supposed to move the index back, will need to use hooks though
      let i;
      for (i = indexToRemove; i < nodeLink.length; i++) {
        nodeLink[i].nodeTransform = nodeLink[i - 1].nodeTransform;
      }
    }
  }, [shouldChange]);

  return (
    <AlgorithmsWrapper>
      <TopWrapper>
        <BackLink as={Link} to="/datastructures">
          <BackArrow />
        </BackLink>

        <Title>linked list</Title>
      </TopWrapper>

      <p
        style={{
          position: "absolute",
          left: "190.5px",
        }}
      >
        Padding Left
      </p>

      <p
        style={{
          position: "absolute",
          left: "1045.5px",
        }}
      >
        Holder Left
      </p>

      <p
        style={{
          position: "absolute",
          left: "952.5px",
        }}
      >
        Padding Right
      </p>

      <p
        style={{
          position: "absolute",
          left: "1621.5px",
        }}
      >
        Holder Right
      </p>

      <p
        style={{
          position: "absolute",
          left: "1621.5px",
        }}
      >
        Node Left
      </p>
      <BodyWrapper>
        <ItemRowDescription ref={paddingRef}>
          <Info
            colour="#F06449"
            title="description"
            description="linked lists are a structure made
            up of nodes. nodes hold a data
            value, and know where the next
            node is by storing a pointer to it.
            this means insertions can easily
            be made, as it is only the pointers
            that need to be updated."
          />
          <Info
            colour="#6DD3CE"
            title="use cases"
            description="llinked lists are best used in applications
            where data will often be updated,
            as inserting an element is inexpensive.
            however, this comes at the cost of
            a greater access cost than an array.  
            "
          />
        </ItemRowDescription>

        <ItemRowContent>
          {/*   <Node value={10} />
          <NodeLine
            rotation={"translate(-2vh, 1vh) rotate(-20deg) "}
            movement={"5vw"}
          />
          <Node value={20} movement={"5vw"} />
          <NodeLine
            rotation={"translate(-3vh, 0vh) rotate(20deg) "}
            movement={"5vw"}
          />
          <Node value={30} movement={"-5vw"} />*/}
          <NodeHolder ref={holderRef}>
            {nodeLink.map(
              ({
                nodeValue,
                nodeID,
                transform,
                nodeTransform,
                startNode,
                endNode,
                holderRef,
                paddingRef,
                movement,
              }) => (
                <React.Fragment>
                  <div
                    ref={(el) => (allNodeRefs.current[nodeID] = el)}
                    style={{
                      overflow: "visible",
                      backgroundColor: "green",

                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                      //marginLeft: nodeTransform,
                    }}
                  >
                    {/*ref={nodeRef}>*/}
                    <Node
                      value={nodeValue}
                      id={nodeID}
                      //movement={nodeTransform}
                      startNode={startNode}
                      endNode={endNode}
                      holderRef={holderRef}
                      paddingRef={paddingRef}
                    />
                  </div>

                  {/*<NodeLine coordinates={lineCoordinates} />*/}
                </React.Fragment>
              )
            )}
          </NodeHolder>

          <ControlHolder>
            <InputValue
              placeholder="value"
              onChange={(event) => setNodeValue(event.target.value)}
            />
            <AddButton onClick={() => onAdd()}>
              <p id="elem1">+</p>
            </AddButton>
            <AddButton onClick={() => testClick()}>
              <p id="elem2">U</p>
            </AddButton>
            <MinusButton onClick={() => handleRemoveItem()}>
              <p>-</p>
            </MinusButton>
            <Xarrow
              start="eme1" //can be react ref
              end="elem2" //or an id
            />
          </ControlHolder>
        </ItemRowContent>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default OldLinkedList;
