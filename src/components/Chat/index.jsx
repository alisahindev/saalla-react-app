import React, { Component } from "react";
import { compose } from "lodash/fp";
import * as signalR from "@aspnet/signalr";
import Messenger from "../Messenger";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getConversationDetailRequest } from "../../redux/conversation/actions";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hubConnection: null,
      messages: [],
      message: "",
      nick: "asdasdsad",
    };
  }

  componentWillMount() {
    this.setState({
      hubConnection: new signalR.HubConnectionBuilder()
        .withUrl("https://saalla.radinyazilim.com/chat")
        .configureLogging(signalR.LogLevel.Information)
        .build(),
    });
  }

  componentDidMount() {
    const {
      getConversationDetail,
      location: { state },
    } = this.props;
    state &&
      state.conversationId &&
      getConversationDetail({ id: state.conversationId });

    this.state.hubConnection
      .start()
      .then(() => console.log("Connection started!"))
      .catch((err) => console.log("Error while establishing connection", err));

    this.state.hubConnection.on("sendToChannel", (nick, message) => {
      const text = `${nick}: ${message}`;
      const messages = this.state.messages.concat([text]);
      this.setState({ messages });
    });
  }

  sendMessage = () => {
    this.state.hubConnection
      .invoke("sendToChannel", this.state.nick, this.state.message)
      .catch((err) => console.error(err));

    this.setState({ message: "" });
  };

  render() {
    return <Messenger />;
  }
}

const mapDispatchToProps = (dispatch) => ({
  getConversationDetail: (payload) =>
    dispatch(getConversationDetailRequest(payload)),
});

const mapStateToProps = (state) => ({
  conversation: state.selectedConversation.data,
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)(Chat);
