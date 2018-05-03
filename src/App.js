import React, { Component } from "react";
import Header from "./component/Header";
import MainBox from "./component/MainBox";

class App extends Component {
  render() {
    return (
      <div>
        <MainBox />
        <Header />
      </div>
    );
  }
}

export default App;
