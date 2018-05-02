import React, { Component } from "react";
import styled from "styled-components";
import FriendBox from "./FriendBox";

const Container = styled.div`
  width: 550px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid lightgrey;
  padding: 10px;
  margin: 10px auto;
`;

const NameBox = styled.div`
  display: block;
  padding: 0px;
`;

const Header = styled.div`
  display: flex;
`;

const ProfilePic = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

const PicBox = styled.div`
  margin-top: 20px;
  max-height: 400px;
  overflow: scroll;
`;

const Text = styled.p`
  margin: 6px 0px;
`;

class FriendOfFriend extends Component {
  render() {
    const { pic, name, friendList } = this.props;

    return (
      <Container>
        <Header>
          <ProfilePic src={pic} />
          <NameBox>
            <Text>
              <b>{name}</b>
            </Text>
          </NameBox>
        </Header>
        <hr />
        {friendList && (
          <PicBox>
            {friendList.map((object, i) => {
              return <FriendBox pic={object.pic} name={object.name} />;
            })}
          </PicBox>
        )}
      </Container>
    );
  }
}

FriendOfFriend.defaultProps = {
  pic: "https://i.imgur.com/4KUbROk.png",
  name: "Firstname M. Lastname"
};

export default FriendOfFriend;
