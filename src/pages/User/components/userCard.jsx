import React, { useState } from "react";
import EmailIcon from "@material-ui/icons/Email";
import { IconButton } from "@material-ui/core";
import SendMessageModal from "./sendMessageModal";

export default function UserCard({ img, username, email, bio, id, onMessage }) {
  return (
    <aside class="profile-card">
      <div class="mask-shadow"></div>
      <header>
        <a href="#">
          <img
            src={
              img ||
              "https://immedilet-invest.com/wp-content/uploads/2016/01/user-placeholder.jpg"
            }
          />
        </a>
        <h1 style={{ marginTop: "10px" }}>{username}</h1>
        {/*  <h2>WEB DESIGNER</h2> */}
      </header>

      <div class="profile-bio">
        <p>{bio}</p>
      </div>

      <ul class="profile-social-links">
        <li style={{ display: "grid" }}>
          <IconButton
            onClick={onMessage}
            style={{ marginBottom: "-12px" }}
            color="inherit"
          >
            <EmailIcon style={{ color: "#4cc63e" }} />
          </IconButton>
          <label className="send_message_text"> Mesaj gönder </label>
        </li>
      </ul>
    </aside>
  );
}
