import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PopularTags from "../../components/PopularTags";
import { compose } from "lodash/fp";
import {
  getPostDetailRequest,
  votePostRequest,
} from "../../redux/posts/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import { htmlToText } from "../../helpers";

const PostDetailCard = React.lazy(() =>
  import("../../components/PostDetailCard")
);

function PostDetail(props) {
  useEffect(() => {
    const {
      getPostDetail,
      match: { params },
      location: { search },
    } = props;
    const id = params.id;
    getPostDetail({ search, loaderStart: true });
  }, []);

  const onVote = (values) => {
    const { votePost } = props;
    values.page = "post_detail";
    votePost(values);
  };

  const { post } = props;
  return (
    <div>
      {post && post.community && (
        <Helmet>
          <title>
            {post.community.name +
              " salladı: " +
              htmlToText(post.content) +
              " | Saalla"}
          </title>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content={
              post.community.name +
              " salladı: " +
              htmlToText(post.content).slice(0, 100)
            }
          />
          <link
            href={`https://saalla.com/${post.community.slug}/${post.slug}?status=${post.id}`}
          />
        </Helmet>
      )}
      <Container style={{ marginTop: "6rem" }}>
        <Row style={{ marginTop: "1rem" }}>
          <Col
            style={{ paddingBottom: "10px", paddingTop: "20px" }}
            xs={12}
            md={8}
          >
            {post && (
              <PostDetailCard
                id={post.id}
                img={post.contentPath}
                createdDate={post.createdDateTime}
                content={post.content}
                contentType={post.contentType}
                community={post.community}
                comments={post.comments}
                user={post.userInfo}
                linkUrl={post.linkUrl}
                onVote={onVote}
                voteCount={post.voteCount}
                userPostVote={post.userPostVote}
              />
            )}
          </Col>
          <Col style={{ paddingBottom: "10px" }} xs={12} md={4}>
            <div
              style={{ position: "-webkit-sticky", position: "sticky", top: 0 }}
            >
              <PopularTags />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getPostDetail: (payload) => dispatch(getPostDetailRequest(payload)),
  votePost: (payload) => dispatch(votePostRequest(payload)),
});

const mapStateToProps = (state) => ({
  post: state.postDetail.data,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(PostDetail);
