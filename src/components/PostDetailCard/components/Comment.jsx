import React from "react";
import { Row, Col } from "react-bootstrap";
import { Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function Comment(props) {
  return (
    <div>
      <div className="comment-card">
        <div style={{ display: "flex" }}>
          <p>
            <Link>Enes Sahin</Link>
          </p>
          <p style={{ color: "gray", marginLeft: "1rem" }}>2 saat once</p>
        </div>
        <div>
          <Divider style={{ width: "100%" }} />
        </div>
        <div>
          <p>{props.text}</p>
        </div>
      </div>
      <Reply reply={props.reply} />
    </div>
  );
}

function Reply(props) {
  return (
    <div
      className="reply-card"
      style={{
        marginLeft: "3rem",
      }}
    >
      <div style={{ display: "flex" }}>
        <p>
          <Link>Enes Sahin</Link>
        </p>
        <p style={{ color: "gray", marginLeft: "1rem" }}>2 saat once</p>
      </div>
      <div>
        <Divider style={{ width: "100%" }} />
      </div>
      <div>
        <p>{props.reply}</p>
      </div>
    </div>
  );
}
