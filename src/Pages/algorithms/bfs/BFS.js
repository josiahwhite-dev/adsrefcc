import { Link, useHistory } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../icons/BackArrow.svg";
import styled from "styled-components";
import { TopWrapper, Title, media } from "../../Shared";
import ArrayElement from "./ArrayElement";
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

function BFS() {
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

  let secondLinks;

  window.addEventListener("resize", function () {
    // your custom logic
  });

  const [adjacencyMatrix, setAdjacencyMatrix] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const [centerNode, setCenterNode] = useState(null);
  const [centerIndex, setCenterIndex] = useState(null);

  const createNodes = useEffect(() => {
    let screenWidth = holderRef.current.getBoundingClientRect().width;
    let screenHeight = holderRef.current.getBoundingClientRect().height;
    let nodeID = 0;
    let nodeValue = 47;
    let nodeLinkTemp = [];
    let protection = 0;

    while (nodeLinkTemp.length < 9) {
      var Node = {
        x: Math.floor(Math.random() * (screenWidth - 100) + 50),
        y: Math.floor(Math.random() * (screenHeight * 0.7 - 100) + 50),
        r: 80,
        nodeID: nodeID,
        nodeValue: Math.floor(Math.random() * 99),
        isCenter: false,
        foreground: "pink",
      };

      //Ensures never overlaps
      var isOverlapping = false;
      for (let j = 0; j < nodeLinkTemp.length; j++) {
        var otherNode = nodeLinkTemp[j];
        var a = Node.x - otherNode.x;
        var b = Node.y - otherNode.y;
        var d = Math.sqrt(a * a + b * b);

        if (d < (Node.r + otherNode.r) * 0.8) {
          isOverlapping = true;
        }
      }

      //If it is good, push it
      if (!isOverlapping) {
        nodeLinkTemp.push(Node);
        nodeID++;
      }

      protection++;
      if (protection > 100000) {
        console.log("too many circles");
        break;
      }

      setNodeLink(nodeLinkTemp);
    }
  }, []);

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
    let frameWidth = holderRef.current.getBoundingClientRect().width;
    let frameHeight = holderRef.current.getBoundingClientRect().height;

    setGlobalWidth(frameWidth);
    setGlobalHeight(frameHeight);

    p5.createCanvas(frameWidth, frameHeight * 0.8).parent(canvasParentRef);

    p5.background("#e3dac9");

    //center
    let d;
    let smallest = 999;
    let currentCenter;
    let currentCenterIndex;

    //trying dist;
    for (let k = 0; k < nodeLink.length; k++) {
      d = parseInt(
        p5.dist(
          frameWidth / 2,
          (frameHeight * 0.8) / 2,
          nodeLink[k].x,
          nodeLink[k].y
        )
      );

      if (Math.abs(d) < smallest) {
        smallest = Math.abs(d);
        currentCenter = nodeLink[k];
        currentCenterIndex = k;
      }
    }

    setCenterNode(currentCenter);
    setCenterIndex(currentCenterIndex);

    linkMaker(p5, 3, currentCenterIndex);
    linkMaker(p5, 2, secondLinks);
  }

  function linkMaker(p5, numConnections, nodeIndex) {
    console.log("Linkmaker Clay");

    let distance;
    let smallest = 9999;
    let nodeToAdd = null;
    let indexToAdd = 0;
    let distanceToAdd = 0;
    let prevNodes = [];
    let prevDist = [];
    let doneBefore = false;

    let extraConnect;
    //trying dist;

    for (let w = 0; w < numConnections; w++) {
      smallest = 9999;
      nodeToAdd = null;
      doneBefore = false;

      for (let k = 0; k < nodeLink.length; k++) {
        //Makes sure it is not comparing against itself
        if (k != nodeIndex) {
          distance = parseInt(
            p5.dist(
              nodeLink[nodeIndex].x,
              nodeLink[nodeIndex].y,
              nodeLink[k].x,
              nodeLink[k].y
            )
          );

          //Checks if distance has been done before
          for (let m = 0; m < prevDist.length; m++) {
            if (distance == prevDist[m]) {
              doneBefore = true;
            }
          }

          //Sets smallest if not done before
          if (Math.abs(distance) < smallest && !doneBefore) {
            smallest = Math.abs(distance);
            nodeToAdd = nodeLink[k];
            indexToAdd = k;
            distanceToAdd = distance;
          }
        } else {
          console.log("same");
        }
        //End of loop
        doneBefore = false;
      }

      prevNodes.push(nodeToAdd);

      prevDist.push(distanceToAdd);

      adjacencyMatrix[indexToAdd][nodeIndex] = 1;
      adjacencyMatrix[nodeIndex][indexToAdd] = 1;

      secondLinks = indexToAdd;
    }

    //return prevNodes;
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

    let frameWidth = holderRef.current.getBoundingClientRect().width;
    let frameHeight = holderRef.current.getBoundingClientRect().height;

    setGlobalWidth(frameWidth);
    setGlobalHeight(frameHeight);
    setNodesSet(true);

    for (let m = 0; m < adjacencyMatrix.length; m++) {
      for (let k = 0; k < adjacencyMatrix.length; k++) {
        if (adjacencyMatrix[m][k] === 1 && adjacencyMatrix[k][m] == 1) {
          p5.strokeWeight(20);

          p5.stroke("#72ff98");
          p5.line(nodeLink[m].x, nodeLink[m].y, nodeLink[k].x, nodeLink[k].y);
          p5.stroke("#9bffb6");
          p5.line(
            nodeLink[m].x + nodeLink[m].r / 6,
            nodeLink[m].y,
            nodeLink[k].x + nodeLink[m].r / 6,
            nodeLink[k].y
          );
          p5.noStroke();
        }
      }
    }

    if (activeNode) {
      p5.strokeWeight(20);
      p5.stroke("#72ff98");
      p5.line(activeNode.x, activeNode.y, currX, currY);
      p5.stroke("#9bffb6");
      p5.line(
        activeNode.x + activeNode.r / 6,
        activeNode.y,
        currX + +activeNode.r / 6,
        currY
      );
    }

    p5.noStroke();

    for (let i = 0; i < nodeLink.length; i++) {
      //Background Circle
      p5.fill(p5.color("red"));
      p5.ellipse(
        nodeLink[i].x + nodeLink[i].r / 6,
        nodeLink[i].y,
        nodeLink[i].r,
        nodeLink[i].r
      );

      //Foreground Circle
      p5.fill(p5.color(nodeLink[i].foreground));
      p5.ellipse(nodeLink[i].x, nodeLink[i].y, nodeLink[i].r, nodeLink[i].r);
    }

    p5.fill(p5.color("orange"));
    p5.ellipse(centerNode.x, centerNode.y, centerNode.r, centerNode.r);

    for (let i = 0; i < nodeLink.length; i++) {
      p5.textSize(nodeLink[i].r / 2);
      p5.fill(p5.color("white")).text(
        nodeLink[i].nodeID,
        nodeLink[i].x - nodeLink[i].r / 4,
        nodeLink[i].y + nodeLink[i].r / 6
      );
      p5.fill(p5.color("#72ff98"));
    }

    //Creating Text
    //linkMaker(p5, 3, 1);
  };

  async function addNode() {}

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
    //ISSUE: IF THERE IS A NODE INBETWEEN LINKED DOEST WORK
    //FIX: CHECK IF LINKED, LOOP THRU IF NOT

    currX = p5.mouseX;
    currY = p5.mouseY;

    //First, the closest two nodes will be found
    let closestIndex;
    let secondIndex;

    let closestLimit = 0;

    let closestDistance = 0;

    let smallest = 9999;

    for (let m = 0; m < nodeLink.length; m++) {
      if (p5.dist(nodeLink[m].x, nodeLink[m].y, currX, currY) < smallest) {
        smallest = p5.dist(nodeLink[m].x, nodeLink[m].y, currX, currY);
        closestIndex = m;
        closestDistance = smallest;
      }
    }

    smallest = 9999;
    let secondLimit = 0;
    secondIndex = closestIndex;

    for (let m = 0; m < nodeLink.length; m++) {
      if (
        p5.dist(nodeLink[m].x, nodeLink[m].y, currX, currY) < smallest &&
        p5.dist(nodeLink[m].x, nodeLink[m].y, currX, currY) > closestDistance &&
        adjacencyMatrix[m][closestIndex] == 1
      ) {
        smallest = p5.dist(nodeLink[m].x, nodeLink[m].y, currX, currY);
        secondIndex = m;
      }
    }

    let toStart = p5.dist(
      nodeLink[closestIndex].x,
      nodeLink[closestIndex].y,
      currX,
      currY
    );

    let toEnd = p5.dist(
      nodeLink[secondIndex].x,
      nodeLink[secondIndex].y,
      currX,
      currY
    );

    let lineLength = p5.dist(
      nodeLink[closestIndex].x,
      nodeLink[closestIndex].y,
      nodeLink[secondIndex].x,
      nodeLink[secondIndex].y
    );

    let buffer = 1;

    if (
      toStart + toEnd >= lineLength - buffer &&
      toStart + toEnd <= lineLength + buffer
    ) {
      adjacencyMatrix[closestIndex][secondIndex] = 0;
      adjacencyMatrix[secondIndex][closestIndex] = 0;
    }
  }

  let activeNode = null;
  let currIndex;
  let currEnd;
  let currX;
  let currY;

  function mouseDragged(p5) {
    let distance;

    for (let i = 0; i < nodeLink.length; i++) {
      distance = p5.dist(p5.mouseX, p5.mouseY, nodeLink[i].x, nodeLink[i].y);
      if (distance < nodeLink[i].r && activeNode == null) {
        nodeLink[i].active = true;
        activeNode = nodeLink[i];
        currIndex = i;
      }
    }

    currX = p5.mouseX;
    currY = p5.mouseY;

    p5.noStroke();

    //
  }

  function mouseReleased(p5) {
    if (activeNode !== null) {
      let distance;

      for (let i = 0; i < nodeLink.length; i++) {
        distance = p5.dist(p5.mouseX, p5.mouseY, nodeLink[i].x, nodeLink[i].y);
        if (distance < nodeLink[i].r && i !== currIndex) {
          adjacencyMatrix[i][currIndex] = 1;
          adjacencyMatrix[currIndex][i] = 1;
          currEnd = i;
        }
      }

      activeNode = null;
      currX = null;
      currY = null;
    }
  }

  async function breadthFirstSearch() {
    let s = centerIndex;

    //Setting all visited to false
    let visited = [];
    for (let i = 0; i < nodeLink.length; i++) {
      visited[i] = false;
    }

    //Creating the queue
    let queue = [];
    let neighbours = [];

    //Marking initial as visited
    visited[s] = true;

    queue.push(s);
    console.log(queue[0]);

    while (queue.length > 0) {
      s = queue[0];
      console.log("S:", s);

      for (let j = 0; j < adjacencyMatrix[s].length; j++) {
        if (adjacencyMatrix[s][j] == 1) {
          if (visited[j] == false) {
            visited[j] = true;
            queue.push(j);

            nodeLink[j].foreground = "green";
            console.log("Queue: ", queue);

            await sleep(500);
          }
        }
      }
    }
  }

  async function depthFirstSearch() {
    let s = centerIndex;
    let stack = [];
    let visited = [];

    console.log("RAN!");

    for (let k = 0; k < nodeLink.length; k++) {
      visited[k] = false;
    }

    stack.push(s);
    visited[s] = true;

    while (stack.length > 0) {
      let k = stack.pop();
      for (let i = nodeLink.length; i > 0; i--) {
        console.log("a");
        if (adjacencyMatrix[k][i] == 1) {
          if (visited[i] == false) {
            stack.push(i);
            visited[i] = true;
            nodeLink[i].foreground = "blue";

            await sleep(500);
          }
        }
      }
    }
  }

  return (
    <AlgorithmsWrapper className="BFS">
      <TopWrapper>
        <BackLink as={Link} to="/algorithms">
          <BackArrow />
        </BackLink>

        <Title>breadth first search</Title>
      </TopWrapper>
      <BodyWrapper>
        <div style={{ position: "absolute" }}></div>
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
          <Sketch
            setup={setup}
            draw={draw}
            mousePressed={mousePressed}
            mouseDragged={mouseDragged}
            mouseReleased={mouseReleased}
            mouseWheel={mouseWheel}
          />

          <ControlHolder>
            <InputValue />

            <AddButton onClick={() => depthFirstSearch()}>
              <p>+</p>
            </AddButton>
          </ControlHolder>
        </ItemRowContent>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default BFS;

//Old Draw
/**
 * 
 * 
 * let draw = (p5) => {
    p5.background("rgb(0%,100%,10%)");
    //Color of the ball
    p5.stroke(255);
    p5.strokeWeight(4);
    //Mentioning that the ball or the circle won't have filled color
    p5.noFill();
    //The first 2 parameters are for positioning and the next two are
    //for size

    p5.noStroke();
    p5.fill(p5.color("#9bffb6"));
    p5.ellipse(a + 20, b, 100, 100);

    p5.strokeWeight(20);
    p5.stroke("#72ff98");
    p5.line(300, 300, 400, 400);
    p5.noStroke();

    //Circle
    p5.fill(p5.color("#72ff98"));
    p5.ellipse(a, b, 100, 100);

    p5.fill(p5.color("#9bffb6"));
    p5.ellipse(420, 400, 100, 100);

    p5.fill(p5.color("#72ff98"));
    p5.ellipse(400, 400, 100, 100);

    p5.strokeWeight(20);

    p5.stroke("#72ff98");
    p5.line(300, 300, 400, 400);

    p5.stroke("#9bffb6");
    p5.line(320, 300, 420, 400);
    let easing = 0.05;

    if (b >= 300) {
      speed = -1 * easing;
    }
    if (b === 250) {
      speed = 1 * easing;
    }
    b = b + speed;
  };
 */

/* Old shit

 let setup = (p5, canvasParentRef) => {
    globalWidth = p5.windowWidth * 0.4;
    globalHeight = p5.windowHeight * 0.7;

    let parent = p5.createCanvas(globalWidth, globalHeight).parent("IRC");

    p5.background("#e3dac9");

    //No stroke around circle
    p5.noStroke();

    //Circle ( x, y, width, height)
    p5.fill(p5.color("#72ff98"));
    //p5.ellipse(100, 100, 100, 100);

    var xa = 0;

    /* while (xa < 500) {
      p5.ellipse(xa, 200, 25, 25);
      xa = xa + 50;
    }

    for (let i = 0; i < 20; i++) {
      //p5.ellipse(xa, 200, 100, 100);
      //xa = xa + 150;
    }

    async function andrew() {
      await sleep(1000);
    }

    console.log("length: " + nodeLink.length);

    for (let j = 0; j < nodeLink.length; j++) {
      p5.ellipse(nodeLink[j].x, nodeLink[j].y, 100, 100);
      console.log("Width: " + p5.windowWidth);
    }

    p5.rect(0, 0, 55, 55, 20);
    p5.rect(0, globalHeight, 55, 55, 20);
    p5.rect(globalWidth, 0, 55, 55, 20);
    p5.rect(globalWidth, globalHeight, 55, 55, 20);

    // tester(p5, x, y);
  };

  function sleep(ms) {
    console.log(ms);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const [nodeID, setNodeID] = useState(0);
  const [nodeValue, setNodeValue] = useState(27);

  const testarray = [1, 2, 3, 4, 5];

  let draw = (p5) => {};

  function tester(p5, x, y) {
    console.log("CALLED!!!");
    // p5.ellipse(x, y, 100, 100);
  }

  const [spaceVals, setSpaceVals] = useState([]);

  const initialArray = useEffect(() => {
    setNodeLink([
      ...nodeLink,
      {
        needsNewLine,
        nodeID,
        nodeValue,
        x,
        y,
      },
    ]);

    console.log(nodeID);
  }, [changer]);

  const run10times = useEffect(() => {
    if (changer < 9) {
      //ellipse(x, y, 20, 20);

      setChanger(changer + 1);
      setNodeValue(nodeValue + 1);
      setNodeID(nodeID + 1);

      if (x < 100) {
        setX(x + 100);
      } else {
        setX(1000);
      }
      setY(Math.floor(Math.random() * 500));
    }
  }, [nodeLink]);*/

//Old centering code

/*
  let centerNode = null;
    let centerNode2 = null;
    let closestToZeroX = 0;
    let closestToZeroY = 0;
    let a;
    let b;
    for (let i = 0; i < nodeLinkHook.length; i++) {
      a = nodeLinkHook[i].x - globalWidth / 2;
      b = nodeLinkHook[i].y - (globalHeight * 0.8) / 2;
      console.log(a);

      if (closestToZeroX === 0) {
        closestToZeroX = a;
        centerNode = nodeLinkHook[i];
      } else if (a > 0 && a <= Math.abs(closestToZeroX)) {
        closestToZeroX = a;
        centerNode = nodeLinkHook[i];
      } else if (a < 0 && -a < Math.abs(closestToZeroX)) {
        closestToZeroX = a;
        centerNode = nodeLinkHook[i];
      }

      if (closestToZeroY === 0) {
        closestToZeroY = b;
        centerNode2 = nodeLinkHook[i];
      } else if (b > 0 && b <= Math.abs(closestToZeroY)) {
        closestToZeroY = b;
        centerNode2 = nodeLinkHook[i];
      } else if (b < 0 && -b < Math.abs(closestToZeroY)) {
        closestToZeroY = b;
        centerNode2 = nodeLinkHook[i];
      }
    }



    let centerDecider = null;

    if (centerNode.x + centerNode.y > centerNode2.x + centerNode2.y) {
      centerDecider = centerNode;
    } else {
      centerDecider = centerNode2;
    }

    console.log("Center value: " + centerNode.nodeValue);


      p5.fill(p5.color("orange"));
    p5.rect(0, 0, 100, 100);

    p5.fill(p5.color("white")).text(centerNode.nodeValue, 0, 50);

    p5.fill(p5.color("red"));
    p5.ellipse(centerNode.x, centerNode.y, centerNode.r, centerNode.r);
    p5.fill(p5.color("white")).text(
      centerNode.nodeValue,
      centerNode.x - centerNode.r / 4,
      centerNode.y + centerNode.r / 6
    );

    p5.fill(p5.color("purple"));
    p5.ellipse(
      centerDecider.x,
      centerDecider.y,
      centerDecider.r,
      centerDecider.r
    );
    p5.fill(p5.color("white")).text(
      centerDecider.nodeValue,
      centerDecider.x - centerDecider.r / 4,
      centerDecider.y + centerDecider.r / 6
    );


    );*/

//Old Connections

/**
     * let distance;
    let smallest = 9999;
    let nodeToAdd = null;
    let distanceToAdd = 0;
    let prevNodes = [];
    let prevDist = [];
    let doneBefore = false;
    //trying dist;

    for (let w = 0; w < numConnections - 1; w++) {
      smallest = 9999;
      nodeToAdd = null;
      doneBefore = false;

      for (let k = 0; k < nodeLinkHook.length; k++) {
        //Makes sure it is not comparing against itself
        if (k != nodeIndex) {
          distance = parseInt(
            p5.dist(
              nodeLinkHook[nodeIndex].x,
              nodeLinkHook[nodeIndex].y,
              nodeLinkHook[k].x,
              nodeLinkHook[k].y
            )
          );

          //Checks if distance has been done before
          for (let m = 0; m < prevDist.length; m++) {
            if (distance == prevDist[m]) {
              doneBefore = true;
            }
          }

          //Sets smallest if not done before
          if (Math.abs(distance) < smallest && !doneBefore) {
            smallest = Math.abs(distance);
            nodeToAdd = nodeLinkHook[k];
            distanceToAdd = distance;
          }
        } else {
          console.log("same");
        }
        //End of loop
        doneBefore = false;
      }
      prevNodes.push(nodeToAdd);
      prevDist.push(distanceToAdd);
    }

    return prevNodes;
     * 
     * 
     * * */

//    /*
//    //Canvas Variables
// const holderRef = useRef();
// let globalWidth;
// let globalHeight;
// let newCenter = null;

// const [adjacencyMatrix, setAdjacencyMatrix] = useState([
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
// ]);

// /* adjacencyMatrix = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0],
// ];*/

// //Node Variables
// //const [nodeLink, setNodeLink] = useState([]);

// //const [nodeID, setNodeID] = useState(0);
// //const [nodeValue, setNodeValue] = useState(23);
// //const [x, setX] = useState(0);
// //const [y, setY] = useState(0);

// const [nodeLinkHook, setNodeLinkHook] = useState([]);
// const [checker, setChecker] = useState(0);
// const [center, setCenter] = useState(null);

// const buildNodes = useEffect(() => {
//   /*    let x = 100;
//   let y = 100;
//   let r = 100;
//   */
//   let screenWidth = holderRef.current.getBoundingClientRect().width;
//   let screenHeight = holderRef.current.getBoundingClientRect().height;
//   let nodeID = 0;
//   let nodeValue = 47;
//   let nodeLink = [];
//   let protection = 0;

//   while (nodeLink.length < 9) {
//     var Node = {
//       x: Math.floor(Math.random() * (screenWidth - 100) + 50),
//       y: Math.floor(Math.random() * (screenHeight * 0.7 - 100) + 50),
//       r: 80,
//       nodeID: nodeID,
//       nodeValue: Math.floor(Math.random() * 99),
//       isCenter: false,
//     };

//     //Ensures never overlaps
//     var isOverlapping = false;
//     for (let j = 0; j < nodeLink.length; j++) {
//       var otherNode = nodeLink[j];
//       var a = Node.x - otherNode.x;
//       var b = Node.y - otherNode.y;
//       var d = Math.sqrt(a * a + b * b);

//       if (d < (Node.r + otherNode.r) * 0.8) {
//         isOverlapping = true;
//       }
//     }

//     //If it is good, push it
//     if (!isOverlapping) {
//       nodeLink.push(Node);
//       nodeID++;
//     }

//     protection++;
//     if (protection > 100000) {
//       console.log("too many circles");
//       break;
//     }
//   }

//   setNodeLinkHook(nodeLink);
// }, [checker]);

// function setup(p5, canvasParentRef) {
//   globalWidth = holderRef.current.getBoundingClientRect().width;
//   globalHeight = holderRef.current.getBoundingClientRect().height;

//   setChecker(checker + 1);

//   p5.createCanvas(globalWidth, globalHeight * 0.8).parent(canvasParentRef);

//   let d;
//   let smallest = 999;
//   let centerNode = null;
//   //trying dist;
//   for (let k = 0; k < nodeLinkHook.length; k++) {
//     let d = parseInt(
//       p5.dist(
//         globalWidth / 2,
//         (globalHeight * 0.8) / 2,
//         nodeLinkHook[k].x,
//         nodeLinkHook[k].y
//       )
//     );

//     if (Math.abs(d) < smallest) {
//       smallest = Math.abs(d);
//       centerNode = nodeLinkHook[k];
//     }
//   }

//   //Finding node closest to center;

//   p5.background("#e3dac9");

//   p5.noStroke();

//   p5.fill(p5.color("#72ff98"));

//   //let connections = linkMaker(p5, 3, centerNode.nodeID);
//   linkMaker(p5, 3, centerNode.nodeID);

//   //for (let m = 0; m < connections.length; m++) {

//   for (let j = 0; j < nodeLinkHook.length; j++) {
//     p5.fill(p5.color("#9bffb6"));
//     p5.ellipse(
//       nodeLinkHook[j].x + nodeLinkHook[j].r / 4,
//       nodeLinkHook[j].y,
//       nodeLinkHook[j].r,
//       nodeLinkHook[j].r
//     );

//     p5.fill(p5.color("#72ff98"));
//     p5.textSize(nodeLinkHook[j].r / 2);
//     p5.ellipse(
//       nodeLinkHook[j].x,
//       nodeLinkHook[j].y,
//       nodeLinkHook[j].r,
//       nodeLinkHook[j].r
//     );

//     p5.fill(p5.color("white")).text(
//       nodeLinkHook[j].nodeValue,
//       nodeLinkHook[j].x - nodeLinkHook[j].r / 4,
//       nodeLinkHook[j].y + nodeLinkHook[j].r / 6
//     );

//     p5.fill(p5.color("white")).text(
//       nodeLinkHook[j].x,
//       nodeLinkHook[j].x - nodeLinkHook[j].r / 4,
//       nodeLinkHook[j].y + nodeLinkHook[j].r
//     );

//     p5.fill(p5.color("#72ff98"));
//   }

//   p5.fill(p5.color("grey"));
//   p5.ellipse(centerNode.x, centerNode.y, centerNode.r, centerNode.r);
//   p5.fill(p5.color("white")).text(
//     centerNode.nodeValue,
//     centerNode.x - centerNode.r / 4,
//     centerNode.y + centerNode.r / 6
//   );

//   p5.fill(p5.color("blue"));
//   p5.ellipse(globalWidth / 2, (globalHeight * 0.8) / 2, 50, 50);
// }

// function linkMaker(p5, numConnections, nodeIndex) {
//   let distance;
//   let smallest = 9999;
//   let nodeToAdd = null;
//   let indexToAdd = 0;
//   let distanceToAdd = 0;
//   let prevNodes = [];
//   let prevDist = [];
//   let doneBefore = false;
//   //trying dist;

//   for (let w = 0; w < numConnections; w++) {
//     smallest = 9999;
//     nodeToAdd = null;
//     doneBefore = false;

//     for (let k = 0; k < nodeLinkHook.length; k++) {
//       //Makes sure it is not comparing against itself
//       if (k != nodeIndex) {
//         distance = parseInt(
//           p5.dist(
//             nodeLinkHook[nodeIndex].x,
//             nodeLinkHook[nodeIndex].y,
//             nodeLinkHook[k].x,
//             nodeLinkHook[k].y
//           )
//         );

//         //Checks if distance has been done before
//         for (let m = 0; m < prevDist.length; m++) {
//           if (distance == prevDist[m]) {
//             doneBefore = true;
//           }
//         }

//         //Sets smallest if not done before
//         if (Math.abs(distance) < smallest && !doneBefore) {
//           smallest = Math.abs(distance);
//           nodeToAdd = nodeLinkHook[k];
//           indexToAdd = k;
//           distanceToAdd = distance;
//         }
//       } else {
//         console.log("same");
//       }
//       //End of loop
//       doneBefore = false;
//     }
//     prevNodes.push(nodeToAdd);

//     prevDist.push(distanceToAdd);

//     console.log("nodeToadd:", indexToAdd);
//     console.log("Index:", nodeIndex);
//     adjacencyMatrix[indexToAdd][nodeIndex] = 1;
//     adjacencyMatrix[nodeIndex][indexToAdd] = 1;
//     console.log(adjacencyMatrix);
//   }

//   console.log(nodeLinkHook);
//   //return prevNodes;
// }

// let draw = (p5) => {
//   for (let m = 0; m < adjacencyMatrix.length; m++) {
//     for (let k = 0; k < adjacencyMatrix.length; k++) {
//       if (adjacencyMatrix[m][k] === 1 && adjacencyMatrix[k][m] == 1) {
//         p5.strokeWeight(20);

//         p5.stroke("#72ff98");
//         p5.line(
//           nodeLinkHook[m].x,
//           nodeLinkHook[m].y,
//           nodeLinkHook[k].x,
//           nodeLinkHook[k].y
//         );
//         p5.stroke("#9bffb6");
//         p5.line(
//           nodeLinkHook[m].x + nodeLinkHook[m].r / 6,
//           nodeLinkHook[m].y,
//           nodeLinkHook[k].x + nodeLinkHook[m].r / 6,
//           nodeLinkHook[k].y
//         );
//         p5.noStroke();

//         p5.fill(p5.color("red"));
//         p5.ellipse(nodeLinkHook[m].x, nodeLinkHook[m].y / 2, 50, 50);
//         p5.ellipse(nodeLinkHook[k].x, nodeLinkHook[k].y / 2, 50, 50);
//       }
//     }
//     /* p5.strokeWeight(20);

//     p5.stroke("#72ff98");
//     p5.line(centerNode.x, centerNode.y, connections[m].x, connections[m].y);
//     p5.stroke("#9bffb6");
//     p5.line(
//       centerNode.x + centerNode.r / 6,
//       centerNode.y,
//       connections[m].x + connections[m].r / 6,
//       connections[m].y
//     );
//     p5.noStroke();*/
//   }
// };
