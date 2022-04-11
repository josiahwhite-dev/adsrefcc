import React, { useEffect, useRef, useState } from "react";
import Sketch from "react-p5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as BackArrow } from "../../icons/BackArrow.svg";
import { Item, media, Title, TopWrapper } from "../../Shared";
import {Info} from "../../common/Structure"


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
  align-items: flex-start;

  margin-right: 10%;
  min-width: 40vw;
  max-width: 40vw;
  min-height: 100vh;
  max-height: 100vh;

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
  min-width: 15vw;
  max-width: 15vw;
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
  width: 10vh;
  height: 10vh;
  background-color: #78fc59;
  border-radius: 4vh;
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
  align-self: center;
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

const ControlHolder = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-auto-rows: 1fr;
  position: relative;
  height: 12vh;
  margin-bottom: 2vh;
  align-items: center;
  justify-content: center;
  justify-items: center;

  z-index: 0;
  margin-top: 2vh;
  background-color: transparent;
  border-radius: 2vh;
  ${media.mobile} {
    height: 7vh;
    width: 100%;
    margin-bottom: 0vh;
  }
`;

const StaticPosition = styled.div`
  position: fixed;
  ${media.mobile} {
    margin-top: inherit;
    position: relative;
  }
`;


function LinkedList() {
  const holderRef = useRef();
  const screenRef = useRef();
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

  const [frameWidth, setFrameWidth] = useState(0);
  const [frameHeight, setFrameHeight] = useState(0);

  const a = useEffect(() => {
    if (holderRef.current.getBoundingClientRect().width > 0) {
      setFrameWidth(holderRef.current.getBoundingClientRect().width);
      setFrameHeight(holderRef.current.getBoundingClientRect().height);

      for (let i = 0; i < nodeLink.length; i++) {
        nodeLink[i].r = (frameHeight + frameWidth) / 15;
      }
    }
  }, [holderRef.current, isRendered]);

  const createNodes = useEffect(() => {
    if (looper < 3) {
      var Node = {
        x: nodeX,
        y: nodeY,
        value: nodeValue,
        id: nodeID,
        r: (frameHeight + frameWidth) / 15,
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
    if (nodeLink.length <= 3) {
      setNodeValue(Math.floor(Math.random() * 99));
    }
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
    window.scrollTo({ top: 0, behavior: "smooth" });
    setGlobalWidth(frameWidth);
    setGlobalHeight(frameHeight);

    p5.createCanvas(frameWidth, frameHeight).parent(canvasParentRef);

    //Finding node closest to center;
    setIsRendered(1);
  }

  const fixPositions = useEffect(() => {}, [isRendered]);

  function test() {}

  function windowResized(p5) {
    /*
    //Just fix holderref properties pls
    if (holderRef.current.getBoundingClientRect().width > 1000) {
      p5.resizeCanvas(
        holderRef.current.getBoundingClientRect().width,
        holderRef.current.getBoundingClientRect().height * 0.8
      );
      p5.resizeCanvas(
        holderRef.getBoundingClientRect().width,
        holderRef.current.getBoundingClientRect().height * 0.8
      );
    } else {
    }*/

    p5.resizeCanvas(
      holderRef.current.getBoundingClientRect().width,
      holderRef.current.getBoundingClientRect().height
    );

    for (let i = 0; i < nodeLink.length; i++) {
      nodeLink[i].r =
        (holderRef.current.getBoundingClientRect().height +
          holderRef.current.getBoundingClientRect().width) /
        15;
    }

    setGlobalHeight(p5.windowHeight);
    console.log("resize");
  }

  let draw = (p5) => {
    p5.clear();
    p5.noStroke();

    if (isRendered == 1) {
      let newXY = [...nodeLink];
      let currX = frameWidth / 2;
      let currY = (frameHeight * 0.8) / 8;

      for (let i = 0; i < nodeLink.length; i++) {
        nodeLink[i].x = currX;
        nodeLink[i].y = currY;
        nodeLink[i].r = (frameHeight + frameWidth) / 15;

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
      setIsRendered(2);
    }

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
    console.log(nodeLink.length);
    var Node = {
      x: nodeX,
      y: nodeY,
      value: nodeValue,
      id: nodeID,
      r: (frameHeight + frameWidth) / 15,
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
        nodeLink[i].colour = "#BE57FF";
        nodeLink[i].bgColour = "#AD2CFF";
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
    //console.log(event);

    //console.log(window.innerWidth);

    if (event.mouseX > 0 && event.mouseY > 0) {
      for (let m = 0; m < nodeLink.length; m++) {
        nodeLink[m].y += event._mouseWheelDeltaY / 8;
        nodeLink[m].color = "grey";

        setNodeY(nodeLink[nodeLink.length - 1].y + globalHeight / 8);
      }
    }
  }

  function mouseDragged(p5) {
    console.log(p5.mouseY);
    console.log(frameHeight);

    /*
    for (let i = 0; i < nodeLink.length; i++) {
      if (p5.mouseY < mouseCurrentY) {
        nodeLink[i].y += p5.mouseX / 50;
      } else {
        nodeLink[i].y -= p5.mouseX / 50;
      }
    }*/

    /* for (let m = 0; m < nodeLink.length; m++) {
      if (event.mouseY > frameHeight / 4) {
        nodeLink[m].y += event.mouseY / 80;
      } else {
        nodeLink[m].y -= event.mouseY / 80;
      }
    }*/
    console.log("TOP: ", document.documentElement.scrollTop);

    if (window.innerWidth > 1000) {
      if (p5.mouseX > 0 && p5.mouseY > 0) {
        window.onscroll = function () {
          document.body.style.overflow = "hidden";
        };
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
        window.onscroll = function () {
          window.scrollTo(0, 0);
        };
        for (let i = 0; i < nodeLink.length; i++) {
          if (p5.mouseY < mouseCurrentY) {
            nodeLink[i].y += p5.mouseX / 50;
          } else {
            nodeLink[i].y -= p5.mouseX / 50;
          }
        }
      }
    }

    setNodeY(nodeLink[nodeLink.length - 1].y + globalHeight / 8);
  }

  const [mouseCurrentY, setMouseCurrentY] = useState();

  function mousePressed(p5) {
    setMouseCurrentY(p5.mouseY);
  }

  function mouseReleased(p5) {
    window.onscroll = function () {};
  }

  return (
    <AlgorithmsWrapper
      className="LinkedList"
      onLoad={() => console.log("Loaded!")}
      ref={screenRef}
    >
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
            title="linked list"
            description={
              <div>
                <p style={{ textAlign: "center" }}>
                  linked lists are made up of nodes, which contain data and an
                  address. the address 'points' to where the next node in the
                  sequence is in memory. these addresses can be easily changed,
                  making reording simple.
                  <br />
                  <br />
                  however, this comes at the cost of a greater access cost than
                  something like an array, as nodes are rarely right next to
                  each other in memory.
                </p>
              </div>
            }
          />
          <Info
            colour="#6DD3CE"
            title="use cases"
            description={
              <div>
                <p style={{ textAlign: "center" }}>
                  linked lists are best used in applications where data will
                  often be inserted or removed, as changing the order of
                  elements is inexpensive.
                  <br />
                  <br />
                  some web browsers store browser history with a linked list.
                  this makes sense, as every time a website is visited, new data
                  would need to be added, or when history is removed, data
                  removed.
                  <br />
                  <br />
                  essentially, linked lists are useful when storing data is done
                  more frequently than accessing data
                </p>
              </div>
            }
          />
          <Info
            colour="#FFA5B2"
            title="costs"
            description={
              <div>
                <p style={{ textAlign: "center" }}>
                  access element: O(n)
                  <br />
                  <br />
                  search: O(n)
                  <br />
                  <br />
                  insert data at start: O(1)
                  <br />
                  insert data at point: O(n)
                  <br />
                  <br />
                  delete data at start: O(1)
                  <br />
                  delete data at point: O(n)
                </p>
              </div>
            }
          />
        </ItemRowDescription>
        <ItemRowContent>
          <StaticPosition>
            <SketchHolder id="IRC" ref={holderRef}>
              {
                // This fixes the issue of the render paradox
                //Width of is not known until render, but conditional statement
                //Forces rerender and fixes issue
                frameWidth < 1 && (
                  <Sketch
                    setup={test}
                    draw={draw}
                    windowResized={windowResized}
                    mouseWheel={mouseWheel}
                  />
                )
              }
              {frameWidth > 1 && (
                <Sketch
                  setup={setup}
                  draw={draw}
                  windowResized={windowResized}
                  mouseWheel={mouseWheel}
                  mouseDragged={mouseDragged}
                  mousePressed={mousePressed}
                  mouseReleased={mouseReleased}
                />
              )}
            </SketchHolder>

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
          </StaticPosition>
        </ItemRowContent>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default LinkedList;

