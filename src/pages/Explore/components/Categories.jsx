import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider, ListSubheader } from "@material-ui/core";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingBottom: "0",
    paddingTop: "0",
  },
}));

export default function Categories(props) {
  const classes = useStyles();
  const [tab, setTab] = useState(0);

  const { items, onSelect, onAllSelect } = props;

  const onChange = (category) => {
    setTab(category.slug);
    onSelect(category);
  };

  const onAll = () => {
    setTab(0);
    onAllSelect();
  };

  return (
    <div className={classes.root}>
      <List
        subheader={<ListSubheader>Kategoriler</ListSubheader>}
        component="nav"
        aria-label="secondary mailbox folders"
      >
        <ListItem
          onClick={onAll}
          className={tab == 0 ? "checkedListItem" : "nonCheckedListItem"}
          key={0}
          button
        >
          <ListItemText primary="Hepsi" />
        </ListItem>
        <Divider />
        {items.map((item) => {
          return (
            <React.Fragment>
              <ListItem
                className={
                  tab == item.slug ? "checkedListItem" : "nonCheckedListItem"
                }
                onClick={() => onChange(item)}
                style={{ backgroundColor: tab == item.slug ? "#cdcdfe" : "" }}
                key={item.slug}
                button
              >
                <p className="category_text">{item.displayName}</p>
              </ListItem>
              <Divider />
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
}
