import clsx from "clsx";
import React, { AnchorHTMLAttributes } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  size: "sm" | "md" | "lg";
  rounded: boolean;
  variant: "transparent" | "primary";
}

function Button(props: Partial<ButtonProps>) {
  const {
    size,
    rounded = false,
    variant,
    onClick,
    children,
    className,
  } = props;
  const arrClassNames = [];

  switch (size) {
    case "sm":
      arrClassNames.push("py-2");
      break;

    case "md":
      arrClassNames.push("py-4");
      break;
    case "lg":
      arrClassNames.push("py-6");
      break;
    default:
      arrClassNames.push("py-2");
      break;
  }

  if (rounded) {
    arrClassNames.push("rounded-full");
  } else {
    arrClassNames.push("rounded-lg");
  }

  switch (variant) {
    case "transparent":
      arrClassNames.push(
        "bg-transparent hover:bg-white border-white hover:bg-opacity-25 border"
      );
      break;
    case "primary":
      arrClassNames.push("bg-success hover:bg-secondary");
      break;
    default:
      arrClassNames.push("bg-success hover:bg-secondary");
  }
  return (
    <a
      onClick={onClick}
      className={clsx(
        "inline-block text-center px-6 text-white font-medium transition-all cursor-pointer w-full lg:w-auto",
        className,
        arrClassNames
      )}
    >
      {children}
    </a>
  );
}

export default Button;
