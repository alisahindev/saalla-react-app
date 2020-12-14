import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import { Divider, Icon, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingTop: "20px",
  },
  tag_card: {
    width: "100%",
    padding: "0 1rem",
    flexWrap: "wrap",
  },
}));

export default function InfoCard(props) {
  const classes = useStyles();
  const { description, moderators } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.tag_card}>
        <Row className="com_desc_container">
          <b className="info_card_title">Hakkinda</b>
        </Row>
        <Row>
          <p className="com_desc">{description}</p>
        </Row>
        <Row className="com_desc_container" style={{ display: "grid" }}>
          <b className="info_card_title">Moderatorler</b>
        </Row>
        <Row style={{ padding: "1rem", display: "grid" }}>
          {moderators &&
            moderators.map((m) => {
              return (
                <React.Fragment>
                  <code className={classes.community_title}>
                    <Link to={`/${m.username}`} style={{ color: "blue" }}>
                      {`u/${m.username}`}
                    </Link>
                  </code>
                  <Divider style={{ margin: "4px 0 4px 0" }} />
                </React.Fragment>
              );
            })}
        </Row>
      </Paper>
    </div>
  );
}
