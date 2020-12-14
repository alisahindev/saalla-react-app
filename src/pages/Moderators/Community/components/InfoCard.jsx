import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Row, Col } from "react-bootstrap";
import { Divider, Icon, Button, TextField } from "@material-ui/core";

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
  const [isEditDesc, setEditDesc] = useState(false);
  const [desc, setDesc] = useState(null);

  const handleDescriptionChange = (e) => {
    setDesc(e.target.value);
  };

  const { description, moderators, onSubmit } = props;
  return (
    <div className={classes.root}>
      <Paper className={classes.tag_card}>
        <Row className="com_desc_container">
          <b className="info_card_title">Hakkinda</b>
        </Row>
        <Row>
          {isEditDesc ? (
            <React.Fragment>
              <TextField
                style={{ width: "100%", margin: "1rem" }}
                id="outlined-multiline-static"
                label="Hakkında"
                multiline
                onChange={handleDescriptionChange}
                name="desc"
                rows={6}
                rowsMax={6}
                defaultValue={description}
                variant="outlined"
              />
              <div style={{ width: "100%", textAlign: "center" }}>
                <HighlightOffIcon
                  onClick={() => setEditDesc(!isEditDesc)}
                  className="close_icon"
                />
                <CheckCircleOutlineIcon
                  onClick={
                    desc
                      ? () => {
                          onSubmit(desc);
                          setEditDesc(false);
                        }
                      : () => {}
                  }
                  className="check_icon"
                />
              </div>
            </React.Fragment>
          ) : (
            <p className="com_desc">{description}</p>
          )}
        </Row>
        {!isEditDesc && (
          <div className="edit_icon">
            <EditIcon
              onClick={() => setEditDesc(!isEditDesc)}
              className="profile_edit_icon"
            />
          </div>
        )}
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
