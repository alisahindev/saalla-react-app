import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Divider, Button } from "@material-ui/core";
import { getPopularCommnityListRequest } from "../../redux/community/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingTop: "20px",
  },
  tag_card: {
    width: "100%",
    padding: "1rem",
    flexWrap: "wrap",
  },
  tagText: {
    textDecorationLine: "underline",
    marginLeft: "1rem",
  },
  avatarImg: {
    backgroundPosition: "50%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    borderRadius: "24px",
    boxSizing: "border-box",
    flex: "none",
    height: "32px",
    width: "32px",
    objectFit: "contain",
    margin: "0 8px",
  },
  community_title: {
    fontFamily: "inherit",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "18px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "black",
  },
  com_cont: {
    padding: "1rem 1rem 0 0",
    display: "flex",
  },
  member_count: {
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "16px",
    paddingBottom: "4px",
  },
  button: {
    textTransform: "none",
    boxShadow: "none",
    padding: "0",
  },
  join_button: {
    width: "100%",
    textAlign: "right",
  },
}));

const renderBars = (classes, slug, name, memberCount, logoPath) => {
  return (
    <div key={slug}>
      <div className={classes.com_cont}>
        <Col style={{ display: "flex", paddingLeft: "0px" }}>
          <ArrowDropUpIcon fontSize="large" style={{ color: "#40eb3d" }} />
          <img className={classes.avatarImg} src={logoPath} alt="" />
          <div style={{ display: "grid" }}>
            <code className={classes.community_title}>
              <Link to={`/t/${slug}`} style={{ color: "black" }}>
                {name}
              </Link>
            </code>
            <span className={classes.member_count}>{memberCount} üye</span>
          </div>
        </Col>
      </div>
      <Divider />
    </div>
  );
};

function PopularTags(props) {
  useEffect(() => {
    const { getPopularsCom } = props;
    getPopularsCom({});
  }, []);
  const classes = useStyles();
  const history = useHistory();
  const { communities } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.tag_card}>
        <Row>
          <b style={{ marginLeft: "1rem" }}>Popüler Topluluklar</b>
        </Row>
        {communities &&
          communities.length > 0 &&
          communities.map((x) =>
            renderBars(classes, x.slug, x.name, x.memberCount, x.logoPath)
          )}
        <Row style={{ marginTop: "16px", justifyContent: "center" }}>
          <Link to="/kesfet">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Keşfet
            </Button>
          </Link>
        </Row>
      </Paper>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  getPopularsCom: () => dispatch(getPopularCommnityListRequest({})),
});

const mapStateToProps = (state) => ({
  communities: state.communities.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularTags);
