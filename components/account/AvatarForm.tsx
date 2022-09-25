import { AvatarPicker, Button, Card, Typography } from "components/common";
import React, { useState } from "react";
import useToast from "utils/toast-hooks";

interface AvatarFormProps {
  onSubmit: (val: FormData) => void;
}

function AvatarForm(props: AvatarFormProps) {
  const { onSubmit } = props;
  const [image, setImage] = useState<File>();
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
      <div className="flex justify-center">
        <AvatarPicker onImageChange={(val) => setImage(val)} />
      </div>
      <Button onClick={handleSubmit}>Save</Button>
    </Card>
  );
}

export default AvatarForm;
