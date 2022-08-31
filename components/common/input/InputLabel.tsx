import clsx from "clsx";
import React, { LabelHTMLAttributes } from "react";

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

function InputLabel(props: InputLabelProps) {
  const { htmlFor, children, className } = props;
  return (
    <label
      htmlFor={htmlFor}
      className={clsx("text-white text-lg mb-2 block", className)}
    >
      {children}
    </label>
  );
}

export default InputLabel;
