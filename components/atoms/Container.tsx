import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

function Container(props: Partial<ContainerProps>) {
  const { children, className } = props;
  return (
    <div className={clsx("container px-6 lg:px-24 mx-auto py-4", className)}>
      {children}
    </div>
  );
}

export default Container;
