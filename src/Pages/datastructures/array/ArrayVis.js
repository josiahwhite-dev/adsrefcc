import { Link, useHistory } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../icons/BackArrow.svg";
import styled from "styled-components";
import { TopWrapper, Title, media, Item } from "../../Shared";
import ArrayElement from "./ArrayElement";
import React, { useState, useEffect } from "react";

import {AlgorithmsWrapper, BodyWrapper, ItemRowDescription, ItemRowContent, ArrayHolder, ArrayPosHolder, Info, MainInfo} from "../../common/Structure"



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


const ControlHolder = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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


const BackLink = styled.div`
  /* lets use react link */
  padding-left: 2%;
`;

const StaticPosition = styled.div`
  position: fixed;
  margin-top: 40vh;
  ${media.mobile} {
    margin-top: inherit;
    position: relative;
  }
`;

const DownshiftArray = styled.div`

margin-top: 20vh;
  ${media.mobile}{
    margin-top: 0vh;
  }

`



function ArrayVis() {
  const [arrayLink, setArrayLink] = useState([]);
  const [positionLink, setPositionLink] = useState([]);
  const [arrayValue, setArrayValue] = useState(10);
  const [arrayPosition, setArrayPosition] = useState(0);
  const [arrayRotation, setArrayRotation] = useState("");
  const [arrayMovement, setArrayMovement] = useState("");
  const [indexToChange, setIndexToChange] = useState(null);
  const [arrayID, setArrayID] = useState(0);
  const [shouldChange, setShouldChange] = useState(0);

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

  const [changer, setChanger] = useState(0);

  const initialArray = useEffect(() => {
    setArrayLink([
      ...arrayLink,
      {
        arrayValue,
        arrayID,
      },
    ]);

    setPositionLink([
      ...positionLink,
      {
        arrayValue,
        arrayID,
      },
    ]);

    setArrayID(arrayID + 1);
    setMovementIterator(1);
  }, [changer]);

  const run5times = useEffect(() => {
    if (changer == 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (changer < 4) {
      setChanger(changer + 1);
      setArrayValue(arrayValue + 1);
    }
  }, [arrayLink]);

  function handleUpdateElement() {
    console.log("Workin!");
    setIndexToChange(
      //Finds where the ID is the same as the entered position
      arrayLink.findIndex((array) => array.arrayID == arrayPosition)
    );

    console.log("ID: " + arrayLink[3].arrayID);

    setShouldChange(shouldChange + 1);
  }

  const changeArray = useEffect(() => {
    console.log("To change: " + indexToChange);
    console.log("Position: : " + arrayPosition);
    //Stops from accessing undefined
    //Should change means that it is called whenever button pressed, cause ID can be same as before
    if (shouldChange > 0 && typeof arrayLink[indexToChange] !== "undefined") {
      handleUpdate(indexToChange);
    }
  }, [shouldChange]);

  const handleUpdate = (index) => {
    let newArrayLink = [...arrayLink];
    newArrayLink[index].arrayValue = arrayValue;
    setArrayLink(newArrayLink);
    //setArrayLink({ ...arrayLink, [array.arrayValue]: arrayValue });
  };

  return (
    <AlgorithmsWrapper>
      <TopWrapper>
        <BackLink as={Link} to="/datastructures">
          <BackArrow />
        </BackLink>

        <Title>array</Title>
      </TopWrapper>
      <BodyWrapper>
        <ItemRowDescription>
          <Info
            colour="#F06449"
            title="array"
            description={
              <div>
                <p>
                  arrays are a way of storing data. <br />
                  <br />
                  they are made up of elements, which can hold a piece of data,
                  like a number, or even another array. <br />
                  <br />
                  elements are stored right next to each other in computer
                  memory (contiguity), which means going from one element to the
                  next is extremely fast.
                  <br />
                  <br />
                  however, this also means that inserting/deleting elements
                  cannot be done, as elements are already right next to each
                  other.
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
                  arrays are best used in applications where data will often be
                  accessed, as accessing an element is inexpensive.
                  <br />
                  <br />
                  however, this comes at the cost of a greater
                  insertion/deletion cost than something like a linked list.
                </p>
              </div>
            }
          />
          <Info
            colour="#FFA5B2"
            title="costs"
            description={
              <div>
                <p>
                  access element: O(1)
                  <br />
                  <br />
                  search: O(n)
                  <br />
                  <br />
                  insert data: O(n)
                  <br />
                  <br />
                  delete data: O(n)
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
            <DownshiftArray/>
            <ArrayHolder>
              <div style={{ display: "flex", flexDirection: "column"}}>
                <h1>Value:</h1>
                <ArrayPosHolder>
                  {arrayLink.map(({ arrayValue, arrayID }) => (
                    <React.Fragment>
                      <ArrayElement
                        value={arrayValue}
                        id={arrayID}
                        movement={arrayTransform}
                      />
                    </React.Fragment>
                  ))}
                </ArrayPosHolder>
                <h1>Position:</h1>
                <ArrayPosHolder>
                  {positionLink.map(({ arrayValue, arrayID }) => (
                    <React.Fragment>
                      <ArrayElement
                        value={arrayID}
                        id={arrayID}
                        movement={arrayTransform}
                      />
                    </React.Fragment>
                  ))}
                </ArrayPosHolder>
              </div>
            </ArrayHolder>

            <ControlHolder>
              <InputValue
                placeholder="value"
                onChange={(event) => setArrayValue(event.target.value)}
              />
              <InputValue
                placeholder="position"
                onChange={(event) => setArrayPosition(event.target.value)}
              />
              <AddButton onClick={() => handleUpdateElement()}>
                <p>+</p>
              </AddButton>
            </ControlHolder>
          </StaticPosition>
        </ItemRowContent>
      </BodyWrapper>
    </AlgorithmsWrapper>
  );
}

export default ArrayVis;
