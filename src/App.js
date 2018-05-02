import React, { Component } from "react";
import Header from "./component/Header";
import MainBox from "./component/Body";

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
