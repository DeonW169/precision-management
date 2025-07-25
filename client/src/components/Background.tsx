import React from "react";
import styled from "styled-components";
import LeftImage from "../images/trello-left.svg";
import RightImage from "../images/trello-right.svg";

const Container = styled.div`
  background-color: #f9fafc;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: -900;
`;

const LeftSide = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -999;
  width: 30vw;
  max-width: 400px;
`;

const RightSide = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: -999;
  width: 30vw;
  max-width: 400px;
`;

const Svg = styled.img`
  vertical-align: middle;
  width: 100%;
  height: 100%;
`;

const Background: React.FC = () => {
  return (
    <Container>
      <LeftSide>
        <Svg src={LeftImage} alt="Left Background" />
      </LeftSide>
      <RightSide>
        <Svg src={RightImage} alt="Right Background" />
      </RightSide>
    </Container>
  );
};

export default Background;
