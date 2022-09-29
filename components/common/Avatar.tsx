import clsx from "clsx";
import { BASE_URL } from "config/constant";
import React, { ImgHTMLAttributes } from "react";
import Img from "./Img";

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {}

function Avatar(props: AvatarProps) {
  return (
    <Img
      className={clsx("w-14 rounded-full object-cover", props.className)}
      src={props.src ? `${BASE_URL}${props.src}` : "/image/mock-avatar.png"}
    />
  );
}

export default Avatar;
