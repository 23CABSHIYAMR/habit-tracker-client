import React from "react";
import Image from "next/image";
export default function ImgInBtn({
  dir = "left",
  className = "",
  clickEvent = () => {},
  alt="img"
}) {
  return (
    <button onClick={clickEvent} className={`rmv-btn-style circle-border ${className}`}>
      <Image
        src={`/assets/images/${dir}`}
        width="30"
        height="30"
        alt={alt}
      />
    </button>
  );
}
