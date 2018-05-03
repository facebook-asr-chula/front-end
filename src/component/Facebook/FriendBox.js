import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid lightgrey;
  width: 450px;
  height: 100px;
  display: Flex;
  margin: 10px auto;
  background: white;
`;

const ProfilePic = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 20px;
`;

const Name = styled.div`
  height: 100px;
  line-height: 100px;
`;

const NameWithLike = styled.div`
  padding-top: 20px;
  height: 100px;
`;

class FriendBox extends Component {
  isNumeric(num) {
    return !isNaN(num);
  }

  render() {
    const { pic, name, count } = this.props;

    return (
      <Container>
        <ProfilePic src={pic} />
        {!count && (
          <Name>
            <b>{name}</b>
          </Name>
        )}
        {count && (
          <NameWithLike>
            <b>{name}</b>
            <p>{count + `${this.isNumeric(count) ? " Like" : ""}`}</p>
          </NameWithLike>
        )}
      </Container>
    );
  }
}

FriendBox.defaultProps = {
  pic: "https://i.imgur.com/4KUbROk.png",
  name: "Firstname M. Lastname"
};

export default FriendBox;
