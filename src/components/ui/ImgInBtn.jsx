import React from "react";
import Image from "next/image";
export default function ImgInBtn({
  dir = "left",
  className = "",
  clickEvent = () => {},
  alt="img"
}) {
  return (
    <button onClick={clickEvent} className={`rmv-btn-style circle-border image-in-btn ${className}`}>
      <Image
        src={`/assets/images/${dir}`}
        width="30"
        height="30"
        className="img-inside-btn"
        alt={alt}
      />
    </button>
  );
}
