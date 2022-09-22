import clsx from "clsx";
import React, { HTMLAttributes } from "react";
import Backdrop from "./Backdrop";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  closeHandler: () => void;
  center: boolean;
}

function Modal(props: Partial<ModalProps>) {
  const { show, className, children, center, closeHandler } = props;
  return (
    <>
      <div
        className={clsx(
          "fixed z-20 inset-0 duration-300",
          { "invisible opacity-0": !show },
          { visible: "show" },
          className
        )}
      >
        <div
          className={clsx(
            "flex justify-center",
            {
              "items-center": center,
            },
            { "pt-24": !center }
          )}
        >
          <Backdrop show={show} onClick={closeHandler} />
          <div className="z-20">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;
