import clsx from "clsx";
import React, { forwardRef, InputHTMLAttributes, RefObject } from "react";
import { UseFormRegister } from "react-hook-form";
import Typography from "../Typography";
import InputLabel from "./InputLabel";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegister<any>;
  error: boolean;
  helperText: any;
  labelClassName: string | undefined;
  rounded: boolean;
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
      rounded,
      labelClassName,
      ...otherProps
    } = props;
    const registerAttr = register ? register(props.name ?? "") : {};
    return (
      <div className="mb-4">
        {label && (
          <InputLabel error={error} htmlFor={id} className={labelClassName}>
            {label}
          </InputLabel>
        )}
        <input
          {...otherProps}
          autoComplete="off"
          id={id}
          className={clsx(
            "w-full py-3 px-6 focus:outline-none border",
            className,
            [error && "border border-red-500"],
            [rounded && "rounded-full"],
            [!rounded && "rounded-xl"]
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
