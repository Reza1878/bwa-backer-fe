import React, { useRef, useState } from "react";
import { Edit2, Plus } from "react-feather";
import Img from "./Img";

interface AvatarPickerProps {
  onImageChange: (img: File | undefined) => void;
}

function AvatarPicker(props: AvatarPickerProps) {
  const { onImageChange } = props;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState("");

  const openImgExplorer = () => {
    inputFileRef?.current?.click();
  };
  return (
    <div className="flex justiy-center">
      <div className="relative">
        <Img
          className="w-32 h-32 object-cover rounded-full bg-white cursor-pointer"
          onClick={openImgExplorer}
          src={imagePreview ? imagePreview : "/image/mock-avatar.png"}
        />
        <a
          href="#"
          onClick={openImgExplorer}
          className="absolute bg-secondary rounded-full bottom-1 right-1 p-2"
        >
          {imagePreview ? (
            <Edit2 className="text-white w-5 h-5" />
          ) : (
            <Plus className="text-white w-5 h-5" />
          )}
        </a>
        <input
          type="file"
          ref={inputFileRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const image = e?.target?.files || [];
            if (image.length > 0) {
              setImagePreview(URL.createObjectURL(image[0]));
              onImageChange(image[0]);
            } else {
              setImagePreview("");
              onImageChange(undefined);
            }
          }}
        />
      </div>
    </div>
  );
}

export default AvatarPicker;
