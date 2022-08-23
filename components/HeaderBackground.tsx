import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface HeaderBackgroundProps extends HTMLAttributes<HTMLElement> {
  part: "header" | "footer";
  skew: boolean;
}

function HeaderBackground(props: Partial<HeaderBackgroundProps>) {
  const { className, part, skew = true } = props;
  const arrClassName = [];
  switch (part) {
    case "header":
      arrClassName.push("origin-top-left");
      if (skew) arrClassName.push("-skew-y-6");
      break;
    case "footer":
      arrClassName.push("origin-bottom-right skew-y-[4deg]");
      if (skew) arrClassName.push("skew-y-[4deg]");
      break;
    default:
      arrClassName.push("origin-top-left");
      if (skew) arrClassName.push("-skew-y-6");

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
