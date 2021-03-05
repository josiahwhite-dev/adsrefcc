import styled from "styled-components";

export const media = {
  mobile: "@media(max-width: 1024px)",
};

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 0.1;
  background-color: white; /*previously peachpuff*/
  align-items: center;
  justify-content: flex-start;

  svg {
    padding-left: 5%;
  }
`;

export const Title = styled.h1`
  font-size: calc(5vh + 1vw);
  color: black;
  padding-left: 5%;
  ${media.mobile} {
  }
`;

export const Item = styled.div`
  min-width: 300px;

  width: 30vw;
  height: auto;
  margin: 1vw;
  border-radius: 4vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: auto;
  margin-bottom: 1vh;
  text-decoration: none;
  text-align: center;

  h1 {
    font-size: calc(6vh + 1vw);
    font-weight: bolder;
    color: white;
    margin-left: 2vw;
    margin-right: 2vw;
  }
  p {
    font-size: calc(1vh+1vw);
    font-weight: bolder;
    color: white;

    margin-left: 1vw;
    margin-right: 1vw;
    margin-bottom: 5vh;

    text-align: left;
    line-height: 1.5;
    text-justify: inter-word;
    ${media.mobile} {
    }
  }

  ${media.mobile} {
    width: 90vw;
    border-radius: 8vh;
  }
`;
