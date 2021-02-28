import { Link, useHistory } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../icons/BackArrow.svg";
import styled from "styled-components";
import { TopWrapper, Title, media } from "../../Shared";

import React, { useState, useEffect, useRef } from "react";
import Sketch from "react-p5";
import p5 from "p5";

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

  justify-content: center;
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
  max-width: 10vw;
  font-weight: bold;
  color: #535353;
  outline: none;
  margin-left: 1vh;
  margin-right: vh;
  ${media.mobile} {
    max-width: none;
    border-radius: 2vh;
    width: 10vh;
    height: 2vh;
    margin-top: 0vh;
    font-size: 3vh;
    padding-left: 1vh;
    padding-right: 1vh;
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

const BFSHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  background-color: red;
  height: 45vh;
  width: 38vw;
  padding-top: 2vh;

  overflow-y: visible;
  overflow-x: hidden;

  h1 {
    color: #535353;
    font-size: 4vh;
    font-weight: bold;
    animation: bob 3s infinite ease;
  }

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
    justify-content: flex-start;
    align-items: center;
    width: 100vw;
    margin: 0%;
    height: 49vh;
    margin-top: "30vh";
  }
`;

const BFSRow = styled.div`
  display: grid;

  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`;

const ControlHolder = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  height: 12vh;
  margin-bottom: 2vh;
  align-items: center;
  justify-content: center;

  z-index: 0;
  background-color: blue;
  ${media.mobile} {
    height: 7vh;
    width: 100%;
    margin-bottom: 0vh;
  }
`;

const ArrayPosHolder = styled.div`
  display: grid;
  background-color: orange;

  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr auto;

  ${media.mobile} {
    width: 100vw;
  }
`;

const BackLink = styled.div`
  /* lets use react link */
  padding-left: 2%;
`;

const TextInsert = styled.input`
  font-size: 5vh;
  width: 8vh;

  text-align: center;
  font-weight: bolder;
  background: none;
  border: none;

  color: #ffffff;
  ::placeholder {
    color: white;
  }

  outline: none;
`;

function Info(props) {
  return (
    <Item style={{ backgroundColor: props.colour }}>
      <h1>{props.title}</h1>

      <p>{props.description}</p>
    </Item>
  );
}

function Dijkstra() {
  const holderRef = useRef();
  //Frame
  const [globalWidth, setGlobalWidth] = useState(0);
  const [globalHeight, setGlobalHeight] = useState(0);

  //Nodes
  const [nodeLink, setNodeLink] = useState([]);
  const [nodeValue, setNodeValue] = useState(37);
  const [nodeID, setNodeID] = useState(0);
  const [nodeNext, setNodeNext] = useState(null);
  const [nodeX, setNodeX] = useState(200);
  const [nodeY, setNodeY] = useState(200);
  const [looper, setLooper] = useState(0);
  const [changer, setChanger] = useState(0);
  const [matrixLoaded, setMatrixLoaded] = useState(false);
  const [nodesSet, setNodesSet] = useState(false);

  const [frameWidth, setFrameWidth] = useState();
  const [frameHeight, setFrameHeight] = useState();

  const [isRendered, setIsRendered] = useState(0);

  const a = useEffect(() => {
    if (holderRef.current.getBoundingClientRect().width > 0) {
      setFrameWidth(holderRef.current.getBoundingClientRect().width);
      setFrameHeight(holderRef.current.getBoundingClientRect().height);
    }
  }, [holderRef.current, isRendered]);

  window.addEventListener("resize", function () {
    // your custom logic
  });

  const [adjacencyMatrix, setAdjacencyMatrix] = useState([
    [0, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 1, 1, 0],
  ]);

  const [costMatrix, setCostMatrix] = useState([
    [0, 1, 1, 0, 0, 0, 0],
    [1, 0, 0, 1, 1, 0, 0],
    [1, 0, 0, 1, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 1, 1, 0],
  ]);

  const createNodes = useEffect(() => {
    if (looper < 7) {
      var Node = {
        x: nodeX,
        y: nodeY,
        value: nodeValue,
        id: nodeID,
        r: 100,
        distance: [],
        colour: "#72ff98",
        bgColour: "#9bffb6",
        active: false,
        connections: [],
      };

      setNodeLink([...nodeLink, Node]);

      if (looper < 6) {
        setChanger(changer + 1);
      }
    } else {
      for (let i = 0; i < adjacencyMatrix.length; i++) {
        for (let j = 0; j < adjacencyMatrix.length; j++) {
          if (adjacencyMatrix[i][j] == 1 && adjacencyMatrix[j][i]) {
            nodeLink[i].connections.push(nodeLink[j]);
          }
        }

        for (let j = 0; j < nodeLink.length; j++) {
          console.log("Number", j, ": ", nodeLink[j].connections);
        }
      }
      setMatrixLoaded(true);
    }
  }, [looper]);

  const updateValues = useEffect(() => {
    setNodeValue(Math.floor(Math.random() * 99));

    if (looper % 2 != 0) {
      setNodeX(nodeX + globalWidth / 10);
    } else {
      setNodeX(nodeX - globalWidth / 10);
    }
    setNodeY(nodeY + globalHeight / 8);
    setNodeID(nodeID + 1);

    setLooper(looper + 1);
  }, [changer]);

  const setNexts = useEffect(() => {
    if (looper > 6) {
      let temp = [...nodeLink];

      for (let j = 0; j < nodeLink.length - 1; j++) {
        temp[j].next = temp[j + 1];
      }

      setNodeLink(temp);
    }
  }, [looper]);

  console.log(nodeLink);

  function setup(p5, canvasParentRef) {
    setIsRendered(isRendered + 1);
    setGlobalWidth(frameWidth);
    setGlobalHeight(frameHeight);

    p5.createCanvas(frameWidth, frameHeight * 0.8).parent(canvasParentRef);

    /* let newXY = [...nodeLink];
    let currX = frameWidth / 10;
    let currY = (frameHeight * 0.8) / 2;

    for (let i = 0; i < nodeLink.length; i++) {
      console.log(i);

      if (i == 1) {
        currX += frameWidth / 6;
        currY -= (frameHeight * 0.8) / 4;
      }
      if (i == 2) {
        currY += (frameHeight * 0.8) / 2;
      }
      if (i == 3) {
        currX += frameWidth / 6;
        currY -= (frameHeight * 0.8) / 4;
      }
      if (i == 4) {
        currX += frameWidth / 6;
        currY -= (frameHeight * 0.8) / 4;
      }
      if (i == 5) {
        currY += (frameHeight * 0.8) / 2;
      }
      if (i == 6) {
        currX += frameWidth / 6;
        currY -= (frameHeight * 0.8) / 4;
      }

      nodeLink[i].x = currX;
      nodeLink[i].y = currY;
    }*/

    //Finding node closest to center;

    p5.background("#e3dac9");
    console.log(matrixLoaded);
  }

  function windowResized(p5) {
    p5.resizeCanvas(
      holderRef.current.getBoundingClientRect().width,
      holderRef.current.getBoundingClientRect().height * 0.8
    );
  }

  let draw = (p5) => {
    p5.clear();
    p5.noStroke();
    p5.background("#e3dac9");

    setGlobalWidth(frameWidth);
    setGlobalHeight(frameHeight);
    setNodesSet(true);

    let currX = frameWidth / 10;
    let currY = (frameHeight * 0.8) / 2;

    if (!nodesSet) {
      for (let i = 0; i < nodeLink.length; i++) {
        console.log(i);

        if (i == 1) {
          currX += frameWidth / 6;
          currY -= (frameHeight * 0.8) / 4;
        }
        if (i == 2) {
          currY += (frameHeight * 0.8) / 2;
        }
        if (i == 3) {
          currX += frameWidth / 6;
          currY -= (frameHeight * 0.8) / 4;
        }
        if (i == 4) {
          currX += frameWidth / 6;
          currY -= (frameHeight * 0.8) / 4;
        }
        if (i == 5) {
          currY += (frameHeight * 0.8) / 2;
        }
        if (i == 6) {
          currX += frameWidth / 6;
          currY -= (frameHeight * 0.8) / 4;
        }

        nodeLink[i].x = currX;
        nodeLink[i].y = currY;
      }
      setNodesSet(true);
    }

    //Creating Lines
    for (let m = 0; m < nodeLink.length; m++) {
      for (let w = 0; w < nodeLink[m].connections.length; w++) {
        p5.strokeWeight(20);
        p5.stroke("#72ff98");
        p5.line(
          nodeLink[m].x,
          nodeLink[m].y,
          nodeLink[m].connections[w].x,
          nodeLink[m].connections[w].y
        );

        //Setting Distances;
        //Now the graph is weighted!
        nodeLink[m].distance[w] = Math.floor(
          p5.dist(
            nodeLink[m].x,
            nodeLink[m].y,
            nodeLink[m].connections[w].x,
            nodeLink[m].connections[w].y
          )
        );

        p5.stroke("#9bffb6");
        p5.line(
          nodeLink[m].x + nodeLink[m].r / 6,
          nodeLink[m].y,
          nodeLink[m].connections[w].x + nodeLink[m].r / 6,
          nodeLink[m].connections[w].y
        );
      }

      //building cost matrix
      for (let k = 0; k < nodeLink.length; k++) {
        if (adjacencyMatrix[m][k] == 1) {
          costMatrix[m][k] = Math.floor(
            p5.dist(nodeLink[m].x, nodeLink[m].y, nodeLink[k].x, nodeLink[k].y)
          );
        } else if (m != k) {
          costMatrix[m][k] = 99999;
        } else {
          costMatrix[m][k] = 0;
        }
      }
    }

    p5.noStroke();

    for (let i = 0; i < nodeLink.length; i++) {
      //Background Circle
      p5.fill(p5.color(nodeLink[i].bgColour));
      p5.ellipse(
        nodeLink[i].x + nodeLink[i].r / 6,
        nodeLink[i].y,
        nodeLink[i].r,
        nodeLink[i].r
      );

      //Foreground Circle
      p5.fill(p5.color(nodeLink[i].colour));
      p5.ellipse(nodeLink[i].x, nodeLink[i].y, nodeLink[i].r, nodeLink[i].r);

      p5.textSize(nodeLink[i].r / 2);
      p5.fill(p5.color("white")).text(
        nodeLink[i].id,
        nodeLink[i].x - nodeLink[i].r / 4,
        nodeLink[i].y + nodeLink[i].r / 6
      );
      p5.fill(p5.color("#72ff98"));
    }

    //Creating Text
    for (let m = 0; m < nodeLink.length; m++) {
      for (let w = 0; w < nodeLink[m].connections.length; w++) {
        p5.noStroke();
        p5.textSize(nodeLink[m].r / 4);
        p5.fill(p5.color("white")).text(
          Math.floor(
            p5.dist(
              nodeLink[m].x,
              nodeLink[m].y,
              nodeLink[m].connections[w].x,
              nodeLink[m].connections[w].y
            )
          ),
          (nodeLink[m].x + nodeLink[m].connections[w].x) / 2 +
            nodeLink[m].r / 6,
          (nodeLink[m].y + nodeLink[m].connections[w].y) / 2 + nodeLink[m].r / 6
        );
      }
    }
  };

  async function addNode() {
    //Visiting
    let visited = [];
    let parent = [];

    //Distance
    let infinity = 99999;
    let distFromStart = [];
    let nearestNode = 0;

    //For finding nearest
    let minValue = 99999;
    let minNode = 0;

    for (let m = 0; m < nodeLink.length; m++) {
      //Will change this to a variable to change the input
      if (m == 0) {
        distFromStart.push(0);
        parent[0] = -1;
      } else {
        distFromStart.push(infinity);
      }

      //Sets everything to unvisited
      visited[m] = false;

      //sets all parents to themselves
      parent[m] = m;
    }

    for (let i = 0; i < nodeLink.length; i++) {
      //Getting the nearest node:

      for (let j = 0; j < nodeLink.length; j++) {
        if (!visited[j] && distFromStart[j] < minValue) {
          minValue = distFromStart[j];
          minNode = j;
        }
      }

      visited[minNode] = true;

      //updating distance;
      for (let adj = 0; adj < nodeLink.length; adj++) {
        //Checks if the previous distance is already smaller than the new distance
        //Which is the distance to reach nearest PLUS cost of going from nearest to adjacent
        if (
          !visited[adj] &&
          distFromStart[minNode] + costMatrix[minNode][adj] <
            distFromStart[adj] &&
          costMatrix[minNode][adj] != 99999
        ) {
          //update

          distFromStart[adj] =
            distFromStart[minNode] + costMatrix[minNode][adj];

          parent[adj] = minNode;

          console.log(minNode);
        }
      }

      minValue = 99999;
      minNode = 0;
    }

    let order = [];

    let n = nodeLink.length - 1;
    while (n > 0) {
      order.push(n);
      n = parent[n];
    }
    order.push(0);
    order.reverse();
    console.log(order);

    for (let f = 0; f < order.length; f++) {
      nodeLink[order[f]].colour = "#F52F2F";
      nodeLink[order[f]].bgColour = "#F66161";
      await sleep(1000);
    }
  }

  async function removeNode() {
    let temp = [...nodeLink];
    let newTemp;

    console.log("nodeValue: ", nodeValue);
    console.log("==", nodeValue == nodeLink[1].value);

    for (let i = 0; i < temp.length; i++) {
      nodeLink[i].colour = "#CB391E";
      nodeLink[i].bgColour = "#DD4125";
      await sleep(1000);
      nodeLink[i].colour = "#72ff98";
      nodeLink[i].bgColour = "#9bffb6";

      if (temp[i].value == nodeValue) {
        nodeLink[i].colour = "purple";
        await sleep(1000);
        if (i > 0) {
          temp[i - 1].next = temp[i + 1];
        }

        for (let j = temp.length - 1; j > i; j--) {
          temp[j].x = temp[j - 1].x;
          temp[j].y = temp[j - 1].y;
        }

        temp.splice(i, 1);
        setNodeLink(temp);
        console.log("Index: ", i);
        setNodeY(nodeY - globalHeight / 8);
        //do nodex
        break;
      }
    }
  }

  function sleep(ms) {
    console.log(ms);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function mouseWheel(event) {
    console.log(event);
    for (let m = 0; m < nodeLink.length; m++) {
      nodeLink[m].y += event._mouseWheelDeltaY / 8;
    }

    setNodeY(nodeLink[nodeLink.length - 1].y + globalHeight / 8);
  }

  function mousePressed(p5) {
    for (let m = 0; m < nodeLink.length; m++) {
      console.log(nodeLink[m].active);
    }
    return false;
  }

  function mouseDragged(p5) {
    let distance;
    for (let i = 0; i < nodeLink.length; i++) {
      distance = p5.dist(p5.mouseX, p5.mouseY, nodeLink[i].x, nodeLink[i].y);

      if (distance < nodeLink[i].r) {
        nodeLink[i].active = true;
      }
    }
    for (let i = 0; i < nodeLink.length; i++) {
      if (nodeLink[i].active) {
        nodeLink[i].x = p5.mouseX;
        nodeLink[i].y = p5.mouseY;
        break;
      }
    }

    return false;
  }

  function mouseReleased(p5) {
    for (let i = 0; i < nodeLink.length; i++) {
      if (nodeLink[i].active) {
        nodeLink[i].active = false;
      }
    }
  }

  return (
    <AlgorithmsWrapper className="BFS">
      <TopWrapper>
        <BackLink as={Link} to="/algorithms">
          <BackArrow />
        </BackLink>

        <Title>dijkstra's algorithm</Title>
      </TopWrapper>
      <BodyWrapper>
        <ItemRowDescription>
          <Info
            colour="#F06449"
            title="description"
            description="arrays are a way of storing data.
            arrays are made up of ‘elements’, which
            store one piece of data each. each
            element is stored directly next to the
            previous one in memory (contiguity),
            meaning access is fast, but new elements
            cannot be added once the array has been made
            "
          />
          <Info
            colour="#6DD3CE"
            title="use cases"
            description="arrays are best used in applications
            where data will often be accessed,
            as accessing an element is inexpensive.
            however, this comes at the cost of
            a greater insertion/deletion cost than
            something like a linked list.  
            "
          />
        </ItemRowDescription>
        <ItemRowContent id="IRC" ref={holderRef}>
          {frameWidth < 1 && (
            <Sketch
              setup={setup}
              draw={draw}
              windowResized={windowResized}
              mouseWheel={mouseWheel}
              mousePressed={mousePressed}
              mouseDragged={mouseDragged}
              mouseReleased={mouseReleased}
            />
          )}
          {frameWidth > 1 && (
            <Sketch
              setup={setup}
              draw={draw}
              windowResized={windowResized}
              mouseWheel={mouseWheel}
              mousePressed={mousePressed}
              mouseDragged={mouseDragged}
              mouseReleased={mouseReleased}
            />
          )}
          <ControlHolder>
            <InputValue
              placeholder="value"
              onChange={(event) => setNodeValue(event.target.value)}
            />

            <AddButton onClick={() => addNode()}>
              <p>+</p>
            </AddButton>
            <MinusButton onClick={() => removeNode()}>
              <p>-</p>
            </MinusButton>
          </ControlHolder>
        </ItemRowContent>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default Dijkstra;
