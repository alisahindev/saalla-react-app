import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Avatar from "@material-ui/core/Avatar";
import { Divider, ListSubheader } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingBottom: "0",
    paddingTop: "0",
    border: "1px double #00000057 !important;",
  },
}));

export default function CommunityList(props) {
  const classes = useStyles();
  const history = useHistory();
  const { items, category } = props;

  return (
    <List
      subheader={
        <React.Fragment>
          <ListSubheader>
            {category && category.displayName + " için"} Trend Topluluklar
          </ListSubheader>
          <Divider />
        </React.Fragment>
      }
      className={classes.root}
    >
      {items &&
        items.map((item) => {
          return (
            <React.Fragment>
              <ListItem onClick={() => history.push(`/t/${item.slug}`)} button>
                <ListItemIcon>
                  <ArrowDropUpIcon
                    fontSize="large"
                    style={{ color: "#40eb3d" }}
                  />
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar src={item.logoPath} />
                </ListItemAvatar>
                <ListItemText
                  primary={"s/" + item.name}
                  secondary={item.memberCount + " üye"}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
    </List>
  );
}
