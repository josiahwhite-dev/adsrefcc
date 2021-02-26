import styled from "styled-components";

export const TopWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 0.1;
  background-color: peachpuff;
  align-items: center;
  justify-content: flex-start;

  svg {
    padding-left: 5%;
  }
`;

export const Title = styled.h1`
  font-size: 6vh;
  color: black;
  padding-left: 1%;
`;

export const media = {
  mobile: "@media(max-width: 1024px)",
};
