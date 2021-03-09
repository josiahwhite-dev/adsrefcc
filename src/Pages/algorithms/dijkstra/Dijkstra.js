import React, { useEffect, useRef, useState } from "react";
import Sketch from "react-p5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackArrow } from "../../icons/BackArrow.svg";
import { Item, media, Title, TopWrapper } from "../../Shared";

const AlgorithmsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  height: auto;
  width: 100%;
  background-color: #61dafb;
  justify-content: center;
  align-items: center;
  overflow-x: scroll;

  ${media.mobile} {
    justify-content: center;
    align-items: center;
  }
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: white;
  flex-grow: 20;
  align-items: flex-start;
  justify-content: space-evenly;
  overflow-y: visible;
  overflow-x: hidden;

  ${media.mobile} {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: flex-end;
  }
`;

const ItemRowDescription = styled.div`
  width: 66%;
  background-color: transparent;
  display: grid;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  height: auto;
  margin-left: 10%;
  width: 100vw;
  overflow: visible;

  justify-content: space-evenly;
  ${media.mobile} {
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0%;
  }
`;

const ItemRowContent = styled.div`
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;

  margin-right: 10%;
  min-width: 40vw;
  max-width: 40vw;
  min-height: 100%;
  max-height: 100%;

  ${media.mobile} {
    justify-content: center;
    align-items: center;
    min-width: 100%;

    min-height: 47vh;
    margin-top: "30vh";
    margin: 0%;
  }
`;

const InputValue = styled.input`
  border: 0;
  background-color: #e8e8e8;

  border-radius: 4vh;
  text-align: center;
  font-size: 4vh;
  padding: 2vh;
  margin-left: 1vw;
  max-width: 10vw;
  font-weight: bold;
  color: #535353;
  outline: none;

  ${media.mobile} {
    max-width: none;
    border-radius: 2vh;
    width: 10vh;
    height: 2vh;

    font-size: 3vh;
  }
`;

const AddButton = styled.div`
  display: flex;
  width: 30vw;
  height: 10vh;
  background-color: #ffe26a;
  border-radius: 4vh;

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
    width: 80vw;
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

const ControlHolder = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
  min-height: 12vh;
  align-items: center;
  justify-content: center;

  z-index: 0;
  background-color: transparent;
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

const SketchHolder = styled.div`
  min-width: 40vw;
  max-width: 40vw;
  min-height: 70vh;
  max-height: 70vh;
  background-color: transparent;

  ${media.mobile} {
    min-width: 100vw;
    max-width: 100vw;
    max-height: 40vh;
    min-height: 40vh;
  }
`;

const StaticPosition = styled.div`
  position: fixed;
  ${media.mobile} {
    margin-top: inherit;
    position: relative;
  }
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

  // for animation
  let animationTimer = 0;

  const a = useEffect(() => {
    if (holderRef.current.getBoundingClientRect().width > 0) {
      setFrameWidth(holderRef.current.getBoundingClientRect().width);
      setFrameHeight(holderRef.current.getBoundingClientRect().height);

      for (let i = 0; i < nodeLink.length; i++) {
        nodeLink[i].r = (frameHeight + frameWidth) / 15;
      }
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
        r: (frameHeight + frameWidth) / 15,
        distance: [],

        colour: "#7CED61",
        bgColour: "#61D944",
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
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsRendered(isRendered + 1);
    setGlobalWidth(frameWidth);
    setGlobalHeight(frameHeight);

    p5.createCanvas(frameWidth, frameHeight).parent(canvasParentRef);

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

    console.log(matrixLoaded);
    setIsRendered(1);

    //For the initial animation
  }

  function windowResized(p5) {
    p5.resizeCanvas(
      holderRef.current.getBoundingClientRect().width,
      holderRef.current.getBoundingClientRect().height
    );

    for (let i = 0; i < nodeLink.length; i++) {
      nodeLink[i].r = (frameHeight + frameWidth) / 15;
    }

    setGlobalHeight(p5.windowHeight);
    console.log("resize");
  }

  function test() {}

  let draw = (p5) => {
    p5.clear();
    p5.noStroke();

    setGlobalWidth(frameWidth);
    setGlobalHeight(frameHeight);
    setNodesSet(true);
    if (isRendered == 1) {
      setIsRendered(2);
    }

    if (isRendered == 2) {
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
      }

      setIsRendered(3);
    }

    //Creating Lines
    for (let m = 0; m < nodeLink.length; m++) {
      for (let w = 0; w < nodeLink[m].connections.length; w++) {
        p5.strokeWeight(frameWidth / 30);

        p5.stroke(nodeLink[m].colour);

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

        p5.stroke(nodeLink[m].bgColour);
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
        p5.fill(p5.color("#7c7c7c")).text(
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

    animationTimer++;
    console.log("IR: ", isRendered);
    //intro animation
    if (isRendered == 3 && animationTimer > 200) {
      p5.fill(p5.color("#F58696"));

      p5.triangle(
        nodeLink[2].x,
        nodeLink[2].y + nodeLink[2].r / 5,
        nodeLink[2].x + nodeLink[2].r / 6 + nodeLink[2].r / 8,
        nodeLink[2].y + nodeLink[2].r * 0.8,
        nodeLink[2].x - nodeLink[2].r / 6,
        nodeLink[2].y + nodeLink[2].r * 1
      );

      p5.fill(p5.color("#FFA5B2"));
      p5.triangle(
        nodeLink[2].x,
        nodeLink[2].y + nodeLink[2].r / 5,
        nodeLink[2].x + nodeLink[2].r / 6,
        nodeLink[2].y + nodeLink[2].r * 0.8,
        nodeLink[2].x - nodeLink[2].r / 6,
        nodeLink[2].y + nodeLink[2].r * 1
      );

      p5.fill(p5.color("#FFA5B2"));
      p5.triangle(
        nodeLink[2].x,
        nodeLink[2].y + nodeLink[2].r / 5,
        nodeLink[2].x + nodeLink[2].r / 6,
        nodeLink[2].y + nodeLink[2].r * 0.8,
        nodeLink[2].x - nodeLink[2].r / 6,
        nodeLink[2].y + nodeLink[2].r * 1
      );

      /* p5.ellipse(
        nodeLink[2].x + nodeLink[2].r / 6,
        nodeLink[2].y,
        nodeLink[2].r,
        nodeLink[2].r
      );*/

      if (nodeLink[2].x > frameWidth / 12) {
        nodeLink[2].x--;
      }
      if (nodeLink[2].y < frameHeight * 0.8) {
        nodeLink[2].y++;
      } else {
        setIsRendered(4);
      }
    }
  };

  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(6);

  async function dijkstras() {
    for (let m = 0; m < nodeLink.length; m++) {
      nodeLink[m].colour = "#7CED61";
      nodeLink[m].bgColour = "#61D944";
    }
    //Visiting
    let visited = [];
    let parent = [];

    //Distance
    let infinity = 99999;
    let distFromStart = [];
    let nearestNode = startValue;

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

  function sleep(ms) {
    console.log(ms);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function mouseWheel(event) {
    console.log(event);
    if (event.mouseX > 0 && event.mouseY > 0) {
      for (let m = 0; m < nodeLink.length; m++) {
        nodeLink[m].y += event._mouseWheelDeltaY / 8;
      }

      setNodeY(nodeLink[nodeLink.length - 1].y + globalHeight / 8);
    }
  }

  const [mouseCurrentY, setMouseCurrentY] = useState();

  function mousePressed(p5) {
    for (let m = 0; m < nodeLink.length; m++) {
      console.log(nodeLink[m].active);
    }
    setMouseCurrentY(p5.mouseY);
    return false;
  }

  function mouseDragged(p5) {
    let isMovingObject = false;

    let distance;
    for (let i = 0; i < nodeLink.length; i++) {
      distance = p5.dist(p5.mouseX, p5.mouseY, nodeLink[i].x, nodeLink[i].y);

      if (distance < nodeLink[i].r) {
        nodeLink[i].active = true;
        isMovingObject = true;

        document.body.style.overflow = "hidden";
      }
    }
    if (isMovingObject == true) {
      for (let i = 0; i < nodeLink.length; i++) {
        if (nodeLink[i].active) {
          nodeLink[i].x = p5.mouseX;
          nodeLink[i].y = p5.mouseY;
          break;
        }
      }
    }

    if (!isMovingObject) {
      if (window.innerWidth > 1000) {
        if (p5.mouseX > 0 && p5.mouseY > 0) {
          document.body.style.overflow = "hidden";

          for (let i = 0; i < nodeLink.length; i++) {
            if (p5.mouseY < mouseCurrentY) {
              nodeLink[i].y += p5.mouseX / 50;
            } else {
              nodeLink[i].y -= p5.mouseX / 50;
            }
          }
        }
      } else {
        if (p5.mouseY < frameHeight) {
          document.body.style.overflow = "hidden";
          for (let i = 0; i < nodeLink.length; i++) {
            if (p5.mouseY < mouseCurrentY) {
              nodeLink[i].y += p5.mouseX / 100;
            } else {
              nodeLink[i].y -= p5.mouseX / 100;
            }
          }
        }
      }

      setNodeY(nodeLink[nodeLink.length - 1].y + globalHeight / 8);
    }

    return false;
  }

  function mouseReleased(p5) {
    for (let i = 0; i < nodeLink.length; i++) {
      if (nodeLink[i].active) {
        nodeLink[i].active = false;
      }
    }
    document.body.style.overflow = "auto";
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
            description={
              <div>
                <p>
                  dijkstra's algorithm (also called dijkstra's shortest path) is
                  an efficient algorithm for finding the shortest path between
                  two nodes in a weighted graph.
                  <br />
                  <br />
                  this means that it requires both a set of nodes, and an cost
                  matrix. the cost matrix is a 2d array, with the entries being
                  the distance between two nodes.
                  <br />
                  <br />
                  for example, if node 1 and node 2 were 300 units apart, the
                  entries at costMatrix[1][2], and costMatrix[2][1] would both
                  be 300. if two nodes are not connected, their cost should be
                  an unreasonable number, such as -1.
                  <br />
                  <br />
                  <br />
                  <br />
                  1. three arrays are initialised. one to keep track of the
                  visited nodes, one to keep track of each node's 'parent', and
                  one to keep track of each node's distance from the starting
                  node. each array contains as many elements as there are nodes
                  in the graph. <br />
                  <br />
                  the 'visited' array has all of its values initialised to
                  false, as nothing has been visited yet.
                  <br />
                  <br />
                  the parent array is left blank, or has all of it elements
                  initialised to null.
                  <br />
                  <br />
                  the distance from start array is initialised to 'infinity', as
                  the distance between the first node and the other nodes is not
                  yet known. most of the time, infinity is treated as a large
                  number such as 999999.
                  <br />
                  <br /> the starting node (in this case 0) has no parent, so
                  its parent is set to -1. similarly its distance is set to 0.
                  <br />
                  <br />
                  2. a loop is then begun, which will run through each node. we
                  will call the index here i.
                  <br />
                  <br />
                  <div style={{ paddingLeft: "2vw" }}>
                    a) first, an inner loop runs through every node to determine
                    what the next closest node from the start is. if it has not
                    been visited yet, this will be the next node to be looked
                    at. this will do nothing on the first loop, as the distances
                    have not yet been found.
                    <br />
                    <br />
                    b) next, once the first loop has finished, another loop will
                    begin. we will call the index here adj, for adjacent. this
                    loop again runs through every node.
                    <br />
                    <br />
                    it first checks if visited[adj] is true. if it is not, i.e.
                    it hasn't been visited, it then checks if
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                      costMatrix[currentNode][adj] <br /> + <br />
                      distanceFromStart[currentNode]
                    </div>
                    <br />
                    <br />
                    is smaller than 'infinity'. finally, it checks if the two
                    nodes are actually connected, i.e. the cost at
                    costMatrix[currentNode][adj] isn't -1.
                    <br />
                    <br />
                    c) if these three conditions are met, it sets the
                    distanceFromStart[adj] to:
                    <br />
                    <br />
                    <div style={{ textAlign: "center" }}>
                      distFromStart[currentNode] <br /> + <br />
                      costMatrix[currentNode][adj]
                    </div>
                    <br />
                    <br />
                    so whatever the current distance from the start is, plus the
                    new cost going from the current node to whatever 'adj' is.
                    <br />
                    <br />
                    d) it then sets the parent of 'adj' to currentNode, as to
                    get to 'adj', at least through the shortest path, you need
                    to go to currentNode first.
                    <br />
                    <br />
                  </div>
                  thats it! the process is repeated, except instead of nothing
                  happening in the first loop, it will find whatever the
                  smallest, unvisited node in distanceFromStart is and make that
                  the current node.
                </p>
              </div>
            }
          />
          <Info
            colour="#6DD3CE"
            title="use cases"
            description={
              <div>
                <p>
                  dijkstra's algorithm is incredibly useful for any time the
                  shortest path needs to be found when the distances between
                  nodes are known.
                  <br />
                  <br />
                  the most obvious real-world example is google maps: every
                  location is a node, and the distances between them are real
                  distances, like miles or kilometers. finding the shortest path
                  between two places can be done using this algorithm.
                </p>
              </div>
            }
          />
          <Info
            colour="#FFA5B2"
            title="cost"
            description={
              <div>
                <p>
                  dijkstra's algorithm: O(V^2)
                  <br />
                  <br />
                  where V is the number of vertices, or nodes. this is because
                  every node needs to be looked at (V), and then all of its
                  connections needs to be looked at (V), leaving (V*V).
                  different optimisations, such as using a min-heap as a
                  priority queue can reduce this to:
                  <br />
                  <br />
                  dijkstra's algorithm (min-heap): O((V+E) log V)
                  <br />
                  <br />
                  where E is the amount of edges, or connections between nodes.
                </p>
              </div>
            }
          />
        </ItemRowDescription>
        <ItemRowContent>
          <StaticPosition>
            <SketchHolder id="IRC" ref={holderRef}>
              {frameWidth < 1 && (
                <Sketch
                  setup={test}
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
            </SketchHolder>
            <ControlHolder>
              {/* <InputValue
              placeholder="start"
              onChange={(event) => setStartValue(event.target.value)}
            />
            <InputValue
              placeholder="end"
              onChange={(event) => setEndValue(event.target.value)}
           />*/}

              <AddButton onClick={() => dijkstras()}>
                <p>start</p>
              </AddButton>
            </ControlHolder>
          </StaticPosition>
        </ItemRowContent>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default Dijkstra;
