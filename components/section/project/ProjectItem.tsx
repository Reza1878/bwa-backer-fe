import { Button, Img, ProgressBar } from "components/common";
import { BASE_URL } from "config/constant";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import noImage from "../../../public/image/no-image.png";

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
    <div className="rounded-lg box-border border border-gray-400 p-6 col-span-3 lg:col-span-1 hover:shadow-xl transition-all project-card m-2">
      <div className="w-full">
        <div className="relative h-52">
          <Image
            alt="project-banner"
            src={image ? `${BASE_URL}${image}` : noImage}
            className="rounded-sm w-full"
            objectFit="cover"
            layout="fill"
          />
        </div>
        <h5 className="font-medium text-xl py-2">{title}</h5>
        <p className="font-light text-sm">{description}</p>

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
            style={{ width: "100%" }}
          >
            Fund Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProjectItem;
