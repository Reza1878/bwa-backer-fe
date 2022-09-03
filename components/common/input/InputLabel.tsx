import clsx from "clsx";
import React, { LabelHTMLAttributes } from "react";
import Typography from "../Typography";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  error: boolean;
}

function InputLabel(props: Partial<InputLabelProps>) {
  const { htmlFor, children, className, error } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={clsx(
        "text-white text-lg mb-2 block",
        [error && "text-red-500"],
        className
      )}
    >
      <Typography>{children}</Typography>
    </label>
  );
}

export default InputLabel;
