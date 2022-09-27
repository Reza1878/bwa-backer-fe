import clsx from "clsx";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size: "sm" | "md" | "lg";
  rounded: boolean;
  variant: "transparent" | "primary";
  block: boolean;
}

function Button(props: Partial<ButtonProps>) {
  const {
    size,
    rounded = false,
    variant,
    onClick,
    children,
    className,
    block = false,
    disabled,
    ...otherProps
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
    arrClassNames.push("rounded-sm");
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
    <button
      onClick={onClick}
      className={clsx(
        "text-center px-6 text-white font-medium transition-all cursor-pointer block",
        arrClassNames,
        className,
        [disabled && "bg-gray-400 hover:bg-gray-400 cursor-not-allowed"],
        [block && "w-full"],
        [!block && "w-full lg:w-auto"]
      )}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
