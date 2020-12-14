import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "lodash/fp";
import EmailIcon from "@material-ui/icons/Email";
import Loader from "./Loader";
import PrimarySearchAppBar from "./Header";
import { connect } from "react-redux";
import SendSuggestionModal from "./sendSuggestionModal";
import { sendSuggestRequest } from "../redux/users/actions";

function MainLayout(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(null);
  const [email, setEmail] = useState(null);
  const { loader } = props;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = () => {
    const payload = { content: text, email };
    props.sendSuggest(payload);
    setOpen(false);
  };

  return (
    <div>
      <PrimarySearchAppBar />
      {loader.loading && <Loader />}
      {props.children}
      <div className="icon-bar">
        <a onClick={() => setOpen(!open)} href="javascript:void(0)" className="facebook">
          <EmailIcon />
        </a>
      </div>
      <SendSuggestionModal
        onChange={handleChange}
        onChangeEmail={handleChangeEmail}
        onSubmit={handleSubmit}
        text={text}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  loader: state.loader,
});

const mapDispatchToProps = (dispatch) => ({
  sendSuggest: (payload) => dispatch(sendSuggestRequest(payload)),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(MainLayout);
