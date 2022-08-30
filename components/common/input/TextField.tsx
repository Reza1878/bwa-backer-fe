import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes, RefObject } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import Typography from "../Typography";
import InputLabel from "./InputLabel";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<FieldValues>;
  error: boolean;
  helperText: any;
}

const TextField = forwardRef<HTMLInputElement, Partial<TextFieldProps>>(
  (props, ref) => {
    const {
      className,
      id,
      label,
      register,
      error = false,
      helperText,
      ...otherProps
    } = props;
    const registerAttr = register ? register(props.name ?? "") : {};
    return (
      <div className="mb-4">
        {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
        <input
          {...otherProps}
          autoComplete="off"
          id={id}
          className={clsx(
            "w-full py-3 px-6 rounded-full focus:outline-none",
            className,
            [error && "border border-red-500"]
          )}
          {...registerAttr}
        />
        {helperText && (
          <Typography className="text-red-500 text-medium" variant="small">
            {helperText}
          </Typography>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
