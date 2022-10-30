import AutoSizeTextarea from "@components/layout/AutoSizeTextarea";
import { Dialog, Transition } from "@headlessui/react";
import React, {
  Dispatch,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface ModalCommentaryProps {
  editModal: { id: string; isOpen: boolean; userId: string; block: string };
  setEditModal: Dispatch<
    SetStateAction<{
      id: string;
      isOpen: boolean;
      userId: string;
      block: string;
    }>
  >;
  postOperation: (data: { id: string; block: string; userId: string }) => void;
}
const EditCommentModal = ({
  editModal,
  setEditModal,
  postOperation,
}: ModalCommentaryProps) => {
  const [postData, setPostData] = useState("");

  useEffect(() => {
    if (editModal.block) setPostData(editModal.block);
  }, [editModal.block]);

  return (
    <Transition appear show={editModal.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setEditModal({ ...editModal, isOpen: false })}
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
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-geo text-neutral-content"
                >
                  Editing the comment
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
                    postOperation({
                      id: editModal.id,
                      block: postData,
                      userId: editModal.userId,
                    });
                    setEditModal({ ...editModal, isOpen: false });
                  }}
                  className="btn btn-primary"
                >
                  Update
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditCommentModal;
