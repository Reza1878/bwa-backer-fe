import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Button from "./Button";
import Typography from "./Typography";

interface ConfirmationModalProps {
  show: boolean;
  onClose: (isConfirmed: boolean) => void;
  resourceName: string;
}

function ConfirmationModal(props: Partial<ConfirmationModalProps>) {
  const { show, onClose = (val) => {}, resourceName = "resource" } = props;
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog className="relative z-50" as="div" onClose={() => onClose(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
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
                <Typography variant="h5" className="text-center mb-2">
                  Are you sure to delete this {resourceName}?
                </Typography>

                <div className="flex justify-end">
                  <Button variant="danger" onClick={() => onClose(true)}>
                    Yes, delete it!
                  </Button>
                  <Button
                    className="ml-2 text-black border-gray-200 hover:bg-gray-200"
                    variant="transparent"
                    onClick={() => onClose(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ConfirmationModal;
