import { Dialog, Transition } from "@headlessui/react";
import { useQuery } from "hooks/useQuery";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { CodeInterface } from "typings";

interface ModalCommentaryProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  postOperation: (data: CodeInterface[]) => void;
  userId: string;
  parentId: string;
  previousAssociated?: CodeInterface[];
}
const ChangeLinkedCodesModal = ({
  isOpen,
  setIsOpen,
  postOperation,
  userId,
  parentId,
  previousAssociated,
}: ModalCommentaryProps) => {
  const { data: codes, error } = useQuery<CodeInterface[]>(
    `/api/user/${userId}/codes`,
    false
  );
  const [selected, setSelected] = useState(previousAssociated);
  const codesWithoutParent = codes?.filter((code) => code.id !== parentId);

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
          afterLeave={() => setSelected(previousAssociated)}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="overflow-y-auto fixed inset-0">
          <div className="flex justify-center items-center p-4 h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex overflow-hidden flex-col gap-y-4 p-6 w-full max-w-md h-3/4 text-left align-middle rounded-2xl shadow-xl transition-all transform text-base-content bg-base-100">
                <Dialog.Title
                  as="h3"
                  className="text-3xl text-neutral-content font-geo"
                >
                  Changing associated codes
                </Dialog.Title>
                {!codes && !error ? (
                  <div className="animate-pulse">
                    <div className="card">
                      <div className="h-12 card-body bg-neutral">
                        <div className="h-2 bg-neutral-content"></div>
                      </div>
                    </div>
                  </div>
                ) : codesWithoutParent?.length !== 0 ? (
                  <div className="flex overflow-y-scroll flex-col gap-y-2 h-3/4">
                    {codesWithoutParent?.map((code) => (
                      <div
                        key={code.id}
                        className="mr-2 card group shrink-0"
                        onClick={() =>
                          selected?.find((ent) => ent.id === code.id)
                            ? setSelected(
                                selected?.filter((ent) => ent.id !== code.id)
                              )
                            : selected
                            ? setSelected([...selected, code])
                            : setSelected([code])
                        }
                      >
                        <div className="gap-1 p-4 cursor-pointer card-body bg-neutral font-geo">
                          <div className="flex justify-between items-center">
                            <h1 className="text-lg transition-colors truncate group-hover:text-accent">
                              {code.code_title}
                            </h1>
                            {selected?.find((ent) => ent.id === code.id) && (
                              <AiOutlineCheck
                                aria-hidden
                                className="w-6 h-6 transition-colors text-success group-hover:text-neutral-content"
                              />
                            )}
                          </div>
                          <p className="text-sm font-light truncate font-inter">
                            {code.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>no code to associate</div>
                )}
                <button
                  type="button"
                  onClick={() => postOperation(selected ?? [])}
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

export default ChangeLinkedCodesModal;
