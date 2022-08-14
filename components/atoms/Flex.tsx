import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface FlexProps extends HTMLAttributes<HTMLElement> {}

function Flex(props: FlexProps) {
  const { className, children } = props;
  return <div className={clsx("flex flex-wrap", className)}>{children}</div>;
}

export default Flex;
