import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import "./index.css";
import { TextField } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import userIcon from "./images/user.png";
import girlIcon from "./images/girl.png";
import manIcon from "./images/man.png";

export const renderImage = (image, gender) => {
  if (!image) {
    switch (gender) {
      case "E":
        return manIcon;
      case "K":
        return girlIcon;
      default:
        return userIcon;
    }
  } else {
    return image;
  }
};

function ProfileCard({ img, username, gender, bio, onSubmit, previewLogoUrl }) {
  const [isEdit, setEdit] = useState(false);
  const [values, setValues] = useState({ profileImage: "", bio: "" });

  const handleChange = (event, input) => {
    event.preventDefault();
    let imageFile = event.target.files[0];
    const newValues = {};
    newValues.profileImage = imageFile;
    onSubmit(newValues);
  };

  const handleBioChange = (e) => {
    const newValues = { ...values };
    newValues.bio = e.target.value;
    setValues(newValues);
  };

  const handleBioSubmit = () => {
    const bio = values.bio;
    onSubmit({ bio });
    setEdit(false);
  };

  return (
    <aside class="profile-card">
      <div class="mask-shadow"></div>
      <header>
        <a href="#">
          <img
            src={renderImage(img, gender)}
            alt="preview"
            className="preview-image"
          />

          <div className="edit_icon">
            <label htmlFor="myInput">
              <EditIcon className="profile_edit_icon" />
            </label>
            <input
              id="myInput"
              style={{ display: "none" }}
              type={"file"}
              onChange={(event) => handleChange(event, { name: "file" })}
            />
          </div>
        </a>
        <h1 style={{ marginTop: "10px" }}>{username}</h1>
        {/*  <h2>WEB DESIGNER</h2> */}
      </header>

      <div class="profile-bio">
        {isEdit ? (
          <div>
            <TextField
              style={{ width: "100%" }}
              id="outlined-multiline-static"
              label="bio"
              multiline
              onChange={handleBioChange}
              name="bio"
              rows={6}
              rowsMax={6}
              defaultValue={bio}
              variant="outlined"
            />

            <div>
              <HighlightOffIcon
                onClick={() => setEdit(!isEdit)}
                className="close_icon"
              />
              <CheckCircleOutlineIcon
                onClick={handleBioSubmit}
                className="check_icon"
              />
            </div>
          </div>
        ) : (
          <div>
            <p>"{bio}"</p>
            <div className="edit_icon">
              <EditIcon
                onClick={() => setEdit(!isEdit)}
                className="profile_edit_icon"
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default ProfileCard;
