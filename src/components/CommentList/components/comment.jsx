import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import SendIcon from "@material-ui/icons/Send";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { Link, useHistory } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import Reply from "./reply";
import {
  createReplyRequest,
  likeCommentRequest,
  unlikeCommentRequest,
  deleteCommentRequest,
  deleteCommentModeratorRequest,
} from "../../../redux/comment/actions";
import { connect } from "react-redux";
import { readLocalStorage, isLogged } from "../../../helpers";
import DeleteCommentPop from "./deleteCommentPop";
import Loader from "../../Loader";

const useStyles = makeStyles((theme) => ({
  likeIcon: {
    marginLeft: "0.5rem",
    borderRadius: "2px",
    display: "inline-block",
    padding: "4px",
    cursor: "pointer",
  },
  commentIcon: {
    borderRadius: "2px",
    display: "inline-block",
    padding: "4px",
  },
  deleteIcon: {
    borderRadius: "2px",
    display: "inline-block",
    padding: "4px",
    cursor: "pointer",
    marginLeft: "0.5rem",
  },
}));

function Comment(props) {
  const classes = useStyles();
  const [isOpen, setOpen] = useState(false);
  const [isModerator, setModerator] = useState(false);
  const [text, setText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const { item } = props;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    const token = readLocalStorage("token");
    const user = readLocalStorage("user");
    if (!token || !user) {
      history.push("/giris-yap");
      return;
    } else {
      const { createReply, postId, item } = props;
      const values = { postId, commentId: item.id, content: text };
      createReply(values);
      document.getElementById("comment").value = "";
      setOpen(false);
    }
  };

  const onLikeComment = () => {
    if (!isLogged()) {
      history.push("/giris-yap");
    }
    const values = { postId: props.postId, commentId: item.id };
    const { likeComment } = props;
    likeComment(values);
  };

  const onUnlike = () => {
    if (!isLogged()) {
      history.push("/giris-yap");
    }
    const values = { postId: props.postId, commentId: item.id };
    const { unLikeComment } = props;
    unLikeComment(values);
  };

  const onDeleteComment = () => {
    const values = { commentId: item.id, postId: props.postId };
    const { deleteComment } = props;
    deleteComment(values);
    handleClose();
  };

  const onDeleteCommentModerator = () => {
    const values = { commentId: item.id, postId: props.postId };
    const { deleteCommentModerator } = props;
    deleteCommentModerator(values);
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderDeleteIcon = () => {
    const { auth, post } = props;
    let isOk = false;
    if (
      auth &&
      auth.user &&
      auth.user.comMods &&
      auth.user.comMods.length > 0
    ) {
      auth.user.comMods.map((x) => {
        if (x === post.community.slug) {
          isOk = true;
        }
      });
    }
    //setModerator(isOk);
    return isOk;
  };

  const handleDeleteOperation = () => {
    const { auth } = props;
    if (
      renderDeleteIcon() &&
      auth &&
      auth.user &&
      auth.user.username !== item.commentUserInfo.userName
    ) {
      onDeleteCommentModerator();
    } else {
      onDeleteComment();
    }
  };

  return (
    <React.Fragment key={item.id}>
      <ListItem className="comment_item" alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={item.commentUserInfo.profileImagePath}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Link
              to={`/${item.commentUserInfo && item.commentUserInfo.userName}`}
              style={{ color: "black" }}
            >
              {item.commentUserInfo && item.commentUserInfo.userName}
            </Link>
          }
          secondary={item.content}
        />
      </ListItem>
      <div className="comment_icon_container">
        <CommentOutlinedIcon className={classes.commentIcon} />
        <Link to="#" onClick={() => setOpen(!isOpen)}>
          <p className="reply_text">{isOpen ? "boşver" : "salla"}</p>
        </Link>
        <FavoriteBorderOutlinedIcon
          className={
            item.isLoggedLiked
              ? "checked_comment_like_icon"
              : "comment_like_icon"
          }
          onClick={item.isLoggedLiked ? onUnlike : onLikeComment}
        />
        <p className="reply_text">{item.likeCount}</p>
        {(item.isLoggedComment || renderDeleteIcon()) && (
          <div>
            <DeleteOutlineIcon
              onClick={handleClick}
              className="comment_delete_icon"
            />
            <DeleteCommentPop
              onSubmit={handleDeleteOperation}
              onClose={handleClose}
              anchorEl={anchorEl}
            />
          </div>
        )}
        {(item.isLoggedComment || renderDeleteIcon()) && (
          <p className="reply_text">sil</p>
        )}
      </div>
      {isOpen && (
        <div>
          <TextField
            id="comment"
            label="Bu gönderiye salla"
            multiline
            name="comment"
            onChange={handleChange}
            rows={4}
            variant="outlined"
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <Button
            className="comment_button"
            variant="contained"
            color="primary"
            disabled={!text}
            onClick={handleSubmit}
            endIcon={<SendIcon />}
          >
            Salla Gitsin
          </Button>
        </div>
      )}
      {item &&
        item.replies &&
        item.replies.map((reply, index) => (
          <Reply
            key={reply.id}
            item={reply}
            postId={props.postId}
            commentId={item.id}
          />
        ))}
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  createReply: (payload) => dispatch(createReplyRequest(payload)),
  likeComment: (payload) => dispatch(likeCommentRequest(payload)),
  unLikeComment: (payload) => dispatch(unlikeCommentRequest(payload)),
  deleteComment: (payload) => dispatch(deleteCommentRequest(payload)),
  deleteCommentModerator: (payload) =>
    dispatch(deleteCommentModeratorRequest(payload)),
});

const mapStateToProps = (state) => ({
  auth: state.auth.data,
  post: state.postDetail.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
