import React, { HTMLAttributes, ReactNode } from "react";
import Typography from "../Typography";
import TableBody from "./TableBody";
import TableData from "./TableData";
import TableHead from "./TableHead";
import TableRow from "./TableRow";

interface BaseTableProps extends HTMLAttributes<HTMLTableElement> {
  columns: {
    label: string;
    name: string;
    options?: {
      customBodyRender?: (val: any) => ReactNode;
      customBodyRenderLite?: (dataIndex: number) => ReactNode;
    };
  }[];
  data: any[];
  loading?: boolean;
}

function BaseTable(props: BaseTableProps) {
  const { columns, data, loading } = props;
  return (
    <table className="w-full border">
      <TableHead>
        <TableRow>
          {columns.map((col, index) => (
            <TableData key={index}>
              <Typography variant="small" className="font-bold">
                {col.label}
              </Typography>
            </TableData>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length == 0 && !loading && (
          <TableRow>
            <TableData colSpan={columns.length} className="text-center">
              <Typography variant="small" className="font-medium">
                No data available!
              </Typography>
            </TableData>
          </TableRow>
        )}
        {loading && (
          <TableRow>
            <TableData colSpan={columns.length} className="text-center">
              <Typography variant="small" className="font-medium">
                Loading...
              </Typography>
            </TableData>
          </TableRow>
        )}
        {!loading &&
          data.map((item, index) => (
            <TableRow key={index}>
              {columns.map((col, i) => (
                <TableData key={i}>
                  {col.options?.customBodyRender
                    ? col.options.customBodyRender(item[col.name] ?? undefined)
                    : col.options?.customBodyRenderLite
                    ? col.options.customBodyRenderLite(index)
                    : item[col.name]}
                </TableData>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </table>
  );
}

export default BaseTable;
