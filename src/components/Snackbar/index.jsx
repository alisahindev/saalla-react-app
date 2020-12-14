import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

function Snackbar(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function CustomizedSnackbars(props) {
  return (
    <Snackbar style={props.style} onClick={props.onClick} severity={props.type}>
      {props.message}
    </Snackbar>
  );
}
