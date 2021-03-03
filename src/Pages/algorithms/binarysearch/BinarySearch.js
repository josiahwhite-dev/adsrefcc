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
  background-color: honeydew;
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

    height: 60vh;
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
  width: auto;
  height: 10vh;
  background-color: #78fc59;
  border-radius: 4vw;
  margin-left: 1vh;
  margin-right: 1vh;
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
    border-radius: 2vh;

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

const ArrayHolder = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: transparent;
  height: auto;
  width: 38vw;
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
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;
  position: relative;
  height: 12vh;
  margin-bottom: 2vh;
  align-items: center;
  justify-content: center;

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

function BinarySearch() {
  const [arrayLink, setArrayLink] = useState([]);
  const [positionLink, setPositionLink] = useState([]);
  const [arrayValue, setArrayValue] = useState(10);
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

  //1 and 3 are the same
  const arrayMovementMap = ["translate(5vh, 0vh) ", " translate(-5vh, 0vh) "];

  //Will run through 3 possible states
  const [movementIterator, setMovementIterator] = useState(0);
  const [transform, setTransform] = useState(movementMap[movementIterator]);

  const [arrayTransform, setArrayTransform] = useState(
    arrayMovementMap[movementIterator]
  );

  //For binary search:
  /*const [middle, setMiddle] = useState(null);
  const [low, setLow] = useState(null);
  const [mid, setMid] = useState(null);
  const [high, setHigh] = useState(null);*/

  function sleep(ms) {
    console.log(ms);
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function binarySearchFunction(array, low, high, target) {
    if (high >= low) {
      let mid = Math.floor(low + (high - low) / 2);

      updateColours(low, mid, high);

      if (array[mid].arrayValue == target) {
        setFound("found at index " + mid);
        return;
      }

      if (array[mid].arrayValue > target) {
        setFound(
          array[mid].arrayValue + " > " + target + " must be in first half"
        );
        await sleep(4000);
        return binarySearchFunction(array, low, mid - 1, target);
      }

      setFound(
        array[mid].arrayValue + " < " + target + ", must be in second half"
      );
      await sleep(4000);
      return binarySearchFunction(array, mid + 1, high, target);
    }
    setFound("not found");
    return;
  }

  function updateColours(low, mid, high) {
    let newArrayLink = [...arrayLink];

    //Low
    newArrayLink[low].foreground =
      "linear-gradient(to  right, #44BAB5, #44BAB5)";
    newArrayLink[low].background =
      "linear-gradient(to  right, #2D9D98, #2D9D98)";
    newArrayLink[low].elementState = "low ";
    newArrayLink[low].elementTextColour = "#2D9D98";

    //Mid
    newArrayLink[mid].foreground =
      "linear-gradient(to  right, #5ECC44, #5ECC44)";
    newArrayLink[mid].background =
      "linear-gradient(to  right, #4AA734, #4AA734)";
    newArrayLink[mid].elementState = "mid ";
    newArrayLink[mid].elementTextColour = "#4AA734";

    //High
    newArrayLink[high].foreground =
      "linear-gradient(to  right, #FF3F1A, #FF3F1A)";
    newArrayLink[high].background =
      "linear-gradient(to  right, #CB391E, #CB391E)";
    newArrayLink[high].elementState = "high ";
    newArrayLink[high].elementTextColour = "#CB391E";

    if (low === mid) {
      newArrayLink[mid].foreground =
        "linear-gradient(to right, #44BAB5 0%,#44BAB5 50%,#000000 50%,#5ECC44 50%,#5ECC44 100%)";
      newArrayLink[low].elementState = " ";
      newArrayLink[mid].elementState = " ";
      newArrayLink[high].elementTextColour = "white";
    }

    if (mid === high) {
      newArrayLink[mid].foreground =
        "linear-gradient(to right, green 0%,green 50%,#000000 50%,red 50%,red 100%)";
      newArrayLink[high].elementState = " ";
      newArrayLink[mid].elementState = " ";
      newArrayLink[high].elementTextColour = "white";
    }

    if (low === high) {
      newArrayLink[low].foreground =
        "linear-gradient(to right, blue 0%,blue 50%,#000000 50%,red 50%,red 100%)";
      newArrayLink[high].elementState = " ";
      newArrayLink[low].elementState = " ";
      newArrayLink[high].elementTextColour = "white";
    }

    if (low === high && low === mid) {
      newArrayLink[mid].foreground =
        "linear-gradient(to right, #44BAB5 0%,#44BAB5 33%,#000000 33%,#5ECC44 33%,#5ECC44 66%, #000000 66%, #FF3F1A 66%,#FF3F1A 100%)";
      newArrayLink[high].elementState = "";
      newArrayLink[low].elementState = "";
      newArrayLink[mid].elementState = "";
      newArrayLink[high].elementTextColour = "gold";
    }

    let i;
    for (i = 0; i < 10; i++) {
      if (i !== low && i !== mid && i !== high) {
        if (i > low && i < high) {
          newArrayLink[i].foreground =
            "linear-gradient(to  right, #B492BE, #B492BE)";
          newArrayLink[i].background =
            "linear-gradient(to  right, #897390, #897390)";
          newArrayLink[i].elementState = "";
          newArrayLink[i].elementTextColour = "";
        } else {
          newArrayLink[i].foreground =
            "linear-gradient(to  right, #7c7c7c, #7c7c7c)";
          newArrayLink[i].background =
            "linear-gradient(to  right, #a8a8a8, #a8a8a8)";
          newArrayLink[i].elementState = "";
          newArrayLink[i].elementTextColour = "";
        }
      }
    }

    setArrayLink(newArrayLink);
    //setArrayLink({ ...arrayLink, [array.arrayValue]: arrayValue });
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
    if (changer == 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (changer < 9) {
      setChanger(changer + 1);
      setArrayValue(arrayValue + 1);
    }
  }, [arrayLink]);

  return (
    <AlgorithmsWrapper>
      <TopWrapper>
        <BackLink as={Link} to="/algorithms">
          <BackArrow />
        </BackLink>

        <Title>binary search</Title>
      </TopWrapper>
      <BodyWrapper>
        <ItemRowDescription>
          <Info
            colour="#F06449"
            title="description"
            description={
              <div>
                <p>
                  binary search is a simple search algorithm for sorted arrays{" "}
                  <br />
                  <br />
                  it works by first checking the value at the middle of the
                  array. if this value is greater than the value that it is
                  searching for, this must mean that the target value is in the
                  first half of the array.
                  <br />
                  <br />
                  if it is smaller than the value it is searching for, then the
                  target value must be in the second half of the array.
                  <br />
                  <br />
                  then, the process is repeated for whichever half of the array
                  is chosen, and the array continues being split in half until
                  the value is found.
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
                  while this search algorithm is relatively easy to understand
                  and implement, it only works if the array is sorted.
                  otherwise, it will not know which half of the array to look
                  in.
                  <br />
                  <br />
                  therefore, it should only be used applications where data is
                  sorted. this could be in something like a library catalogue
                  where books are sorted in id or name order.
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
                  binary search: O(log n)
                  <br />
                  <br />
                  why? every iteration, the number of elements being looked at
                  is halved.
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
            <ArrayHolder>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <h1>{found}</h1>

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
              <InputValue
                placeholder="find"
                onChange={(event) => setArrayValue(event.target.value)}
              />

              <AddButton
                onClick={() =>
                  binarySearchFunction(arrayLink, 0, 9, arrayValue)
                }
              >
                <p>+</p>
              </AddButton>
            </ControlHolder>
          </StaticPosition>
        </ItemRowContent>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default BinarySearch;
