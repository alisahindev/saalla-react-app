import React from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

export default function ImageModal({ imageUrl, onClose }) {
  return (
    <Lightbox
      mainSrc={imageUrl}
      nextSrc={""}
      prevSrc={""}
      onCloseRequest={onClose}
      onMovePrevRequest={() => {}}
      onMoveNextRequest={() => {}}
    />
  );
}
