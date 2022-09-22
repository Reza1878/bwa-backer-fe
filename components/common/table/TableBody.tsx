import React, { HTMLAttributes } from "react";
interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

function TableBody(props: TableBodyProps) {
  const { children, ...otherProps } = props;
  return <tbody {...otherProps}>{children}</tbody>;
}

export default TableBody;
