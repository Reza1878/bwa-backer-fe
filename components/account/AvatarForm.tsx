import { AvatarPicker, Button, Card, Typography } from "components/common";
import React, { useState } from "react";
import useToast from "utils/toast-hooks";

interface AvatarFormProps {
  onSubmit: (val: FormData) => void;
  disabled?: boolean;
}

function AvatarForm(props: AvatarFormProps) {
  const { onSubmit, disabled } = props;
  const [image, setImage] = useState<File>();
  const [error, setError] = useState("");

  const { showToast } = useToast();

  const handleSubmit = () => {
    if (!image) {
      showToast("Image is required", "error");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", image!);
    onSubmit(formData);
  };
  return (
    <Card className="w-full mt-4">
      <Typography variant="h5" className="font-medium mb-4">
        Avatar
      </Typography>
      <div className="flex flex-col items-center justify-center">
        <AvatarPicker
          onImageChange={(val) => {
            setImage(val);
            if (val) {
              if (val.size / 1000 > 512) {
                setError("Max file size is 512kb.");
                return;
              }
            }
            setError("");
          }}
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Button disabled={disabled || !!error} onClick={handleSubmit}>
        Save
      </Button>
    </Card>
  );
}

export default AvatarForm;
