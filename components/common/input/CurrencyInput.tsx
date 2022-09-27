import clsx from "clsx";
import React, { InputHTMLAttributes, useRef, useState } from "react";
import { parseLocaleNumber } from "utils/number_format";
import Typography from "../Typography";
import InputLabel from "./InputLabel";

interface CurrencyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: boolean;
  helperText: any;
  rounded: boolean;
  labelClassName: string;
  onValueChange: (val: number) => void;
}

function CurrencyInput(props: Partial<CurrencyInputProps>) {
  const {
    label,
    className,
    error,
    helperText,
    rounded,
    id,
    name,
    labelClassName,
    type,
    defaultValue = 0,
    onValueChange = (val) => {},
    ...otherProps
  } = props;
  const num = useRef<number>(+defaultValue);
  const [formattedNumber, setFormattedNumber] = useState(
    new Intl.NumberFormat("id-ID").format(num.current)
  );

  const handleChange = (str: string) => {
    num.current = parseLocaleNumber(str);
    setFormattedNumber(new Intl.NumberFormat("id-ID").format(num.current));
    onValueChange(num.current);
  };
  return (
    <div className="mb-4">
      {label && (
        <InputLabel error={error} htmlFor={id} className={labelClassName}>
          {label}
        </InputLabel>
      )}
      <input
        type={type}
        autoComplete="off"
        id={id}
        className={clsx(
          "w-full py-3 px-6 focus:outline-none border",
          className,
          [error && "border border-red-500"],
          [rounded && "rounded-full"],
          [!rounded && "rounded-xl"]
        )}
        name={name}
        value={formattedNumber}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        {...otherProps}
      />
      {helperText && (
        <Typography className="text-red-500 text-medium" variant="small">
          {helperText}
        </Typography>
      )}
    </div>
  );
}

export default CurrencyInput;
