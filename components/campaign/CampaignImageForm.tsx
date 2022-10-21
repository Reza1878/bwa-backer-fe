import clsx from "clsx";
import { Button, Card, Modal, Typography } from "components/common";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";

interface CampaignImageForm {
  show: boolean;
  closeHandler: () => void;
  onSubmit: (val: any) => void;
  loading: boolean;
}

function CampaignImageForm(props: Partial<CampaignImageForm>) {
  const { show, closeHandler, onSubmit = (val) => {}, loading } = props;
  const [image, setImage] = useState<File>();
  const [isPrimary, setIsPrimary] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!image) {
      setError("Image is required!");
      return;
    }
    setError("");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("is_primary", JSON.stringify(isPrimary));

    onSubmit(formData);
  };

  return (
    <Modal show={show} closeHandler={closeHandler}>
      <Card className="w-[512px] h-auto">
        <Typography>Upload Campaign Image</Typography>
        <hr className="my-4" />

        <div className="mb-4">
          <label
            htmlFor="img"
            className={clsx("block text-base mb-2", {
              "text-red-500": !!error,
            })}
          >
            Image
          </label>
          <input
            type="file"
            id="img"
            className={clsx("border w-full p-2", { "border-red-500": !!error })}
            accept="image/*"
            onChange={(e) => {
              const image = e?.target?.files || [];
              if (image.length > 0) {
                setImage(image[0]);
                if (image[0].size / 1000 > 512) {
                  setError("Max file size is 512kb.");
                  return;
                }
              } else {
                setImage(undefined);
              }
              setError("");
            }}
          />
          {error && (
            <Typography variant="small" className="text-red-500">
              {error}
            </Typography>
          )}
        </div>
        <Switch.Group as="div" className="mb-4">
          <div className="flex items-center">
            <Switch
              checked={isPrimary}
              onChange={setIsPrimary}
              className={clsx(
                "relative inline-flex h-6 w-11 items-center rounded-full",
                [isPrimary && "bg-primary"],
                [!isPrimary && "bg-gray-200"]
              )}
            >
              <span
                className={clsx(
                  "transition inline-block h-4 w-4 rounded-full bg-white translate-x-1",
                  [isPrimary && "translate-x-6"]
                )}
              />
            </Switch>
            <Switch.Label className="ml-2">Is Primary</Switch.Label>
          </div>
        </Switch.Group>
        {/* <div className="flex items-center mb-4">
          <input
            id="is-primary"
            type="checkbox"
            className="w-4 h-4 text-primary rounded-lg border-gray-300 focus:ring-blue-500"
            checked={isPrimary}
            onChange={(e) => setIsPrimary(e.target.checked)}
          />
          <label htmlFor="is-primary" className="ml-2 text-base">
            Primary
          </label>
        </div> */}
        <Button block disabled={loading || !!error} onClick={handleSubmit}>
          Submit
        </Button>
      </Card>
    </Modal>
  );
}

export default CampaignImageForm;
