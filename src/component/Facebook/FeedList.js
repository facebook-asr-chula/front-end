import React, { Component } from "react";
import styled from "styled-components";
import Feed from "./Feed";

const Container = styled.div`
  width: 600px;
  max-height: 500px;
  background: #ffffff;
  border-radius: 5px;
  border: 1px solid lightgrey;
  padding: 10px;
  margin: 10px auto;
  overflow: scroll;
`;

class FriendOfFriend extends Component {
  render() {
    const { pic, name, feedList } = this.props;

    return (
      <Container>
        {feedList && (
          <div>
            {feedList.map((object, i) => {
              return (
                <Feed
                  pic={pic}
                  name={name}
                  message={object.message}
                  time={object.time}
                  likeOrShare={"none"}
                  key={i}
                />
              );
            })}
          </div>
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
