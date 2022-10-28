import AutoSizeTextarea from "@components/layout/AutoSizeTextarea";
import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";

interface ModalCommentaryProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  postOperation: (data: string) => void;
}
const AddCommentModal = ({
  isOpen,
  setIsOpen,
  postOperation,
}: ModalCommentaryProps) => {
  const [postData, setPostData] = useState("");
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
              <Dialog.Panel className="flex overflow-hidden flex-col gap-y-4 p-6 w-full max-w-md text-left align-middle rounded-2xl shadow-xl transition-all transform bg-base-100">
                <Dialog.Title as="h3" className="text-lg text-neutral-content">
                  Creating a new comment
                </Dialog.Title>
                <div className="mt-2">
                  <AutoSizeTextarea
                    setText={setPostData}
                    text={postData}
                    id="text-data"
                    error
                    className="bg-neutral text-neutral-content"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    postOperation(postData);
                    setPostData("");
                  }}
                  className="btn btn-primary"
                >
                  Create
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddCommentModal;
