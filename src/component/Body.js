import React, { Component } from "react";
import styled from "styled-components";
import MyRecorder from "./MyRecorder";

const Main = styled.div`
  background: #afbdd4
  position: fixed; 
  top: 0; 
  left: 0; 
	
  /* Preserve aspet ratio */
  min-width: 100%;
  min-height: 100%;
  padding-top: 44px;
`;

const RecContainer = styled.div`
  padding: 40px 0px;
  text-align: center;
`;

const ResultContainer = styled.div`
  padding: 20px 0px;
`;

const ResultBox = styled.div`
  background: #d8dfea;
  width: 80%;
  height: 330px;
  margin 0px auto;
  padding 40px; 0px;
  border-radius: 15px;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #DDD;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
`;

class MainBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recorderStatus: "inactive"
    };
  }

  render() {
    return (
      <Main>
        <RecContainer>
          <MyRecorder />
        </RecContainer>
        <ResultContainer>
          <ResultBox />
        </ResultContainer>
      </Main>
    );
  }
}

export default MainBox;
