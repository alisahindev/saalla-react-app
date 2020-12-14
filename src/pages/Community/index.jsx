import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from "react-redux";
import { compose } from "lodash/fp";
import { Paper } from "@material-ui/core";
import InfoCard from "./components/InfoCard";
import {
  getCommunityRequest,
  getCommunityPostsRequest,
} from "../../redux/community/actions";
import { joinCommunityRequest } from "../../redux/users/actions";
import ActionButton from "./components/ActionButton";
import { votePostRequest } from "../../redux/posts/actions";
import { withRouter } from "react-router-dom";
import Loader from "../../components/Loader";
import { clearStoreRequest } from "../../redux/commonActions";
import CreatePostTab from "../../components/CreatePostTab";
import { Helmet } from "react-helmet";

const SocialCard = React.lazy(() => import("../../components/SocialCard"));

function CommunityPage(props) {
  const [pageNumber, setNumber] = useState(1);
  useEffect(() => {
    const {
      getCommunity,
      getPosts,
      match: {
        params: { slug },
      },
    } = props;
    getCommunity({ slug, loaderStart: true });
    getPosts({ pageNumber: 1, pageSize: 6, slug, loaderStart: true });
    return () => {
      props.clearStore("community_posts");
    };
  }, [props.location.pathname]);

  const element = () => {
    const { community, auth } = props;
    if (!auth.token) return <ActionButton isLogged={false} />;
    let isJoined = false;
    community &&
      community.members &&
      community.members.length > 0 &&
      community.members.map((member) => {
        if (member.username == auth.user.username) {
          isJoined = true;
        }
      });
    return (
      <ActionButton isLogged={true} isJoined={isJoined} slug={community.slug} />
    );
  };

  const onVote = (values) => {
    const { votePost, community } = props;
    values.page = "community";
    values.cSlug = community.slug;
    values.communityId = community.id;
    values.pageSize = 6;
    values.loaderStart = false;
    votePost(values);
  };

  const fetchMoreData = () => {
    const newNumber = pageNumber + 1;
    const { getPosts } = props;
    getPosts({
      pageNumber: newNumber,
      pageSize: 6,
      slug: community.slug,
      loaderStart: false,
    });
    setNumber(newNumber);
  };

  const { community, posts, auth } = props;
  return (
    community && (
      <div>
        <Helmet>
          <title>{community.name + " topluluğu | Saalla "}</title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={
              community.description !== "" &&
              community.description !== null &&
              community.description.slice(0, 100)
            }
          />
          <link href={`https://saalla.com/t/${community.slug}`} />
        </Helmet>
        <Row style={{ marginTop: "4rem", height: "240px" }}>
          <img
            className="com_cover_image"
            src={community.coverImagePath}
            alt=""
          />
        </Row>
        <Row>
          <Paper className="com_bar">
            <Col className="com_bar_info" md={8}>
              <img className="profile_img" src={community.logoPath} alt="" />
              <div className="com_name">
                <div className="com_bar_title">
                  <h3 className="com_title">{community.name}</h3>
                  <small className="com_member_count">
                    t/{community.slug + " |"}
                  </small>
                  <small className="com_member_count">
                    {community && community.members && community.members.length}
                    Üye
                  </small>
                </div>
                <div className="join_button_container">{element()}</div>
              </div>
            </Col>
          </Paper>
        </Row>
        <Container style={{ marginTop: "1rem" }}>
          <Row>
            <Col xs={12} md={12}>
              <CreatePostTab slug={community.slug} user={auth.user} />
            </Col>
          </Row>
          <Row style={{ marginTop: "1rem" }}>
            <Col
              style={{ paddingBottom: "10px", paddingTop: "20px" }}
              xs={12}
              md={8}
            >
              <InfiniteScroll
                dataLength={posts && posts.results && posts.results.length}
                next={fetchMoreData}
                hasMore={posts && posts.hasNext}
                loader={<Loader overlay={false} />}
              >
                {posts &&
                  posts.results &&
                  posts.results.length > 0 &&
                  posts.results.map((item) => (
                    <SocialCard
                      pageNumber={item.pageNumber}
                      key={item.id}
                      id={item.id}
                      pSlug={item.slug}
                      img={item.mediaContentPath}
                      createdDate={item.createdDateTime}
                      content={item.content}
                      contentType={item.contentType}
                      community={{
                        name: community.name,
                        slug: community.slug,
                        logoPath: community.logoPath,
                      }}
                      comments={item.comments}
                      user={item.user}
                      linkUrl={item.linkUrl}
                      voteCount={item.voteCount}
                      userPostVote={item.userPostVote}
                      onVote={onVote}
                    />
                  ))}
              </InfiniteScroll>
            </Col>
            <Col style={{ paddingBottom: "10px" }} xs={12} md={4}>
              <div className="com_right_bar">
                <InfoCard
                  moderators={community.moderators}
                  description={community.description}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
}

const mapDispatchToProps = (dispatch) => ({
  getCommunity: (payload) => dispatch(getCommunityRequest(payload)),
  joinCommunity: (payload) => dispatch(joinCommunityRequest(payload)),
  votePost: (payload) => dispatch(votePostRequest(payload)),
  getPosts: (payload) => dispatch(getCommunityPostsRequest(payload)),
  clearStore: (name) => dispatch(clearStoreRequest(name)),
});

const mapStateToProps = (state) => ({
  community: state.community.data,
  posts: state.community.pagedData,
  auth: state.auth.data,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(CommunityPage);
