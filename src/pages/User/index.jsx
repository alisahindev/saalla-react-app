import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { compose } from "lodash/fp";
import SocialCard from "../../components/SocialCard";
import { getUserProfile, getUserByUsername } from "../../redux/users/actions";
import { connect } from "react-redux";
import UserCard from "./components/userCard";
import {
  getUserPostsRequest,
  votePostRequest,
} from "../../redux/posts/actions";
import { withRouter, useHistory } from "react-router-dom";
import {
  getConversationsRequest,
  sendMessageRequest,
} from "../../redux/conversation/actions";
import SendMessageModal from "./components/sendMessageModal";
import { isLogged } from "../../helpers";
import { Helmet } from "react-helmet";

function User(props) {
  const { user, posts, conversations } = props;
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(null);
  const [newMessageUser, setUser] = useState({});

  useEffect(() => {
    const {
      getUserByUsername,
      getUserPosts,
      getConversations,
      match: {
        params: { username },
      },
    } = props;
    getUserByUsername(username);
    getUserPosts({ username });
    getConversations();
  }, [props.location.pathname]);

  const onSendMessage = () => {
    if (!isLogged()) {
      history.push("/giris-yap");
      return;
    }
    let isExist = false;
    conversations.map((item) => {
      if (item.receiver.id == user.id || item.sender.id == user.id) {
        history.push({
          pathname: "/chat",
          state: {
            userId: user.id,
            conversationId: item.id,
            username: user.username,
          },
        });
        isExist = true;
      }
    });
    if (!isExist) {
      setOpen(true);
      setUser({ userId: user.id, username: user.username });
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    const payload = { receiverId: newMessageUser.userId, content: text };
    props.sendMessage(payload);
    setOpen(false);
  };

  const onVote = (values) => {
    const { votePost } = props;
    const payload = {
      ...values,
      loaderStart: false,
      page: "user",
      username: user.username,
    };
    votePost(payload);
  };

  return (
    <div>
      {user && (
        <Helmet>
          <title>{user.username + " | Saalla"}</title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={
              user.bio !== "" && user.bio !== null && user.bio.slice(0, 100)
            }
          />
          <link href={`https://saalla.com/${user.username}`} />
        </Helmet>
      )}
      <Container style={{ marginTop: "8rem" }}>
        <Row style={{ flexWrap: "wrap-reverse" }}>
          <Col
            style={{ paddingBottom: "10px", paddingTop: "20px" }}
            xs={12}
            md={8}
          >
            {posts &&
              posts.length > 0 &&
              posts.map((item) => (
                <SocialCard
                  id={item.id}
                  img={item.mediaContentPath}
                  pSlug={item.slug}
                  createdDate={item.createdDateTime}
                  content={item.content}
                  contentType={item.contentType}
                  community={item.community}
                  onVote={onVote}
                  linkUrl={item.linkUrl}
                  voteCount={item.voteCount}
                  userPostVote={item.userPostVote}
                  comments={item.comments}
                  user={
                    user && {
                      userName: user.username,
                      profileImagePath: user.profileImagePath,
                    }
                  }
                />
              ))}
          </Col>
          <Col
            style={{ paddingBottom: "10px", paddingTop: "5rem" }}
            xs={12}
            md={4}
          >
            {user && (
              <UserCard
                img={user.profileImagePath}
                username={user.username}
                email={user.emailAddress}
                id={user.id}
                onMessage={onSendMessage}
                bio={user.bio}
              />
            )}
          </Col>
        </Row>
        <SendMessageModal
          onChange={handleChange}
          onSubmit={handleSubmit}
          data={newMessageUser}
          text={text}
          open={open}
          onClose={() => setOpen(false)}
        />
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getUserByUsername: (username) => dispatch(getUserByUsername(username)),
  getUserPosts: (payload) => dispatch(getUserPostsRequest(payload)),
  getConversations: () => dispatch(getConversationsRequest({})),
  sendMessage: (payload) => dispatch(sendMessageRequest(payload)),
  votePost: (payload) => dispatch(votePostRequest(payload)),
});

const mapStateToProps = (state) => ({
  user: state.user.data,
  conversations: state.conversations.data,
  posts: state.posts.data,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(User);
