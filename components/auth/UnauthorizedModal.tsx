import { Dialog, Transition } from "@headlessui/react";
import { Button, Typography } from "components/common";
import { AuthContext } from "context/authContext";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { Fragment, useContext } from "react";

function UnauthorizedModal() {
  const { openUnauthorizedModal, setOpenUnauthorizedModal } =
    useContext(AuthContext);
  const router = useRouter();
  const closeModal = () => {
    setOpenUnauthorizedModal(false);
    Cookies.remove("token");
    Cookies.remove("refresh_token");
    router.push("/sign-in");
  };
  return (
    <Transition appear show={openUnauthorizedModal} as={Fragment}>
      <Dialog
        className="relative z-50"
        open={openUnauthorizedModal}
        as="div"
        onClose={closeModal}
      >
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-70"
            aria-hidden="true"
          />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="bg-white w-full max-w-md p-4 rounded-lg transform transition-all">
                <Typography variant="h4" className="font-medium">
                  Unauthorized!
                </Typography>
                <Typography className="text-gray-500 my-4">
                  You are not authorized to perform this action. Please sign in
                  first.
                </Typography>

                <Button onClick={closeModal} block>
                  Sign In
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default UnauthorizedModal;
