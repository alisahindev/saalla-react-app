import React from "react";
import { useHistory } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { MDBIcon } from "mdbreact";
import { Avatar } from "@material-ui/core";
import { readLocalStorage } from "../../helpers";

export default function CreatePostTab(props) {
  const history = useHistory();
  const { user, slug } = props;
  return (
    <Paper className="post_bar">
      {user && (
        <Avatar
          style={{ marginRight: "1rem" }}
          src={props.user.profileImagePath}
          className="header_avatar"
        />
      )}
      <input
        onClick={() => {
          const token = readLocalStorage("token");
          token
            ? history.push(`/salla?is=${slug ? slug : ""}`)
            : history.push("/giris-yap");
        }}
        placeholder="Salla Bişiler"
        className="post_bar_input"
        type="text"
      />
      <MDBIcon
        onClick={() => {
          const token = readLocalStorage("token");
          token
            ? history.push(`/salla?is=${slug ? slug : ""}`)
            : history.push("/giris-yap");
        }}
        far
        icon="image"
        size="2x"
        className="post_bar_icon"
      />
      <MDBIcon
        onClick={() => {
          const token = readLocalStorage("token");
          token
            ? history.push(`/salla?is=${slug ? slug : ""}`)
            : history.push("/giris-yap");
        }}
        icon="link"
        size="2x"
        className="post_bar_icon"
      />
    </Paper>
  );
}
