import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import PepeGif from "../../public/img/pepedelete.gif";

interface ModalCommentaryProps {
  deleteModal: { id: string; isOpen: boolean; userId: string };
  setDeleteModal: Dispatch<
    SetStateAction<{
      id: string;
      isOpen: boolean;
      userId: string;
    }>
  >;
  postOperation: (data: { id: string; userId: string }) => void;
}
const DeleteCommentModal = ({
  deleteModal,
  setDeleteModal,
  postOperation,
}: ModalCommentaryProps) => {
  return (
    <Transition appear show={deleteModal.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
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
          <div className="fixed inset-0 bg-black bg-opacity-50" />
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
                  Are you sure U want to delete this comment?
                </Dialog.Title>
                <div className="relative self-center w-32 h-32">
                  <Image
                    src={PepeGif}
                    layout="fill"
                    objectFit="cover"
                    alt="deletegif"
                  />
                </div>
                <div className="modal-action">
                  <button
                    type="button"
                    onClick={() => {
                      postOperation({
                        id: deleteModal.id,
                        userId: deleteModal.userId,
                      });
                      setDeleteModal({ ...deleteModal, isOpen: false });
                    }}
                    className="btn btn-primary"
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteModal({ ...deleteModal, isOpen: false })
                    }
                    className="btn"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DeleteCommentModal;
