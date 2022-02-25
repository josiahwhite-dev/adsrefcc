import { Link, useHistory } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../icons/BackArrow.svg";
import styled from "styled-components";
import { TopWrapper, Title, media, Item } from "../../Shared";
import ArrayElement from "./ArrayElement";
import React, { useState, useEffect } from "react";

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
  width: 66%;
  background-color: transparent;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;

  height: auto;
  margin-right: 10%;
  width: 100vw;

  justify-content: center;
  ${media.mobile} {
    justify-content: center;
    align-items: center;
    width: 100%;

    height: 40vh;

    margin: 0%;
    margin-bottom: 10vh;
  }
`;

const AddButton = styled.div`
  display: flex;
  width: auto;
  min-width: 10vw;
  height: 10vh;
  background-color: #ffe26a;
  border-radius: 4vh;
  margin-left: 1vw;
  margin-right: 1vw;
  align-items: center;
  align-self: center;
  justify-content: center;

  p {
    font-weight: bold;
    color: white;
    font-size: 7vh;
  }

  ${media.mobile} {
    height: 6vh;

    p {
      font-size: 5vh;
    }
  }
`;

const ArrayHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: transparent;
  height: auto;
  min-width: 38vw;
  padding-top: 2vh;

  align-items: center;
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

const ControlHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  position: relative;
  height: 12vh;
  margin-bottom: 2vh;
  align-items: center;
  justify-content: center;
  max-width: 90vw;

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

const ArrayPosHolder = styled.div`
  display: grid;
  background-color: transparent;

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

const StaticPosition = styled.div`
  position: fixed;
  margin-top: 60vh;

  ${media.mobile} {
    display: flex;
    flex-direction: column;
    align-items: center;
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
function QuickSort() {
  const [arrayLink, setArrayLink] = useState([]);
  const [positionLink, setPositionLink] = useState([]);
  const [arrayValue, setArrayValue] = useState(
    Math.floor(Math.random() * 99) + 1
  );
  const [arrayPosition, setArrayPosition] = useState(0);
  const [indexToChange, setIndexToChange] = useState(null);
  const [arrayID, setArrayID] = useState(0);
  const [shouldChange, setShouldChange] = useState(0);

  const [foreground, setForeground] = useState(null);
  const [background, setBackground] = useState(null);
  const [elementState, setElementState] = useState(null);
  const [elementTextColour, setElementTextColour] = useState(null);

  const [found, setFound] = useState(null);

  //For Links Between

  const movementMap = [
    "translate(0vh, -4vh) rotate(20deg)",
    "translate(-6vh, -4vh) rotate(-20deg)",
    /* "translate(6vh, -4vh) rotate(-20deg)",
    "translate(5vh, -4vh) rotate(200deg)",*/
  ];
  let highlightInstruction = document.getElementById("mainInfo");
  //1 and 3 are the same
  const arrayMovementMap = ["translate(5vh, 0vh) ", " translate(-5vh, 0vh) "];

  //Will run through 3 possible states
  const [movementIterator, setMovementIterator] = useState(0);
  const [transform, setTransform] = useState(movementMap[movementIterator]);

  const [arrayTransform, setArrayTransform] = useState(
    arrayMovementMap[movementIterator]
  );

  async function quickSortFunction(low, high) {
    if (low < high) {
      let pi = await partition(low, high);
      console.log("Pi: " + pi);

      quickSortFunction(low, pi - 1);

      await sleep(2000);

      quickSortFunction(pi + 1, high);
      await sleep(2000);
    }
    await sleep(2500);
  }

  async function partition(low, high) {
    let pivot = arrayLink[high];

    let i = low - 1;
    let j;
    console.log(arrayLink[low].arrayValue);
    console.log(arrayLink[high].arrayValue);

    for (j = low; j <= high - 1; j++) {
      updateColours(i, j, high);

      if (arrayLink[j].arrayValue >= pivot.arrayValue) {
        // If current element is smaller than the pivot
        // setFound("j is not smaller than " + pivot.arrayValue);
        highlightInstruction.style.transition = "background-color 1000ms ease";
        highlightInstruction.style.backgroundColor = "#5ECC44";
        document.getElementById("taskDescription").style.transition =
          "font-size 1000ms ease";
        document.getElementById("taskDescription").style.fontSize = "120%";
        document.getElementById("taskDescription").innerHTML =
          "j is not smaller than " + pivot.arrayValue;
        await sleep(1000);
        highlightInstruction.style.backgroundColor = "#F06449";
        document.getElementById("taskDescription").style.fontSize = "100%";
      }

      if (arrayLink[j].arrayValue < pivot.arrayValue) {
        console.log("called!");
        i++; // increment index of smaller element
        // setFound("j is smaller than " + pivot.arrayValue);
        highlightInstruction.style.transition = "background-color 1000ms ease";
        highlightInstruction.style.backgroundColor = "#D059FC";
        document.getElementById("taskDescription").style.transition =
          "font-size 1000ms ease";
        document.getElementById("taskDescription").style.fontSize = "120%";
        document.getElementById("taskDescription").innerHTML =
          "j is smaller than " + pivot.arrayValue;
        await sleep(1000);
        highlightInstruction.style.backgroundColor = "#F06449";
        document.getElementById("taskDescription").style.fontSize = "100%";

        updateColours(i, j, high);

        if (i == j) {
          /*setFound(
            " j is smaller than " +
              pivot.arrayValue +
              ", i and j will swap," +
              " \n\nbut i = j so nothing happens "
          );*/

          highlightInstruction.style.transition =
            "background-color 1000ms ease";
          highlightInstruction.style.backgroundColor = "#D059FC";
          document.getElementById("taskDescription").style.transition =
            "font-size 1000ms ease";
          document.getElementById("taskDescription").style.fontSize = "120%";
          document.getElementById("taskDescription").innerHTML =
            " j is smaller than " + pivot.arrayValue;

          await sleep(1000);

          document.getElementById("taskDescription").style.fontSize = "100%";
          await sleep(1000);
          document.getElementById("taskDescription").innerHTML =
            "so i moves up 1 ";
          document.getElementById("taskDescription").style.fontSize = "120%";
          await sleep(2500);

          document.getElementById("taskDescription").style.fontSize = "100%";
          await sleep(1000);
          document.getElementById("taskDescription").innerHTML =
            "but now i = j so nothing happens ";
          document.getElementById("taskDescription").style.fontSize = "120%";
          await sleep(1000);
          //Maybe need to swap here instead for colours
          await swap(i, j);
          highlightInstruction.style.backgroundColor = "#F06449";
          document.getElementById("taskDescription").style.fontSize = "100%";

          document.getElementById("taskDescription").style.fontSize = "100%";
        } else {
          //setFound(
          //  "j is smaller than " + pivot.arrayValue + ", i and j will swap"
          //);
          document.getElementById("taskDescription").style.fontSize = "100%";
          await sleep(1000);
          document.getElementById("taskDescription").innerHTML =
            "i moves up 1 ";
          document.getElementById("taskDescription").style.fontSize = "120%";
          await sleep(1500);
          highlightInstruction.style.transition =
            "background-color 1000ms ease";
          highlightInstruction.style.backgroundColor = "#D059FC";
          document.getElementById("taskDescription").style.transition =
            "font-size 1000ms ease";
          document.getElementById("taskDescription").style.fontSize = "120%";
          document.getElementById("taskDescription").innerHTML =
            "i and j will swap their values";
          await sleep(1500);
          //Maybe need to swap here instead for colours
          await swap(i, j);
          highlightInstruction.style.backgroundColor = "#F06449";
          document.getElementById("taskDescription").style.fontSize = "100%";

          highlightInstruction.style.backgroundColor = "#D059FC";
        }
      }
      await sleep(1500);
    }

    highlightInstruction.style.transition = "background-color 1000ms ease";
    highlightInstruction.style.backgroundColor = "#44BAB5";
    document.getElementById("taskDescription").style.transition =
      "font-size 1000ms ease";
    document.getElementById("taskDescription").style.fontSize = "120%";
    document.getElementById("taskDescription").innerHTML =
      "j has reached the end";
    await sleep(2500);

    highlightInstruction.style.backgroundColor = "#F06449";
    document.getElementById("taskDescription").style.fontSize = "100%";

    await sleep(2500);
    // setFound("pivot will swap with i + 1 ");
    highlightInstruction.style.transition = "background-color 1000ms ease";
    highlightInstruction.style.backgroundColor = "#44BAB5";
    document.getElementById("taskDescription").style.transition =
      "font-size 1000ms ease";
    document.getElementById("taskDescription").style.fontSize = "120%";
    document.getElementById("taskDescription").innerHTML =
      "pivot will now swap with i + 1 ";
    await sleep(2500);

    highlightInstruction.style.backgroundColor = "#F06449";
    document.getElementById("taskDescription").style.fontSize = "100%";
    await swap(i + 1, high);
    return Promise.resolve(i + 1);
  }

  async function updateColours(i, j, high) {
    let newArrayLink = [...arrayLink];

    let c;
    for (c = 0; c < 10; c++) {
      if (c !== i && c !== j && c !== high) {
        if (c > i && c < high) {
          newArrayLink[c].foreground =
            "linear-gradient(to  right, #B492BE, #B492BE)";
          newArrayLink[c].background =
            "linear-gradient(to  right, #897390, #897390)";
          newArrayLink[c].elementState = "";
          newArrayLink[c].elementTextColour = "";
        } else {
          newArrayLink[c].foreground =
            "linear-gradient(to  right, #d1d1d1, #d1d1d1)";
          newArrayLink[c].background =
            "linear-gradient(to  right, #ebebeb, #ebebeb)";
          newArrayLink[c].elementState = "";
          newArrayLink[c].elementTextColour = "";
        }
      }
    }

    console.log("j: " + j);
    newArrayLink[j].foreground = "linear-gradient(to  right, #5ECC44, #5ECC44)";
    newArrayLink[j].background = "linear-gradient(to  right, #4AA734, #4AA734)";
    newArrayLink[j].elementState = "j ";
    newArrayLink[j].elementTextColour = "#4AA734";

    if (i >= 0) {
      newArrayLink[i].foreground =
        "linear-gradient(to  right, #44BAB5, #44BAB5)";
      newArrayLink[i].background =
        "linear-gradient(to  right, #2D9D98, #2D9D98)";
      newArrayLink[i].elementState = "i ";
      newArrayLink[i].elementTextColour = "#2D9D98";
    }
    newArrayLink[high].foreground =
      "linear-gradient(to  right, #FF3F1A, #FF3F1A)";
    newArrayLink[high].background =
      "linear-gradient(to  right, #CB391E, #CB391E)";
    newArrayLink[high].elementState = "pivot ";
    newArrayLink[high].elementTextColour = "#CB391E";

    setArrayLink(newArrayLink);
    await sleep(2000);
  }

  async function swap(i, j) {
    await sleep(1500);
    let highlightColours = [...arrayLink];
    highlightColours[i].foreground =
      "linear-gradient(to  right, #D059FC, #D059FC)";
    highlightColours[i].background =
      "linear-gradient(to  right, #BD08FF, #BD08FF)";
    highlightColours[j].foreground =
      "linear-gradient(to  right, #D059FC, #D059FC)";
    highlightColours[j].background =
      "linear-gradient(to  right, #BD08FF, #BD08FF)";

    setArrayLink(highlightColours);

    await sleep(1500);

    let temp = arrayLink[i].arrayValue;
    let newArrayLink = [...arrayLink];

    newArrayLink[i].arrayValue = newArrayLink[j].arrayValue;
    newArrayLink[j].arrayValue = temp;

    setArrayLink(newArrayLink);
    await sleep(1500);
  }

  function sleep(ms) {
    console.log(ms);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function changeArrayFromInput(value, id) {
    console.log(id);
    let newArrayLink = [...arrayLink];
    newArrayLink[id].arrayValue = value;
    setArrayLink(newArrayLink);
    console.log((newArrayLink[id].arrayValue = value));
  }

  const [changer, setChanger] = useState(0);

  const initialArray = useEffect(() => {
    setArrayLink([
      ...arrayLink,
      {
        arrayValue,
        arrayID,
        foreground,
        background,
        elementState,
        elementTextColour,
      },
    ]);
    setArrayID(arrayID + 1);
  }, [changer]);

  const run10times = useEffect(() => {
    if (changer < 9) {
      setChanger(changer + 1);
      setArrayValue(Math.floor(Math.random() * 99) + 1);
    }
  }, [arrayLink]);

  return (
    <AlgorithmsWrapper>
      <TopWrapper>
        <BackLink as={Link} to="/algorithms">
          <BackArrow />
        </BackLink>

        <Title>quick sort</Title>
      </TopWrapper>
      <BodyWrapper>
        <ItemRowDescription>
          <MainInfo
            colour="#F06449"
            title="quick sort"
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
                  an efficient sorting algorithm for arrays that works by
                  breaking the array into smaller sub arrays, sorting them, then
                  putting them back together
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

          <Info
            colour="#6DD3CE"
            title="use cases"
            description={
              <div>
                <p style={{ textAlign: "center" }}>
                  quick sort can be used any time data needs to be sorted. if
                  the rough locations of where the different values of data
                  might be are known, it can also be optimised through good
                  choices of pivots.
                  <br />
                </p>
              </div>
            }
          />
          <Info
            colour="#FFA5B2"
            title="cost"
            description={
              <div>
                <p style={{ textAlign: "center" }}>
                  best case O(n)
                  <br />
                  <br />
                  happens when the pivot value is the value closest to the
                  average of the dataset
                  <br />
                  <br />
                  worst case O(n^2)
                  <br />
                  <br />
                  happens when pivot value is the max / min of the dataset
                  <br />
                  <br />
                  stable: no
                </p>
              </div>
            }
          />
        </ItemRowDescription>
        <ItemRowContent>
          {/*   <Array value={10} />
          <ArrayLine
            rotation={"translate(-2vh, 1vh) rotate(-20deg) "}
            movement={"5vw"}
          />
          <Array value={20} movement={"5vw"} />
          <ArrayLine
            rotation={"translate(-3vh, 0vh) rotate(20deg) "}
            movement={"5vw"}
          />
          <Array value={30} movement={"-5vw"} />*/}
          <StaticPosition>
            {" "}
            <ArrayHolder>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1 style={{ minHeight: "8vh", maxHeight: "8vh" }}>{found}</h1>
                <ArrayPosHolder>
                  {arrayLink.map(
                    ({
                      arrayValue,
                      arrayID,
                      foreground,
                      background,
                      elementState,
                      elementTextColour,
                    }) => (
                      <React.Fragment>
                        <ArrayElement
                          value={arrayValue}
                          id={arrayID}
                          movement={arrayTransform}
                          foreground={foreground}
                          background={background}
                          elementState={elementState}
                          textColour={elementTextColour}
                          textInsert={
                            <TextInsert
                              placeholder={arrayValue}
                              onChange={(event) =>
                                changeArrayFromInput(
                                  event.target.value,
                                  arrayID
                                )
                              }
                            ></TextInsert>
                          }
                        />
                      </React.Fragment>
                    )
                  )}
                </ArrayPosHolder>
              </div>
            </ArrayHolder>
            <ControlHolder>
              <AddButton onClick={() => quickSortFunction(0, 9)}>
                <p>sort</p>
              </AddButton>
            </ControlHolder>
          </StaticPosition>
        </ItemRowContent>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default QuickSort;
