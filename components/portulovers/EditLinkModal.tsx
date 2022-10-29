import { Dispatch, Fragment, SetStateAction, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { BiReset } from "react-icons/bi";
import { Dialog, Transition } from "@headlessui/react";
import { LinkInterface } from "typings";

interface EditLinkModalProps
  extends Omit<
    LinkInterface,
    "user" | "userId" | "inserted_at" | "updated_at"
  > {
  editModal: { isOpen: boolean; id: string; title: string; url: string };
  setEditModal: Dispatch<
    SetStateAction<{ isOpen: boolean; id: string; title: string; url: string }>
  >;
  postOperation: (data: { id: string; title: string; url: string }) => void;
}

const schema = yup
  .object({
    title: yup.string().required("Please, input a title"),
    url: yup.string().required("Please, input a link"),
    id: yup.string(),
  })
  .required();

const EditLinkModal = ({
  id,
  url,
  title,
  editModal,
  setEditModal,
  postOperation,
}: EditLinkModalProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm<{ id: string; url: string; title: string }>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    const data = { title: title, url: url, id: id };
    reset(data);
  }, [title]);

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
              <Dialog.Panel className="flex overflow-hidden flex-col gap-y-6 p-6 w-full max-w-md text-left align-middle rounded-2xl shadow-xl transition-all transform bg-base-100 text-neutral-content">
                <h3 className="text-2xl font-geo">
                  Editing Link <span className="text-accent">{title}</span>
                </h3>
                <form
                  onSubmit={handleSubmit(postOperation)}
                  className="gap-y-2 form-control"
                >
                  <div className="flex justify-start items-center pb-2 text-xl font-bold font-geo">
                    Title{" "}
                    <BiReset
                      className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
                      onClick={() => resetField("title")}
                    />
                  </div>
                  <input
                    placeholder="Enter your title"
                    {...register("title")}
                    className="input input-bordered input-primary bg-neutral"
                    aria-invalid={errors.title ? true : false}
                    aria-errormessage="title-error-message"
                  />
                  {errors.title && (
                    <span
                      className="py-2 text-xs font-bold text-error"
                      id="title-error-message"
                    >
                      {errors.title?.message}
                    </span>
                  )}
                  <div className="flex justify-start items-center pb-2 text-xl font-bold font-geo">
                    Link{" "}
                    <BiReset
                      className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
                      onClick={() => resetField("url")}
                    />
                  </div>
                  <input
                    placeholder="Enter your link"
                    {...register("url")}
                    className="input input-bordered input-primary bg-neutral"
                    aria-invalid={errors.url ? true : false}
                    aria-errormessage="link-error-message"
                  />{" "}
                  {errors.url && (
                    <span
                      className="text-xs font-bold text-error"
                      id="link-error-message"
                    >
                      {errors.url?.message}
                    </span>
                  )}
                  <div className="modal-action">
                    <button className="btn btn-primary">Submit</button>
                    <div
                      className="btn"
                      onClick={() =>
                        setEditModal({ ...editModal, isOpen: false })
                      }
                    >
                      Close
                    </div>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditLinkModal;
