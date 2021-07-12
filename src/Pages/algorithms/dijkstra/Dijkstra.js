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
  align-content: center;
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
  min-height: 60vh;
  max-height: 60vh;
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
    <Item
      style={{
        backgroundColor: props.colour,
        minHeight: "30vh",
      }}
    >
      <h1>{props.title}</h1>

      <p>{props.description}</p>
    </Item>
  );
}

function MainInfo(props) {
  var screenSize;
  var itemPadding;
  if (window.innerWidth < 1024) {
    screenSize = "50vh";
    itemPadding = "2vh";
  } else {
    screenSize = "30vh";
    itemPadding = "0vh";
  }

  return (
    <Item
      id="mainInfo"
      style={{
        backgroundColor: props.colour,
        minHeight: screenSize,
        margin: itemPadding,
      }}
    >
      <h1>{props.title}</h1>

      <p>{props.description}</p>
    </Item>
  );
}

function ArrayVisDistance(props) {
  return (
    /////AWDAWDAWD ADD PARENT ID
    <Item
      id="visDistance"
      style={{ backgroundColor: props.colour, minHeight: "15vh" }}
    >
      <h2 style={{ color: "white" }}>{props.title}</h2>

      <table style={{ width: "80%", borderCollapse: "collapse" }}>
        <thead
          style={{
            color: "white",
            fontSize: "150%",
            fontWeight: "bolder",
          }}
        >
          <th>0</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
        </thead>
        <tr style={{ fontSize: "150%" }}>
          <td id="D0"></td>
          <td id="D1"></td>
          <td id="D2"></td>
          <td id="D3"></td>
          <td id="D4"></td>
          <td id="D5"></td>
          <td id="D6"></td>
        </tr>
      </table>
    </Item>
  );
}

function ArrayVisParents(props) {
  return (
    <Item
      id="visParents"
      style={{ backgroundColor: props.colour, minHeight: "15vh" }}
    >
      <h2 style={{ color: "white" }}>{props.title}</h2>

      <table style={{ width: "80%", borderCollapse: "collapse" }}>
        <thead
          style={{
            color: "white",
            fontSize: "150%",
            fontWeight: "bolder",
          }}
        >
          <th id="H0">0</th>
          <th id="H1">1</th>
          <th id="H2">2</th>
          <th id="H3">3</th>
          <th id="H4">4</th>
          <th id="H5">5</th>
          <th id="H6">6</th>
        </thead>
        <tr style={{ fontSize: "150%" }}>
          <td id="V0"></td>
          <td id="V1"></td>
          <td id="V2"></td>
          <td id="V3"></td>
          <td id="V4"></td>
          <td id="V5"></td>
          <td id="V6"></td>
        </tr>
      </table>
    </Item>
  );
}

function Dijkstra() {
  const [startNode, setStartNode] = useState(0);

  //For refreshing screen details
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  //For Start/End

  const [endNode, setEndNode] = useState(6);

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

        /*for (let j = 0; j < nodeLink.length; j++) {
          console.log("Number", j, ": ", nodeLink[j].connections);
        }*/
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

  function setup(p5, canvasParentRef) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsRendered(isRendered + 1);
    setGlobalWidth(frameWidth);
    setGlobalHeight(frameHeight);

    p5.createCanvas(frameWidth, window.innerHeight).parent(canvasParentRef);

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
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
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

    /*//intro animation
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

      // p5.ellipse(
      //  nodeLink[2].x + nodeLink[2].r / 6,
      //  nodeLink[2].y,
      //  nodeLink[2].r,
      //  nodeLink[2].r
      //);

      if (nodeLink[2].x > frameWidth / 12) {
        nodeLink[2].x--;
      }
      if (nodeLink[2].y < frameHeight * 0.8) {
        nodeLink[2].y++;
      } else {
        setIsRendered(4);
      }
    }*/
  };

  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(6);

  async function dijkstras() {
    if (startNode > 6 || startNode < 0 || endNode > 6 || endNode < 0) {
      document.getElementById("taskDescription").innerHTML =
        "please input a valid node to find!";

      return;
    }

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
    let nearestNode = startNode; //startValue;

    //For finding nearest
    let minValue = 99999;
    let minNode = 0;

    for (let m = 0; m < nodeLink.length; m++) {
      //Will change this to a variable to change the input
      if (m == nearestNode) {
        distFromStart.push(0);
        parent[nearestNode] = -1;
        document.getElementById("D" + m).innerHTML = "0";
        document.getElementById("V" + m).innerHTML = "-1";
      } else {
        distFromStart.push(infinity);
        document.getElementById("D" + m).innerHTML = "∞";
        parent[m] = m;
        document.getElementById("V" + m).innerHTML = "?";
      }

      //Sets everything to unvisited
      visited[m] = false;

      //sets all parents to themselves

      await sleep(500);
    }

    let highlightDistance = document.getElementById("visDistance");
    let highlightParents = document.getElementById("visParents");

    let highlightInstruction = document.getElementById("mainInfo");

    let Q = [];

    //Adding initial node
    Q.push(nearestNode);

    //Priority queue for Dijkstra
    while (Q.length > 0) {
      //Take node with least distance
      let e = Q.shift();
      document.getElementById("queue").innerHTML = "queue: [" + Q + "]";
      sleep(500);
      visited[e] = true;
      nodeLink[e].colour = "#f2be3a";
      nodeLink[e].bgColour = "#c99b24";
      sleep(2000);

      if (e == endNode) {
        document.getElementById("taskDescription").innerHTML =
          '<p style="font-size:30px; text-align: center; padding: 0px; margin: 0px">' +
          "target node found!" +
          "</p>";
        await sleep(3000);
        break;
      }

      console.log("active: ", e);
      console.log("queue: ", Q);

      for (let i = 0; i < adjacencyMatrix.length; i++) {
        //if connected
        if (adjacencyMatrix[e][i] == 1) {
          //if not visited
          if (visited[i] == false && !Q.includes(i)) {
            //add to queue
            Q.push(i);

            //Animaiton
            await sleep(1000);
            //increasing font size and turning purple with instruction
            document.getElementById("taskDescription").style.fontSize = "120%";
            document.getElementById("taskDescription").style.transition =
              "font-size 1000ms ease";
            document.getElementById("taskDescription").innerHTML =
              "adding to queue: " +
              '<p style="font-size:30px; text-align: center; padding: 0px; margin: 0px">' +
              i +
              "</p>";
            highlightInstruction.style.transition =
              "background-color 1000ms ease";
            highlightInstruction.style.backgroundColor = "#7d34eb";
            await sleep(1500);
            Q.sort((a, b) => (distFromStart[a] >= distFromStart[b] ? 1 : -1));
            document.getElementById("queue").innerHTML = "queue: [" + Q + "]";
            nodeLink[i].colour = "#7d34eb";
            nodeLink[i].bgColour = "#5e1dbf";
            await sleep(2500);
            highlightInstruction.style.backgroundColor = "#F06449";
            document.getElementById("taskDescription").style.fontSize = "100%";

            //check the distance
            let testDistance = distFromStart[e] + costMatrix[i][e];
            //If it is better than before, update
            if (testDistance < distFromStart[i]) {
              parent[i] = e;
              distFromStart[i] = testDistance;

              //Updating distance animation
              document.getElementById("D" + i).innerHTML = distFromStart[i];

              document.getElementById("D" + i).style.fontSize = "200%";
              document.getElementById("D" + i).style.transition =
                "font-size 1000ms ease";
              highlightDistance.style.transition =
                "background-color 1000ms ease";
              highlightDistance.style.backgroundColor = "#7d34eb";
              await sleep(1500);
              highlightDistance.style.backgroundColor = "#F06449";
              document.getElementById("D" + i).style.fontSize = "100%";

              //Updating parent animationprom

              document.getElementById("V" + i).innerHTML = parent[i];

              document.getElementById("V" + i).style.fontSize = "200%";
              document.getElementById("V" + i).style.transition =
                "font-size 1000ms ease";
              highlightParents.style.transition =
                "background-color 1000ms ease";
              highlightParents.style.backgroundColor = "#7d34eb";
              await sleep(1500);
              highlightParents.style.backgroundColor = "#F06449";
              document.getElementById("V" + i).style.fontSize = "100%";
              await sleep(1500);
            }
          }
        }
      }

      //out of adjacencies
      document.getElementById("taskDescription").style.fontSize = "120%";
      document.getElementById("taskDescription").style.transition =
        "font-size 1000ms ease";
      document.getElementById("taskDescription").innerHTML =
        "there are no more connections <br/> to explore for node " +
        '<p style="font-size:30px; text-align: center; padding: 0px; margin: 0px">' +
        e +
        "</p>";
      highlightInstruction.style.transition = "background-color 1000ms ease";
      highlightInstruction.style.backgroundColor = "#f2be3a";
      await sleep(4500);

      if (Q.length > 0) {
        document.getElementById("taskDescription").style.fontSize = "120%";
        document.getElementById("taskDescription").style.transition =
          "font-size 1000ms ease";
        document.getElementById("taskDescription").innerHTML =
          "node with shortest distance from start: " +
          '<p style="font-size:30px; text-align: center; padding: 0px; margin: 0px">' +
          Q[0] +
          "</p>";

        highlightInstruction.style.transition = "background-color 1000ms ease";
        highlightInstruction.style.backgroundColor = "#f2be3a";
        await sleep(2500);
        //nodeLink[Q[0]].colour = "#344feb";
        //nodeLink[Q[0]].bgColour = "#243cc7";
        await sleep(2500);
        nodeLink[e].colour = "#737894";
        nodeLink[e].bgColour = "#50525e";
      }
    }

    for (let i = 0; i < nodeLink.length; i++) {
      /*
      //Getting the nearest node:

      //increasing font size and turning purple with instruction
      document.getElementById("taskDescription").style.fontSize = "120%";
      document.getElementById("taskDescription").style.transition =
        "font-size 1000ms ease";
      document.getElementById("taskDescription").innerHTML =
        "found smallest distance from start: " +
        '<p style="font-size:30px; text-align: center; padding: 0px; margin: 0px">' +
        i +
        "</p>";
      highlightInstruction.style.transition = "background-color 1000ms ease";
      highlightInstruction.style.backgroundColor = "#7d34eb";
      await sleep(1500);
      nodeLink[i].colour = "#7d34eb";
      nodeLink[i].bgColour = "#5e1dbf";
      await sleep(3500);
      highlightInstruction.style.backgroundColor = "#F06449";
      document.getElementById("taskDescription").style.fontSize = "100%";

      for (let j = 0; j < nodeLink.length; j++) {
        if (!visited[j] && distFromStart[j] < minValue) {
          minValue = distFromStart[j];
          minNode = j;
          //nodeLink[j].colour = "orange";
          //document.getElementById("taskDescription").innerHTML =
          //  "updating: current distance is better <br/> than previous distance";

          document.getElementById("D" + minNode).innerHTML = minValue;

          document.getElementById("D" + minNode).style.fontSize = "200%";
          document.getElementById("D" + minNode).style.transition =
            "font-size 1000ms ease";
          highlightDistance.style.transition = "background-color 1000ms ease";
          highlightDistance.style.backgroundColor = "#7d34eb";
          await sleep(3000);
          highlightDistance.style.backgroundColor = "#F06449";
          document.getElementById("D" + minNode).style.fontSize = "100%";
          if (minNode != 0) {
            document.getElementById("V" + minNode).innerHTML = parent[minNode];
          }
          document.getElementById("V" + minNode).style.fontSize = "200%";
          document.getElementById("V" + minNode).style.transition =
            "font-size 1000ms ease";
          highlightParents.style.transition = "background-color 1000ms ease";
          highlightParents.style.backgroundColor = "#7d34eb";
          await sleep(3500);
          highlightParents.style.backgroundColor = "#F06449";
          document.getElementById("V" + minNode).style.fontSize = "100%";
          await sleep(2500);
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

          document.getElementById("taskDescription").style.fontSize = "120%";
          document.getElementById("taskDescription").style.transition =
            "font-size 1000ms ease";
          document.getElementById("taskDescription").innerHTML =
            "exploring connections of most recently <br/>visited node (" +
            minNode +
            ") to find the smallest <br/>distance from the start";
          highlightInstruction.style.transition =
            "background-color 1000ms ease";
          highlightInstruction.style.backgroundColor = "#344feb";
          await sleep(4500);
          nodeLink[adj].colour = "#344feb";
          nodeLink[adj].bgColour = "#243cc7";
          await sleep(2500);

          highlightInstruction.style.backgroundColor = "#F06449";
          document.getElementById("taskDescription").style.fontSize = "100%";

          document.getElementById("D" + minNode).innerHTML = minValue;
          await sleep(1000);

          console.log(minNode);
        }
      }

      minValue = 99999;
      minNode = 0;
      */
    }

    let order = [];

    /*     Describing Order      */
    document.getElementById("taskDescription").style.fontSize = "120%";
    document.getElementById("taskDescription").style.transition =
      "font-size 1000ms ease";
    document.getElementById("taskDescription").innerHTML =
      "starting at the target node, we <br/> run back along the parents <br/> to find the final shortest path";
    highlightInstruction.style.transition = "background-color 1000ms ease";
    highlightInstruction.style.backgroundColor = "#f2be3a";
    await sleep(1500);
    document.getElementById("queue").innerHTML = "order: [" + order + "]";
    await sleep(2500);
    highlightInstruction.style.backgroundColor = "#F06449";
    document.getElementById("taskDescription").style.fontSize = "100%";

    let n = endNode; //nodeLink.length - 1;
    while (n != startNode) {
      order.push(n);
      n = parent[n];
      document.getElementById("queue").innerHTML = "order: [" + order + "]";
      await sleep(1000);
    }
    order.push(nearestNode);
    document.getElementById("queue").innerHTML = "order: [" + order + "]";
    await sleep(1000);

    document.getElementById("taskDescription").style.fontSize = "120%";
    document.getElementById("taskDescription").style.transition =
      "font-size 1000ms ease";
    document.getElementById("taskDescription").innerHTML =
      "the order is reversed so we start <br/> at the right place";
    highlightInstruction.style.transition = "background-color 1000ms ease";
    highlightInstruction.style.backgroundColor = "#f2be3a";
    await sleep(1500);
    document.getElementById("queue").innerHTML = "order: [" + order + "]";
    await sleep(1500);
    highlightInstruction.style.backgroundColor = "#F06449";
    document.getElementById("taskDescription").style.fontSize = "100%";

    order.reverse();
    console.log(order);

    document.getElementById("queue").innerHTML = "order: [" + order + "]";
    await sleep(1500);

    document.getElementById("taskDescription").style.fontSize = "120%";
    document.getElementById("taskDescription").style.transition =
      "font-size 1000ms ease";
    document.getElementById("taskDescription").innerHTML =
      "now, we simply run through <br/> the order";
    highlightInstruction.style.transition = "background-color 1000ms ease";
    highlightInstruction.style.backgroundColor = "#f2be3a";
    await sleep(1500);
    document.getElementById("queue").innerHTML = "order: [" + order + "]";
    await sleep(1500);
    highlightInstruction.style.backgroundColor = "#F06449";
    document.getElementById("taskDescription").style.fontSize = "100%";

    for (let f = 0; f < order.length; f++) {
      nodeLink[order[f]].colour = "#F52F2F";
      nodeLink[order[f]].bgColour = "#F66161";
      document.getElementById("H" + order[f]).style.transition =
        "font-size 1000ms ease";
      document.getElementById("H" + order[f]).style.fontSize = "200%";

      await sleep(1500);
      document.getElementById("H" + order[f]).style.fontSize = "100%";

      await sleep(1500);
    }

    console.log("DFS: ", distFromStart);
    console.log("VIS: ", visited);
    console.log("PAR", parent);
  }

  function sleep(ms) {
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
          <MainInfo
            colour="#F06449"
            title="dijkstra's"
            description={
              <div>
                <p
                  id="taskDescription"
                  style={{
                    textAlign: "center",
                    fontSize: "18px",
                    minHeight: "5vh",
                    maxHeight: "5vh",
                  }}
                >
                  finds the shortest path from <br />
                  one point to another.
                  <br />
                  <br />
                  drag nodes to change their location.
                </p>
                <p
                  id="queue"
                  style={{
                    margin: "0px",
                    marginTop: "1vh",
                    padding: "0px",
                    textAlign: "center",
                    fontSize: "120%",
                  }}
                ></p>
              </div>
            }
          />
          <ArrayVisDistance
            colour="#F06449"
            title="distance from start"
            description={
              <div>0 &emsp; 1 &emsp; 2 &emsp; 3 &emsp; 4 &emsp; 5 &emsp; 6</div>
            }
          />
          <ArrayVisParents
            colour="#F06449"
            title="parents array"
            description={<div></div>}
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
                  purple={dimensions}
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
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: "2vh",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingBottom: "2vh",
                  }}
                >
                  <InputValue
                    placeholder="from"
                    onChange={(event) => setStartNode(event.target.value)}
                  />
                  <InputValue
                    placeholder="to"
                    onChange={(event) => setEndNode(event.target.value)}
                  />
                </div>
                <AddButton onClick={() => dijkstras()}>
                  <p>start</p>
                </AddButton>
              </div>
            </ControlHolder>
          </StaticPosition>
        </ItemRowContent>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default Dijkstra;
