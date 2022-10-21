import {
  AvatarPicker,
  Button,
  Container,
  Img,
  Typography,
} from "components/common";
import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Edit2, Plus } from "react-feather";
import { UserType } from "service/types";
import UserService from "service/user_service";
import { useSendAndHandleInvalidToken } from "utils/hooks";
import useToast from "utils/toast-hooks";

function UploadPhoto() {
  const [image, setImage] = useState<File>();
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const send = useSendAndHandleInvalidToken();
  const { showToast, toastLoading, updateToast } = useToast();

  const router = useRouter();

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      setLoading(true);
      const response = await send(UserService.getUser);

      if (!active) return;

      if (response.meta.code == 200) {
        if (response.data.image_url) {
          router.replace("/");
        }
        setLoading(false);
        setUser(response.data);
      } else {
        setLoading(false);
        showToast(response.meta.message, "error");
        router.push("/");
      }
    };

    fetchUser();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const openImgExplorer = () => {
    inputFileRef?.current?.click();
  };

  const handleSkip = () => {
    router.push("/sign-up/success");
  };

  const uploadAvatar = async () => {
    if (!image) {
      showToast("Image is required", "error");
      return;
    }
    toastLoading();
    const formData = new FormData();
    formData.append("avatar", image!);
    const response = await UserService.uploadAvatar(formData);

    if (response.meta.code == 200) {
      updateToast(response.meta.message, "success");
      router.push("/sign-up/success");
    } else {
      updateToast(response.meta.message, "error");
    }
  };

  return (
    <>
      <Head>
        <title>Backer - Upload Photo</title>
      </Head>
      <div className="header__bg h-screen"></div>
      <Container>
        <div className="flex justify-center">
          <div className="relative flex-col flex justify-center items-center pt-36 w-full lg:w-1/3">
            {loading ? (
              <LoadingIndicator />
            ) : (
              <>
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
                  {error && (
                    <div className="bg-red-400 p-2 rounded-xl mt-2">
                      <p className="text-white">{error}</p>
                    </div>
                  )}
                </div>
                <Typography variant="h4" className="text-white mt-4">
                  Hi, {(user?.name ?? "").split(" ")[0]}
                </Typography>
                <Typography variant="body" className="mt-2 text-white">
                  Please upload your selfie
                </Typography>

                <Button
                  block
                  rounded
                  size="md"
                  className="mt-4 lg:w-full"
                  style={{ width: "100%" }}
                  onClick={uploadAvatar}
                  disabled={!!error}
                >
                  Sign Up Now
                </Button>
                <Button
                  block
                  rounded
                  size="md"
                  variant="transparent"
                  className="mt-4 lg:w-full"
                  onClick={handleSkip}
                  style={{ width: "100%" }}
                >
                  Skip
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default UploadPhoto;
