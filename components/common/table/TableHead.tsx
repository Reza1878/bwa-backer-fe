import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {}

function TableHead(props: TableHeadProps) {
  const { className, children } = props;
  return <thead className={clsx("border-b", className)}>{children}</thead>;
}

export default TableHead;
