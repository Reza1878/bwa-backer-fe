import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

function Container(props: Partial<ContainerProps>) {
  const { children, className, id } = props;
  return (
    <div
      className={clsx("container px-6 xl:px-24 mx-auto py-4", className)}
      id={id}
    >
      {children}
    </div>
  );
}

export default Container;
