import { Button, Img, ProgressBar } from "components/common";
import { BASE_URL } from "config/constant";
import { useRouter } from "next/router";
import React from "react";

interface ProjectItemProps {
  id: number;
  image: string;
  title: string;
  description: string;
  progress: number;
  target: number;
}

function ProjectItem(props: ProjectItemProps) {
  const { image, title, description, progress, target, id } = props;

  const router = useRouter();
  const handleClick = () => {
    router.push(`/campaign/${id}`);
  };
  return (
    <div className="rounded-lg box-border border border-gray-400 p-6 w-full lg:w-[30%] hover:shadow-xl transition-all project-card m-2">
      <div className="w-full">
        <div>
          <Img
            className="rounded-sm w-full lg:h-52 object-cover"
            src={`${BASE_URL}${image}`}
          />
          <h5 className="font-medium text-xl py-2">{title}</h5>
          <p className="font-light text-sm">{description}</p>
        </div>

        <div className="btn-fund-container my-2">
          <ProgressBar percentage={progress} />
          <div className="flex pt-2 pb-0 lg:pb-2 justify-between progress">
            <p className="font-light text-base">{progress}%</p>
            <p className="font-medium text-base">
              Rp. {new Intl.NumberFormat().format(target)}
            </p>
          </div>
          <Button
            block
            size="sm"
            className="btn-fund mt-2 lg:mt-0 opacity-100 lg:opacity-0"
            onClick={handleClick}
          >
            Fund Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
