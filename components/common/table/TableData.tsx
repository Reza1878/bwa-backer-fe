import clsx from "clsx";
import React, { TdHTMLAttributes } from "react";
interface TableDataProps extends TdHTMLAttributes<HTMLTableCellElement> {}
function TableData(props: TableDataProps) {
  const { className, children, ...otherProps } = props;
  return (
    <td className={clsx("p-2 text-sm", className)} {...otherProps}>
      {children}
    </td>
  );
}

export default TableData;
