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
        <div key={index} className="flex flex-wrap my-2 justify-between">
          <Typography className="font-bold">{attr.label}</Typography>
          <div className="w-full lg:w-4/5">
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
