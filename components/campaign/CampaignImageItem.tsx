import clsx from "clsx";
import Image from "next/image";
import React, { ImgHTMLAttributes } from "react";
import { CheckCircle } from "react-feather";

interface CampaignImageItemProps extends ImgHTMLAttributes<HTMLImageElement> {
  onClick?: () => void;
}

function CampaignImageItem(props: CampaignImageItemProps) {
  const { src, alt, className, onClick } = props;
  return (
    <div className="mx-2 p-2 border border-gray-400 rounded-xl h-40 w-56 inline-block campaign-image-container relative">
      {src && (
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            className={clsx("w-full h-full object-cover rounded-xl", className)}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <div
        onClick={onClick}
        className="picture-overlay rounded-xl bg-secondary bg-opacity-70 flex justify-center items-center transition-all cursor-pointer"
      >
        <CheckCircle width={48} height={48} color="white" />
      </div>
    </div>
  );
}

export default CampaignImageItem;
