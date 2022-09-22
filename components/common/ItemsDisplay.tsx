import React from "react";
import Typography from "./Typography";

export interface ItemsDisplayProps {
  data: any;
  attrAndLabels: {
    label: string;
    key: string;
    display?: (val: any) => any;
  }[];
}

function ItemsDisplay(props: ItemsDisplayProps) {
  const { data, attrAndLabels } = props;

  return (
    <>
      {attrAndLabels.map((attr, index) => (
        <div key={index} className="grid grid-cols-3 gap-4">
          <div className="col-span-3 lg:col-span-1">
            <Typography className="font-bold">{attr.label}</Typography>
          </div>
          <div className="col-span-3 lg:col-span-2">
            <Typography>
              {attr.display ? attr.display(data[attr.key]) : data[attr.key]}
            </Typography>
          </div>
        </div>
      ))}
    </>
  );
}

export default ItemsDisplay;
