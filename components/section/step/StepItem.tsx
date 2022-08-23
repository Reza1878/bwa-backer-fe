import clsx from "clsx";
import { Img, Typography } from "components/common";
import React from "react";
interface StepItemProps {
  position: number;
  src: string;
  title: string;
  description: React.ReactNode;
}
function StepItem(props: StepItemProps) {
  const { description, title, src, position } = props;

  const margin = ["", "lg:-mt-14", "lg:-mt-28"];
  return (
    <div
      className={clsx(
        "text-center w-full lg:w-1/3 flex flex-col items-center lg:py-0 py-6",
        margin[position]
      )}
    >
      <Img src={src} />
      <Typography className="font-medium py-2">{title}</Typography>
      <Typography variant="small">{description}</Typography>
    </div>
  );
}

export default StepItem;
