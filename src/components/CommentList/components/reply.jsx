import React from "react";
import { Link, useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SendIcon from "@material-ui/icons/Send";
import DeleteCommentPop from "./deleteCommentPop";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import {
  deleteReplyRequest,
  createReplyRequest,
  likeReplyRequest,
  unlikeReplyRequest,
  deleteReplyModeratorRequest,
} from "../../../redux/comment/actions";
import { connect } from "react-redux";
import { isLogged } from "../../../helpers";

function Reply(props) {
  const [isOpen, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDeleteReply = () => {
    const { deleteReply, postId } = props;
    const values = { replyId: item.id, postId };
    deleteReply(values);
  };

  const replyTo = (username, content) => {
    return username == null ? (
      <p>{content}</p>
    ) : (
      <div>
        <Link>{`@${username}  `}</Link>
        {content}
      </div>
    );
  };

  const onLikeReply = () => {
    if (!isLogged()) {
      history.push("/giris-yap");
    }
    const values = { postId: props.postId, replyId: item.id };
    const { likeReply } = props;
    likeReply(values);
  };

  const onUnlike = () => {
    if (!isLogged()) {
      history.push("/giris-yap");
    }
    const values = { postId: props.postId, replyId: item.id };
    const { unLikeReply } = props;
    unLikeReply(values);
  };

  const handleSubmit = () => {
    if (!isLogged()) {
      history.push("/giris-yap");
      return;
    } else {
      const { createReply, postId, item, commentId } = props;
      const values = { postId, commentId, content: text, parentId: item.id };
      createReply(values);
      document.getElementById("comment").value = "";
      setOpen(false);
    }
  };

  const onDeleteReplyModerator = () => {
    const values = { replyId: item.id, postId: props.postId };
    const { deleteReplyModerator } = props;
    deleteReplyModerator(values);
    handleClose();
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
      auth.user.username !== item.replyUserInfo.userName
    ) {
      onDeleteReplyModerator();
    } else {
      onDeleteReply();
    }
    handleClose();
  };

  const { item } = props;
  const { parent } = item;
  return (
    item && (
      <div key={item.id}>
        <ListItem className="reply_item" alignItems="flex-start">
          <ListItemAvatar>
            <Avatar
              alt="Remy Sharp"
              src={item.replyUserInfo.profileImagePath}
            />
          </ListItemAvatar>
          <ListItemText
            primary={item.replyUserInfo.userName}
            secondary={replyTo(parent.parentReplyUserName, item.content)}
          />
        </ListItem>
        <div
          style={{ marginLeft: "7.2rem" }}
          className="comment_icon_container"
        >
          <CommentOutlinedIcon
            style={{
              borderRadius: "2px",
              display: "inline-block",
              padding: "4px",
            }}
          />
          <Link to="#" onClick={() => setOpen(!isOpen)}>
            <p className="reply_text">{isOpen ? "boşver" : "salla"}</p>
          </Link>
          <FavoriteBorderOutlinedIcon
            className={
              item.isLoggedLiked
                ? "checked_comment_like_icon"
                : "comment_like_icon"
            }
            onClick={item.isLoggedLiked ? onUnlike : onLikeReply}
          />
          <p className="reply_text">{item.likeCount}</p>
          {(item.isLoggedReply || renderDeleteIcon()) && (
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
      </div>
    )
  );
}

const mapDispatchToProps = (dispatch) => ({
  deleteReply: (payload) => dispatch(deleteReplyRequest(payload)),
  createReply: (payload) => dispatch(createReplyRequest(payload)),
  likeReply: (payload) => dispatch(likeReplyRequest(payload)),
  unLikeReply: (payload) => dispatch(unlikeReplyRequest(payload)),
  deleteReplyModerator: (payload) =>
    dispatch(deleteReplyModeratorRequest(payload)),
});

const mapStateToProps = (state) => ({
  auth: state.auth.data,
  post: state.postDetail.data,
});

export default connect(mapStateToProps, mapDispatchToProps)(Reply);
