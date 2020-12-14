import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Button } from "@material-ui/core";
import DeleteCommentPop from "../../../../components/CommentList/components/deleteCommentPop";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function UserModal(props) {
  const { open, onClose, data, onDeleteButton } = props;

  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [popupAnchor, setPopupAnchor] = React.useState(null);

  const openPopup = (e) => {
    setPopupAnchor(e.currentTarget);
  };

  const onSubmit = () => {
    onDeleteButton({ username: data.username });
    setPopupAnchor(null);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={data.profileImg}></Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={data.username}
          secondary={`Toplam sallamalar: ${data.postCount}`}
        />
      </ListItem>
      <Button onClick={openPopup} variant="outlined" color="secondary">
        Kullanıcıyı Engelle
      </Button>
      <DeleteCommentPop
        onSubmit={onSubmit}
        onClose={() => setPopupAnchor(false)}
        anchorEl={popupAnchor}
      />
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}
