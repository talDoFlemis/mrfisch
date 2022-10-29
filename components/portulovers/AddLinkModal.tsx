import { yupResolver } from "@hookform/resolvers/yup";
import { Dispatch, Fragment, SetStateAction } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Dialog, Transition } from "@headlessui/react";

interface EditLinkModalProps {
  addModal: boolean;
  setAddModal: Dispatch<SetStateAction<boolean>>;
  postOperation: (data: { title: string; url: string }) => void;
}

const schema = yup
  .object({
    title: yup.string().required("Please, input a title"),
    url: yup.string().required("Please, input a link"),
    id: yup.string(),
  })
  .required();

const AddLinkModal = ({
  addModal,
  setAddModal,
  postOperation,
}: EditLinkModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ url: string; title: string }>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const justClearMTFK = (data: { title: string; url: string }) => {
    postOperation(data);
    reset();
  };

  return (
    <Transition appear show={addModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setAddModal(false)}
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
                <h3 className="text-2xl font-geo">Creating a new link</h3>
                <form
                  onSubmit={handleSubmit(justClearMTFK)}
                  className="gap-y-2 form-control"
                >
                  <div className="flex justify-start items-center pb-2 text-xl font-bold font-geo">
                    Title{" "}
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
                      onClick={() => {
                        setAddModal(false);
                        reset();
                      }}
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

export default AddLinkModal;
