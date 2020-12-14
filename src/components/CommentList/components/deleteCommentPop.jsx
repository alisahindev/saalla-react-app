import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  button_root: {
    margin: "5px",
    textAlign: "center",
  },
  buttons: {
    padding: "2px !important",
    margin: "2px",
  },
}));

export default function DeleteCommentPop(props) {
  const { anchorEl, onClose, onSubmit } = props;

  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Typography className={classes.typography}>
        Silmek istediğinize eminmisiniz ?
      </Typography>
      <div className={classes.button_root}>
        <Button
          onClick={onClose}
          className={classes.buttons}
          variant="outlined"
          color="primary"
        >
          Boşver
        </Button>
        <Button
          onClick={onSubmit}
          className={classes.buttons}
          variant="outlined"
          color="secondary"
        >
          Sil
        </Button>
      </div>
    </Popover>
  );
}
