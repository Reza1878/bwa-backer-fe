import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface HeaderBackgroundProps extends HTMLAttributes<HTMLElement> {
  part: "header" | "footer";
}

function HeaderBackground(props: HeaderBackgroundProps) {
  const { className, part } = props;
  const arrClassName = [];
  switch (part) {
    case "header":
      arrClassName.push("-skew-y-6 origin-top-left");
      break;
    case "footer":
      arrClassName.push("skew-y-[4deg] origin-bottom-right");
    default:
      arrClassName.push("-skew-y-6 origin-top-left");
      break;
  }
  return (
    <div
      className={clsx(
        "header__bg lg:max-h-[664px] h-auto",
        arrClassName,
        className
      )}
    />
  );
}

export default HeaderBackground;
