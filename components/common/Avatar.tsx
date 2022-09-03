import clsx from "clsx";
import { BASE_URL } from "config/constant";
import React, { ImgHTMLAttributes } from "react";
import Img from "./Img";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {}

function Avatar(props: AvatarProps) {
  return (
    <Img
      className={clsx("w-16 h-16 rounded-full object-contain", props.className)}
      src={props.src ? `${BASE_URL}${props.src}` : "/image/mock-avatar.png"}
    />
  );
}

export default Avatar;
