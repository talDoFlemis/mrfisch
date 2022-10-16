import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { UsefulLinkModalData } from "typings";
import { toast } from "react-toastify";
import { supabase } from "@utils/supabaseClient";

const schema = yup
  .object({
    title: yup.string().required("Please, input a title"),
    link: yup.string().required("Please, input a link"),
  })
  .required();

interface AddLinkModalProps {
  user_id: string;
  getLinks: () => void;
}

const AddLinkModal = ({ user_id, getLinks }: AddLinkModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsefulLinkModalData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
  });

  const createLink = async (data: UsefulLinkModalData) => {
    const updatedData = { ...data, user_id: user_id };
    console.log(updatedData);
    try {
      const { error } = await supabase.from("useful_links").insert(updatedData);
      toast.success(`Link ${updatedData.title} created with success`);
      getLinks();

      if (error) throw error;
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to update the link, ${error.message}`);
    }
  };

  return (
    <>
      <input type="checkbox" id="addmodal" className="modal-toggle" />
      <label htmlFor="addmodal" className="modal">
        <div className="flex flex-col justify-center items-center modal-box bg-neutral">
          <h3 className="w-full text-2xl">Creating new link</h3>
          <form
            onSubmit={handleSubmit(createLink)}
            className="w-full form-control"
          >
            <div className="flex flex-col justify-self-start">
              <div>
                <label className="justify-start text-xl font-bold sm:text-2xl label">
                  Title{" "}
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
              <label className="btn btn-secondary" htmlFor="addmodal">
                Close
              </label>
            </div>
          </form>
        </div>
      </label>
    </>
  );
};

export default AddLinkModal;
