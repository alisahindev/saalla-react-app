import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import PopularTags from "../../components/PopularTags";
import TabPanelList from "./components/tabPanel";
import ComboBox from "../../components/AutoComplete";
import { connect } from "react-redux";
import { getUserCommunitiesRequest } from "../../redux/community/actions";
import { useState } from "react";
import { createPostRequest } from "../../redux/posts/actions";
import { withRouter } from "react-router-dom";
import { getParameterByName } from "../../helpers";

function CreatePost(props) {
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    const {
      getUserCommunities,
      location: { search },
    } = props;
    if (search) {
      setCommunity(
        communities.find((x) => x.slug === getParameterByName("is", search))
      );
    }
    getUserCommunities({});
  }, []);

  const handleChange = (option) => {
    setCommunity(option);
  };

  const handleSubmit = (values) => {
    const { createPost } = props;
    values.communitySlug = community.slug;
    createPost(values);
  };

  const {
    communities,
    location: { search },
  } = props;
  return (
    <div>
      <Container style={{ marginTop: "6rem" }}>
        <Row style={{ marginTop: "1rem" }}>
          <Col
            style={{ paddingBottom: "10px", paddingTop: "20px" }}
            xs={12}
            md={8}
          >
            <ComboBox
              defaultValue={
                communities && communities.length > 0
                  ? communities.find(
                      (x) => x.slug === getParameterByName("is", search)
                    )
                  : null
              }
              onChange={handleChange}
              options={communities}
              labelField="name"
              placeholder="Topluluk seç"
            />
            <TabPanelList community={community} onSubmit={handleSubmit} />
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
  getUserCommunities: (payload) => dispatch(getUserCommunitiesRequest(payload)),
  createPost: (payload) => dispatch(createPostRequest(payload)),
});

const mapStateToProps = (state) => ({
  communities: state.userCommunities.data,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CreatePost));
