import { PasswordForm, ProfileForm } from "components/account";
import AvatarForm from "components/account/AvatarForm";
import { Typography } from "components/common";
import LoadingIndicator from "components/common/LoadingIndicator/LoadingIndicator";
import { MemberLayout } from "components/layouts";
import React, { useEffect, useState } from "react";
import { UserType } from "service/types";
import UserService from "service/user_service";
import useToast from "utils/toast-hooks";

function Account() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserType>();
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await UserService.getUser();
      setLoading(true);
      const { data, meta } = response;
      if (meta.code != 200) {
        showToast(meta.message, "error");
        return;
      }

      if (!active) return;
      setUser(data);
      setLoading(false);
    };

    fetchData();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onProfileFormSubmit = async (val: any) => {
    const response = await UserService.updateUser({
      name: val.name,
      email: val.email,
      occupation: val.occupation,
    });
    const { meta } = response;
    if (meta.code != 200) {
      showToast(meta.message, "error");
      return;
    }

    showToast(meta.message, "success");
  };
  const onPasswordFormSubmit = async (val: any) => {
    const response = await UserService.updateUserPassword({
      oldPassword: val.oldPassword,
      newPassword: val.newPassword,
      confirmationPassword: val.confirmationPassword,
    });
    const { meta } = response;
    if (meta.code != 200) {
      showToast(meta.message, "error");
      return;
    }
    showToast(meta.message, "success");
  };

  const onAvatarFormSubmit = async (val: FormData) => {
    const response = await UserService.uploadAvatar(val);
    if (response.meta.code == 200) {
      showToast(response.meta.message, "success");
    } else {
      showToast(response.meta.message, "error");
    }
  };
  return (
    <MemberLayout title="Account">
      <Typography variant="h4">Account</Typography>

      {!loading ? (
        <>
          <ProfileForm onSubmit={onProfileFormSubmit} user={user!} />
          <PasswordForm onSubmit={onPasswordFormSubmit} />
          <AvatarForm onSubmit={onAvatarFormSubmit} />
        </>
      ) : (
        <div className="w-full flex justify-center items-center h-24">
          <LoadingIndicator />
        </div>
      )}
    </MemberLayout>
  );
}

export default Account;
