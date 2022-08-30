import React, { ImgHTMLAttributes } from "react";

interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  containerClassNames?: string;
}

function Img(props: ImgProps) {
  return (
    <picture className={props.containerClassNames}>
      <img
        src={props.src}
        className={props.className}
        alt=""
        onClick={props.onClick}
      />
    </picture>
  );
}

export default Img;
