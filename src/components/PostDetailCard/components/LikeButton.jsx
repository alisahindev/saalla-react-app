import React from "react";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import IconButton from "@material-ui/core/IconButton";

export default function LikeButton({ isLiked, onLike, convertLike, postId }) {
  return (
    <IconButton
      color={isLiked ? "secondary" : "default"}
      aria-label="add to favorites"
      onClick={isLiked ? () => convertLike(onLike.id) : () => onLike(postId)}
    >
      <FavoriteBorderOutlinedIcon
        color={isLiked ? "secondary" : "default"}
        style={{ padding: "3px" }}
      />
    </IconButton>
  );
}
