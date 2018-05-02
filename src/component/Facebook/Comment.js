import React, { Component } from "react";
import styled from "styled-components";

const CommentBox = styled.div`
  display: flex;
  padding: 10px;
  margin: 10px 0px;
`;

const ProfilePic = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 50%;
`;

const Content = styled.div`
  background: white;
  border-radius: 10px;
  overflow-wrap: break-word;
  padding: 0px 20px;
`;

const Text = styled.p`
  margin: 10px 0px;
`;

class Comment extends Component {
  render() {
    const { pic, name, message } = this.props;

    return (
      <CommentBox>
        <ProfilePic src={pic} />
        <Content>
          <Text>
            <b>{name + " "}</b>
            {" " + message}
          </Text>
        </Content>
      </CommentBox>
    );
  }
}

Comment.defaultProps = {
  pic: "https://i.imgur.com/4KUbROk.png",
  name: "Firstname M. Lastname",
  message: "Hello World"
};

export default Comment;
