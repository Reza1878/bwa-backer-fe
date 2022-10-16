import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { PasswordForm, ProfileForm } from "components/account";
import AvatarForm from "components/account/AvatarForm";
import { MemberLayout } from "components/layouts";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { UserType } from "service/types";
import UserService from "service/user_service";
import { useSendAndHandleInvalidToken } from "utils/hooks";
import useToast from "utils/toast-hooks";

function AccountVar2() {
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState(false);
  const sendAndHandleInvalidToken = useSendAndHandleInvalidToken();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await sendAndHandleInvalidToken(UserService.getUser);

      const { data, meta } = response;
      if (meta.code != 200) {
        showToast(meta.message, "error");
        return;
      }

      if (!active) return;
      setUser(data);
    };

    fetchData();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const tabs = useMemo(() => {
    return ["Profile", "Password", "Avatar"];
  }, []);
  const { showToast, updateToast, toastLoading } = useToast();
  const onProfileFormSubmit = async (val: any) => {
    const response = await sendAndHandleInvalidToken(() =>
      UserService.updateUser({
        name: val.name,
        email: val.email,
        occupation: val.occupation,
      })
    );
    const { meta } = response;
    if (meta.code != 200) {
      showToast(meta.message, "error");
      return;
    }

    showToast(meta.message, "success");
  };
  const onPasswordFormSubmit = async (val: any) => {
    const response = await sendAndHandleInvalidToken(() =>
      UserService.updateUserPassword({
        oldPassword: val.oldPassword,
        newPassword: val.newPassword,
        confirmationPassword: val.confirmationPassword,
      })
    );
    const { meta } = response;
    if (meta.code != 200) {
      showToast(meta.message, "error");
      return;
    }
    showToast(meta.message, "success");
  };
  const onAvatarFormSubmit = async (val: FormData) => {
    setLoading(true);
    toastLoading();
    const response = await sendAndHandleInvalidToken(() =>
      UserService.uploadAvatar(val)
    );
    if (response.meta.code == 200) {
      updateToast(response.meta.message, "success");
    } else {
      updateToast(response.meta.message, "error");
    }
    setLoading(false);
  };
  return (
    <MemberLayout title="Account">
      <Tab.Group>
        <Tab.List className="bg-white p-3 flex rounded-lg">
          {tabs.map((item) => (
            <Tab key={item} as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx("flex-1 focus:outline-none p-1 rounded-md", [
                    selected && "bg-success text-white",
                  ])}
                >
                  {item}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <ProfileForm
              key={user?.id}
              onSubmit={onProfileFormSubmit}
              user={user!}
            />
          </Tab.Panel>
          <Tab.Panel>
            <PasswordForm onSubmit={onPasswordFormSubmit} />
          </Tab.Panel>
          <Tab.Panel>
            <AvatarForm onSubmit={onAvatarFormSubmit} disabled={loading} />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </MemberLayout>
  );
}

export default AccountVar2;
