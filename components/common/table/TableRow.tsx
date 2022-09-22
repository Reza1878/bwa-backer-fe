import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

function TableRow(props: TableRowProps) {
  const { className, children } = props;
  return <tr className={clsx("border-b", className)}>{children}</tr>;
}

export default TableRow;
