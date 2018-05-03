import React, { Component } from 'react';
import styled from 'styled-components';
import Feed from './Facebook/Feed';
import FriendBox from './Facebook/FriendBox';
import FriendOfFriend from './Facebook/FriendOfFriend';
import FeedList from './Facebook/FeedList';

const Container = styled.div`
  background: #d8dfea;
  width: 80%;
  height: 370px;
  overflow: scroll;
  margin 0px auto;
  padding 40px 0px;
  border-radius: 15px;
  border: 1px solid transparent;
  border-top: none;
  border-bottom: 1px solid #DDD;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.39), 0 -1px 1px #FFF, 0 1px 0 #FFF;
`;

const Error = styled.div`
  line-height: 330px;
  text-align: center;
  font-size: 36px;
  color: red;
`;

class ResultBox extends Component {
  render() {
    const { data, type } = this.props;

    return (
      <Container>
        {type === 1 && (
          <div>
            {data.data.map((object, i) => {
              return <Feed pic={data.pic} name={data.name} message={object.message} time={object.time} likeOrShare={'none'} key={i} />;
            })}
          </div>
        )}
        {type === 2 && (
          <div>
            {data.data.map((object, i) => {
              return <Feed pic={data.pic} name={data.name} message={object.message} likeOrShare={'like'} count={object.count} key={i} />;
            })}
          </div>
        )}
        {type === 3 && (
          <div>
            {data.data.map((object, i) => {
              return <Feed pic={data.pic} name={data.name} message={object.message} commentList={object.data} key={i} />;
            })}
          </div>
        )}
        {type === 4 && (
          <div>
            {data.data.map((object, i) => {
              return <FriendBox pic={object.pic} name={object.name} key={i} />;
            })}
          </div>
        )}
        {type === 5 && (
          <div>
            {data.data.map((object, i) => {
              return <FriendBox pic={object.pic} name={object.name} count={object.count} key={i} />;
            })}
          </div>
        )}
        {type === 6 && (
          <div>
            {data.data.map((object, i) => {
              return <FriendOfFriend pic={object.pic} name={object.name} friendList={object.data} key={i} />;
            })}
          </div>
        )}
        {type === 7 && (
          <div>
            {data.data.map((object, i) => {
              return <FeedList pic={object.pic} name={object.name} feedList={object.data} key={i} />;
            })}
          </div>
        )}
        {type === 99 && <Error>Please try again.</Error>}
      </Container>
    );
  }
}

export default ResultBox;
