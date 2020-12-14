import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Comment from "./components/comment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CommentList(props) {
  const classes = useStyles();
  const { comments, postId } = props;
  return (
    <List className={classes.root}>
      {comments &&
        comments.map((item) => {
          return <Comment key={item.id} item={item} postId={postId} />;
        })}
    </List>
  );
}
