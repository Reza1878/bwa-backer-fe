import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "small";
}

function Typography(props: Partial<TypographyProps>) {
  const { children, style, className, variant } = props;
  const variantStyles = [];

  switch (variant) {
    case "h1":
      variantStyles.push("text-4xl lg:text-5xl");
      break;
    case "h2":
      variantStyles.push("text-3xl lg:text-4xl");
      break;
    case "h3":
      variantStyles.push("text-2xl lg:text-3xl");
      break;
    case "h4":
      variantStyles.push("text-xl lg:text-2xl");
      break;
    case "h5":
      variantStyles.push("text-lg lg:text-xl");
      break;
    case "h6":
      variantStyles.push("text-base lg:text-lg");
      break;
    case "body":
      variantStyles.push("text-sm lg:text-base");
      break;
    case "small":
      variantStyles.push("text-sm");
      break;
    default:
      variantStyles.push("text-sm lg:text-base");
      break;
  }
  return (
    <p style={style} className={clsx(variantStyles, className)}>
      {children}
    </p>
  );
}

export default Typography;
