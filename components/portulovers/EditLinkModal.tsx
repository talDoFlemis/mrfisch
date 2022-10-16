import { useEffect } from "react";
import { UsefulLinkModalData } from "typings";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { BiReset } from "react-icons/bi";
import { supabase } from "@utils/supabaseClient";
import { toast } from "react-toastify";

interface EditLinkModalProps {
  id: number;
  link: string;
  title: string;
  user_id: string;
  getLinks: () => void;
}

const schema = yup
  .object({
    title: yup.string().required("Please, input a title"),
    link: yup.string().required("Please, input a link"),
    user_id: yup.string(),
  })
  .required();

const EditLinkModal = ({
  id,
  link,
  title,
  user_id,
  getLinks,
}: EditLinkModalProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm<UsefulLinkModalData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  useEffect(() => {
    const data = { title: title, link: link };
    reset(data);
  }, [title]);

  const updateLink = async (data: any) => {
    const updatedData = { ...data, user_id: user_id };
    try {
      const { error } = await supabase
        .from("useful_links")
        .update(updatedData)
        .match({ id: id });
      if (error) throw error;
      toast.success(`Link ${data.title} was updated with success`);
      getLinks();
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to update the link, ${error.message}`);
    }
  };

  return (
    <>
      <input type="checkbox" id="editmodal" className="modal-toggle" />
      <label className="modal">
        <div className="modal-box bg-neutral">
          <h3 className="text-2xl">
            Editing Link <span className="text-accent">{title}</span>
          </h3>
          <form onSubmit={handleSubmit(updateLink)}>
            <div className="flex flex-col justify-self-start">
              <div>
                <label className="justify-start text-xl font-bold sm:text-2xl label">
                  Title{" "}
                  <BiReset
                    className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
                    onClick={() => resetField("title")}
                  />
                </label>
                {errors.title && (
                  <label className="pt-0 font-bold label text-error">
                    {errors.title?.message}
                  </label>
                )}
                <label className="pt-0 label">
                  <span className="label-text">Add the link title</span>
                </label>{" "}
              </div>
              <input
                placeholder="Enter your title"
                {...register("title")}
                className="input input-bordered input-primary bg-neutral"
              />{" "}
              <div>
                <label className="justify-start text-xl font-bold sm:text-2xl label">
                  Link{" "}
                  <BiReset
                    className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
                    onClick={() => resetField("link")}
                  />
                </label>
                {errors.link && (
                  <label className="pt-0 font-bold label text-error">
                    {errors.link?.message}
                  </label>
                )}
                <label className="pt-0 label">
                  <span className="label-text">Enter the link</span>
                </label>{" "}
              </div>
              <input
                placeholder="Enter your link"
                {...register("link")}
                className="input input-bordered input-primary bg-neutral"
              />{" "}
            </div>
            <div className="modal-action">
              <button className="btn btn-accent">Submit</button>
              <label className="btn btn-secondary" htmlFor="editmodal">
                Close
              </label>
            </div>
          </form>
        </div>
      </label>
    </>
  );
};

export default EditLinkModal;
