import React, { useEffect } from "react";
import { compose } from "lodash/fp";
import { connect } from "react-redux";
import { readLocalStorage } from "../helpers";
import User from "./User";
import Profile from "./Profile";
import { withRouter } from "react-router-dom";

function UserOrProfile(props) {
  const {
    match: {
      params: { username },
    },
  } = props;

  if (
    username &&
    props.auth &&
    props.auth.user &&
    username === props.auth.user.username
  ) {
    return <Profile />;
  } else {
    return <User />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.data,
});

export default compose(
  connect(mapStateToProps, null),
  withRouter
)(UserOrProfile);
