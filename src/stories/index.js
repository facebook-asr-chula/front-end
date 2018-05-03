import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import { Button, Welcome } from "@storybook/react/demo";

import Feed from "../component/Facebook/Feed";
import FriendBox from "../component/Facebook/FriendBox";
import FriendOfFriend from "../component/Facebook/FriendOfFriend";
import FeedList from "../component/Facebook/FeedList";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .add("with text", () => (
    <Button onClick={action("clicked")}>Hello Button</Button>
  ))
  .add("with some emoji", () => (
    <Button onClick={action("clicked")}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf("Facebook Component", module)
  .add("type 1", () => <Feed time={"{yyyy-mm-dd}T{HH:MM:SS}+0000"} />)
  .add("type 2", () => <Feed likeOrShare={"like"} count={200} />)
  .add("type 3", () => (
    <Feed comment={true} commentList={[{}, {}, {}, {}, {}, {}]} />
  ))
  .add("type 4", () => <FriendBox />)
  .add("type 5 (page like)", () => <FriendBox count={200} />)
  .add("type 5 (user os)", () => <FriendBox count={"Android"} />)
  .add("type 6", () => <FriendOfFriend friendList={[{}, {}, {}, {}, {}]} />)
  .add("type 7", () => (
    <FeedList
      feedList={[{ time: "{yyyy-mm-dd}T{HH:MM:SS}+0000" }, {}, {}, {}, {}]}
    />
  ));
