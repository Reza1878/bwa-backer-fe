import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

function Card(props: CardProps) {
  const { className, style, children } = props;
  return (
    <div
      className={clsx("bg-white w-full rounded-lg p-4", className)}
      style={style}
    >
      {children}
    </div>
  );
}

export default Card;
