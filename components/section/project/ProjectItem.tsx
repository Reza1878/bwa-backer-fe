import { Button, Img } from "components/common";
import React from "react";

interface ProjectItemProps {
  image: string;
  title: string;
  description: string;
  progress: number;
  target: number;
}

function ProjectItem(props: ProjectItemProps) {
  const { image, title, description, progress, target } = props;
  return (
    <div className="rounded-lg box-border border border-gray-400 p-6 w-full lg:w-[30%] hover:shadow-xl transition-all project-card m-2">
      <div className="w-full">
        <Img
          className="rounded-sm w-full lg:h-52 object-cover"
          src={`/image/${image}`}
        />
        <h5 className="font-medium text-xl py-2">{title}</h5>
        <p className="font-light text-sm">{description}</p>

        <div className="bg-gray-300 my-2 block h-4 rounded-lg relative">
          <span
            style={{
              width: `${progress}%`,
              height: "100%",
              position: "absolute",
            }}
            className="bg-primary opacity-90 rounded-lg"
          >
            {" "}
          </span>
        </div>
        <div className="flex pt-2 pb-0 lg:pb-2 justify-between progress">
          <p className="font-light text-base">{progress}%</p>
          <p className="font-medium text-base">
            Rp. {new Intl.NumberFormat().format(target)}
          </p>
        </div>
        <Button
          block
          className="btn-fund mt-2 lg:mt-0 opacity-100 lg:opacity-0"
        >
          Fund Now
        </Button>
      </div>
    </div>
  );
}

export default ProjectItem;
