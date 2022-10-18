import clsx from "clsx";
import React from "react";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  percentage: number;
}

function ProgressBar(props: ProgressBarProps) {
  const { percentage, className } = props;
  return (
    <div
      className={clsx(
        "bg-gray-300 my-2 block h-4 rounded-lg relative",
        className
      )}
    >
      <span
        style={{
          width: `${Math.min(percentage, 100)}%`,
          height: "100%",
          position: "absolute",
        }}
        className="bg-primary opacity-90 rounded-lg"
      >
        {" "}
      </span>
    </div>
  );
}

export default ProgressBar;
