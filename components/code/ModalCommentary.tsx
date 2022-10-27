import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";

interface ModalCommentaryProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  postOperation: (data: string) => void;
  initialData?: string;
}
const ModalCommentary = ({
  isOpen,
  setIsOpen,
  postOperation,
  initialData,
}: ModalCommentaryProps) => {
  const [postData, setPostData] = useState(initialData ?? "");
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="overflow-y-auto fixed inset-0">
          <div className="flex justify-center items-center p-4 min-h-full text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="overflow-hidden p-6 w-full max-w-md text-left align-middle rounded-2xl shadow-xl transition-all transform bg-base-100">
                <Dialog.Title as="h3" className="text-lg text-neutral-content">
                  Editing comment
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm font-light text-neutral-content">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </div>

                <div className="self-end mt-4">
                  <button onClick={() => postOperation(postData)}></button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ModalCommentary;
