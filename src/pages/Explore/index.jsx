import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { connect } from "react-redux";
import CommunityList from "./components/List";
import {
  getCategoriesRequest,
  getComsByCategoryRequest,
} from "../../redux/category/actions";
import Categories from "./components/Categories";
import { useState } from "react";
import { getAllCommunitiesRequest } from "../../redux/community/actions";
import { Helmet } from "react-helmet";

function Explore(props) {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const { getCategories, getAllCom } = props;
    getCategories();
    getAllCom();
  }, []);

  const onSelectCategory = (category) => {
    setCategory(category);
    const { getCommunities } = props;
    getCommunities({ name: category.slug });
  };

  const onSelectAll = () => {
    props.getAllCom();
    setCategory(null);
  };

  const { categories, communities } = props;
  return (
    <div>
      <Helmet>
        <title>Keşfet | Saalla </title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Saalla, insanların ilgi alanlarına göre sallayabildikleri topluluk ağıdır. İlgilendiğiniz toplulukları bulun ve çevrimiçi bir topluluğun parçası olun!"
        />
      </Helmet>
      <Container style={{ marginTop: "6rem" }}>
        <Row style={{ marginTop: "1rem", flexWrap: "wrap-reverse" }}>
          <Col style={{ paddingBottom: "10px" }} xs={12} md={8}>
            <CommunityList category={category} items={communities || []} />
          </Col>
          <Col style={{ paddingBottom: "10px" }} xs={12} md={4}>
            <div
              style={{ position: "-webkit-sticky", position: "sticky", top: 0 }}
            >
              <Categories
                onSelect={onSelectCategory}
                items={categories || []}
                onAllSelect={onSelectAll}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getCategories: () => dispatch(getCategoriesRequest()),
  getCommunities: (payload) => dispatch(getComsByCategoryRequest(payload)),
  getAllCom: (payload) => dispatch(getAllCommunitiesRequest(payload)),
});

const mapStateToProps = (state) => ({
  categories: state.categories.data,
  communities: state.comsByCategory.data,
  allCom: state.communities.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
