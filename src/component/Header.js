import React, { Component } from "react";
import styled from "styled-components";

const Header = styled.div`
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: #3b5998;
  text-align: center;
  margin: 0px;
  padding: 0px;
  position: fixed;
  top: 0;
  left: 0;
`;

const Text = styled.p`
  color: #ffffff;
  font-size: 25px;
  padding: 0px;
  margin: 0px;
`;

class HeaderTab extends Component {
  render() {
    return (
      <Header>
        <Text>FACEBOOK - ASR</Text>
      </Header>
    );
  }
}

export default HeaderTab;
