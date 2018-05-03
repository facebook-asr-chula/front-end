import React, { Component } from "react";
import styled from "styled-components";
import MyRecorder from "./MyRecorder";
import ResultBox from "./ResultBox";

const responsiveVoice = window.responsiveVoice;

const Main = styled.div`
  background: #afbdd4
  position: fixed; 
  top: 0; 
  left: 0; 
	 
  min-width: 100%;
  min-height: 100%;
  padding-top: 44px;
`;

const RecContainer = styled.div`
  padding: 40px 0px;
  text-align: center;
  display: flex;
  width: 800px;
  margin: 0px auto;
`;

const ResultContainer = styled.div`
  padding: 20px 0px;
`;

const TranslationBox = styled.div`
  width: 600px;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: left;
  padding: 0px 20px;
  border: 1px solid #cdcdcd;
  border-color: rgba(0, 0, 0, 0.15);
  background-color: white;
  margin: 65px 0px;
  margin-left: 100px;
`;

class MainBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: 0,
      transcript: "my translation..."
    };

    this.onTranscript = this.onTranscript.bind(this);
    this.onResult = this.onResult.bind(this);
  }

  onTranscript(t) {
    console.log("call onTransript" + t);
    this.setState({
      transcript: t
    });
  }

  onResult(r) {
    console.log("call onResult" + r);
    this.setState({
      result: r,
      type: r.type
    });

    if (responsiveVoice.voiceSupport()) {
      responsiveVoice.speak(r.script, "Thai Female");
    }
  }

  render() {
    return (
      <Main>
        <RecContainer>
          <MyRecorder
            onResult={this.onResult}
            onTranscript={this.onTranscript}
          />
          <TranslationBox>{this.state.transcript}</TranslationBox>
        </RecContainer>
        <ResultContainer>
          <ResultBox type={this.state.type} data={this.state.result} />
        </ResultContainer>
      </Main>
    );
  }
}

export default MainBox;
