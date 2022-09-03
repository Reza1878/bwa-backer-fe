import clsx from "clsx";
import React, { HTMLAttributes, MouseEventHandler } from "react";

interface BackdropProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
}

function Backdrop(props: Partial<BackdropProps>) {
  const { show, onClick, className } = props;
  return (
    <div
      className={clsx(
        "absolute w-full h-full bg-black bg-opacity-70 top-0 left-0 cursor-pointer",
        [show && "visible"],
        [!show && "invisible"],
        className
      )}
      onClick={onClick}
    />
  );
}

export default Backdrop;
