import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Avatar from "@material-ui/core/Avatar";
import { Divider, ListSubheader } from "@material-ui/core";
import "moment/locale/tr";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useHistory } from "react-router-dom";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingBottom: "0",
    paddingTop: "0",
    border: "1px double #00000057 !important;",
  },
}));

export default function NotificationList(props) {
  moment.locale();

  const classes = useStyles();
  const history = useHistory();
  const { items } = props;
  return (
    <List
      subheader={
        <React.Fragment>
          <ListSubheader>Bildirimlerin</ListSubheader>
          <Divider />
        </React.Fragment>
      }
      className={classes.root}
    >
      {items &&
        items.length > 0 &&
        items.map((item) => {
          return (
            <React.Fragment>
              <ListItem
                style={{ backgroundColor: !item.isRead && "#cacacaa6" }}
                onClick={() =>
                  history.push(`/${item.targetName}?status=${item.targetId}`)
                }
                button
              >
                <ListItemIcon>
                  <NotificationsNoneIcon
                    fontSize="large"
                    style={{ color: "#40eb3d" }}
                  />
                </ListItemIcon>
                <ListItemAvatar>
                  <Avatar src={item.imgPath} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    item.content.length > 70
                      ? item.content.slice(0, 70) + "..."
                      : item.content
                  }
                  secondary={
                    item.targetName.split("/")[0] +
                    ": " +
                    moment(item.createdDate).fromNow()
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
    </List>
  );
}
