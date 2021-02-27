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
  background-color: blue;

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
  const [isRendered, setIsRendered] = useState(0);

  //let frameWidth = holderRef.current.getBoundingClientRect().width;
  //let frameHeight = holderRef.current.getBoundingClientRect().height;

  const [frameWidth, setFrameWidth] = useState();
  const [frameHeight, setFrameHeight] = useState();

  const a = useEffect(() => {
    if (holderRef.current.getBoundingClientRect().width > 0) {
      setFrameWidth(holderRef.current.getBoundingClientRect().width);
      setFrameHeight(holderRef.current.getBoundingClientRect().height);
    }
  }, [holderRef.current]);

  window.addEventListener("resize", function () {
    // your custom logic
  });

  const createNodes = useEffect(() => {
    if (looper < 3) {
      var Node = {
        x: nodeX,
        y: nodeY,
        value: nodeValue,
        id: nodeID,
        r: 100,
        next: null,
        colour: "#72ff98",
        bgColour: "#9bffb6",
      };

      setNodeLink([...nodeLink, Node]);

      if (looper < 2) {
        setChanger(changer + 1);
      }
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
    if (looper > 2) {
      let temp = [...nodeLink];

      for (let j = 0; j < nodeLink.length - 1; j++) {
        temp[j].next = temp[j + 1];
      }

      setNodeLink(temp);
    }
  }, [looper]);

  console.log(nodeLink);

  function setup(p5, canvasParentRef) {
    setGlobalWidth(frameWidth);
    setGlobalHeight(frameHeight);

    p5.createCanvas(frameWidth, frameHeight * 0.8).parent(canvasParentRef);

    let newXY = [...nodeLink];
    let currX = frameWidth / 2;
    let currY = (frameHeight * 0.8) / 8;

    for (let i = 0; i < nodeLink.length; i++) {
      nodeLink[i].x = currX;
      nodeLink[i].y = currY;

      if (i % 2 == 0) {
        currX -= frameWidth / 10;
        setNodeX(currX);
        console.log("Even!");
      } else {
        currX += frameWidth / 10;
        console.log("Odd!");
        setNodeX(currX);
      }

      currY += frameHeight / 8;
      setNodeY(currY);
    }

    //Finding node closest to center;

    p5.background("#e3dac9");
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

    for (let i = 0; i < nodeLink.length; i++) {
      //Background Circle
      p5.fill(p5.color(nodeLink[i].bgColour));
      p5.ellipse(
        nodeLink[i].x + nodeLink[i].r / 6,
        nodeLink[i].y,
        nodeLink[i].r,
        nodeLink[i].r
      );

      //Foreground line
      if (nodeLink[i].next) {
        p5.strokeWeight(20);
        p5.stroke("#72ff98");
        p5.line(
          nodeLink[i].x,
          nodeLink[i].y,
          nodeLink[i].next.x,
          nodeLink[i].next.y
        );
      }
      p5.noStroke();

      //Background line
      if (nodeLink[i].next) {
        p5.strokeWeight(20);
        p5.stroke("#9bffb6");
        p5.line(
          nodeLink[i].x + nodeLink[i].next.r / 6,
          nodeLink[i].y,
          nodeLink[i].next.x + nodeLink[i].next.r / 6,
          nodeLink[i].next.y
        );
      }
      p5.noStroke();

      //Foreground Circle
      p5.fill(p5.color(nodeLink[i].colour));
      p5.ellipse(nodeLink[i].x, nodeLink[i].y, nodeLink[i].r, nodeLink[i].r);

      p5.textSize(nodeLink[i].r / 2);
      p5.fill(p5.color("white")).text(
        nodeLink[i].value,
        nodeLink[i].x - nodeLink[i].r / 4,
        nodeLink[i].y + nodeLink[i].r / 6
      );
      p5.fill(p5.color("#72ff98"));
    }
  };

  function addNode() {
    var Node = {
      x: nodeX,
      y: nodeY,
      value: nodeValue,
      id: nodeID,
      r: 100,
      next: null,
      colour: "#72ff98",
      bgColour: "#9bffb6",
    };

    setNodeLink([...nodeLink, Node]);
    setChanger(changer + 1);
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

  return (
    <AlgorithmsWrapper className="BFS" onLoad={() => console.log("Loaded!")}>
      <TopWrapper>
        <BackLink as={Link} to="/datastructures">
          <BackArrow />
        </BackLink>

        <Title>linked list</Title>
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
          <Sketch
            setup={setup}
            draw={draw}
            windowResized={windowResized}
            mouseWheel={mouseWheel}
          />

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
