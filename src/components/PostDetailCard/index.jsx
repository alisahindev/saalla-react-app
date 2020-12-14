import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import ReactPlayer from "react-player";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import SportsHandballIcon from "@material-ui/icons/SportsHandball";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentList from "../CommentList";
import { TextField, Button, Divider } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { Link, useHistory } from "react-router-dom";
import { createCommentRequest } from "../../redux/comment/actions";
import LinkPre from "../LinkPreview";
import { MDBIcon } from "mdbreact";
import { isLogged, htmlToText } from "../../helpers";
import PostMenu from "../postMenu";
import ImageModal from "../ImageModal";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
    marginBottom: "2rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {},
  postImage: {
    width: "100%",
  },
  leftSide: {
    width: "48px",
    backgroundColor: "#edebebcc",
  },
}));

function PostDetailCard(props) {
  const classes = useStyles();
  const [comment, setComment] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (!isLogged()) {
      history.push("/giris-yap");
      return;
    }
    const values = {};
    values.postId = id;
    values.content = comment;
    const { createComment } = props;
    createComment(values);
    document.getElementById("comment").value = "";
  };

  const {
    id,
    img,
    createdDate,
    content,
    contentType,
    community,
    comments,
    user,
    linkUrl,
    onVote,
    userPostVote,
    voteCount,
  } = props;

  const handleVote = (value) => {
    if (!isLogged()) {
      history.push("/giris-yap");
      return;
    }
    const values = { postId: id, value };
    onVote(values);
  };

  const renderMedia = () => {
    if (contentType == 50) {
      return (
        <div className={classes.imgContainer}>
          <LinkPre url={linkUrl} />
        </div>
      );
    }
    if (contentType == 20) {
      return (
        <div className="player-wrapper">
          <ReactPlayer className="react-player" controls url={img} />
        </div>
      );
    } else {
      return (
        <div className={classes.imgContainer}>
          <img
            style={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
            className={classes.postImage}
            src={img}
            alt=""
          />
          {isOpen && (
            <ImageModal imageUrl={img} onClose={() => setOpen(false)} />
          )}
        </div>
      );
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const calculateSallamaCount = (comments) => {
    let count = 0;
    if (comments && comments.length > 0) {
      comments.map((x) => (count += x.replies.length));
      count += comments.length;
    }
    return count;
  };

  const menuItems = [{ title: "Şikayet Et", onClick: handleClose }];

  return (
    <React.Fragment>
      {community && content && (
        <Helmet title={community.name + " salladı: " + htmlToText(content)}>
        <meta name="description" content={community.name + " salladı: " + htmlToText(content)} />
    </Helmet>
      )}
      <Card className="post_card">
        <div className={classes.leftSide}>
          <div className="vote_cont">
            <MDBIcon
              className={
                userPostVote && userPostVote.value == 1
                  ? "angle-double-up_checked"
                  : "angle-double-up"
              }
              icon="angle-double-up"
              onClick={() =>
                handleVote(userPostVote && userPostVote.value == 1 ? 0 : 1)
              }
            />
            <p className="vote">{voteCount}</p>
            <MDBIcon
              className={
                userPostVote && userPostVote.value == -1
                  ? "angle-double-down_checked"
                  : "angle-double-down"
              }
              icon="angle-double-down"
              onClick={() =>
                handleVote(userPostVote && userPostVote.value == -1 ? 0 : -1)
              }
            />
          </div>
        </div>
        <div className="right_side_post">
          <CardHeader
            style={{ padding: "16px 16px 0 16px" }}
            avatar={
              <Avatar
                aria-label="recipe"
                src={community && community.logoPath}
                className={classes.avatar}
              ></Avatar>
            }
            action={
              <div>
                <IconButton onClick={handleClick} aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
                <PostMenu
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  menuItems={menuItems}
                />
              </div>
            }
            title={
              <div>
                <Link to={`/t/${community.slug}`}>{community.name}</Link>
                <small
                  style={{ margin: "4px", fontWeight: 600, fontSize: "92%" }}
                >
                  /
                </small>
                <Link to={`/${user.userName}`}>
                  {" "}
                  <span className="posted_by">
                    {"u/" + user.userName + " " + "tarafından"}
                  </span>{" "}
                </Link>
              </div>
            }
            subheader={createdDate && moment(createdDate).fromNow()}
          />
          <CardContent style={{ padding: "5px 16px 16px 25px" }}>
            <Typography
              dangerouslySetInnerHTML={{ __html: content }}
              variant="body2"
              style={{ color: "black" }}
              component="p"
            />
          </CardContent>
          {renderMedia()}
          <Divider style={{ margin: "15px 0px 0px 0px" }} />

          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <SportsHandballIcon style={{ padding: "3px" }} />
            </IconButton>
            <small style={{ marginLeft: "-5px" }}>
              {comments && calculateSallamaCount(comments)} sallama
            </small>
            <IconButton aria-label="share">
              <ShareIcon style={{ padding: "3px" }}></ShareIcon>
            </IconButton>
            <small style={{ marginLeft: "-5px" }}>Paylaş</small>
          </CardActions>
          <Collapse in={true} timeout="auto" unmountOnExit>
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
              disabled={!comment}
              onClick={handleSubmit}
              endIcon={<SendIcon />}
            >
              Salla Gitsin
            </Button>
            <CommentList comments={comments} postId={id} />
          </Collapse>
        </div>
      </Card>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => ({
  createComment: (payload) => dispatch(createCommentRequest(payload)),
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailCard);
