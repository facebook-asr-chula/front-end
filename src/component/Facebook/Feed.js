import React, { Component } from "react";
import styled from "styled-components";
import Comment from "./Comment";

const FeedBox = styled.div`
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

const Content = styled.div`
  margin-top: 15px;
  overflow-wrap: break-word;
`;

const LikeBox = styled.div`
  text-align: center;
  color: #4671ff;
`;

const CommentBox = styled.div`
  margin-top: 20px;
  background: #f2f3f5;
  max-height: 400px;
  overflow: scroll;
`;

const Text = styled.p`
  margin: 6px 0px;
`;

class Feed extends Component {
  render() {
    const {
      pic,
      name,
      time,
      message,
      count,
      likeOrShare,
      commentList
    } = this.props;

    return (
      <FeedBox>
        <Header>
          <ProfilePic src={pic} />
          <NameBox>
            <Text>
              <b>{name}</b>
            </Text>
            {time && <Text>{time}</Text>}
          </NameBox>
        </Header>
        <Content>
          <Text>{message}</Text>
        </Content>
        {likeOrShare !== "none" && (
          <div>
            <hr />
            <LikeBox>
              <b>{count + " " + likeOrShare}</b>
            </LikeBox>
          </div>
        )}
        {commentList && (
          <CommentBox>
            {commentList.map((object, i) => {
              return (
                <Comment
                  pic={object.pic}
                  name={object.name}
                  message={object.message}
                />
              );
            })}
          </CommentBox>
        )}
      </FeedBox>
    );
  }
}

Feed.defaultProps = {
  pic: "https://i.imgur.com/4KUbROk.png",
  name: "Firstname M. Lastname",
  message: "Hello World",
  likeOrShare: "none",
  commentList: undefined
};

export default Feed;
