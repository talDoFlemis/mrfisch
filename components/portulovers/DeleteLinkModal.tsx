import { supabase } from "@utils/supabaseClient";
import { toast } from "react-toastify";
import Image from "next/image";

interface EditLinkModalProps {
  id: number;
  title: string;
  getLinks: () => {};
}

const EditLinkModal = ({ id, title, getLinks }: EditLinkModalProps) => {
  const deleteLink = async () => {
    try {
      const { error } = await supabase
        .from("useful_links")
        .delete()
        .match({ id: id });
      if (error) throw error;
      toast.success(`Link ${title} was deleted with success`);
      getLinks();
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to delete the link, ${error.message}`);
    }
  };

  return (
    <>
      <input type="checkbox" id="deletemodal" className="modal-toggle" />
      <label className="modal">
        <div className="modal-box flex flex-col items-center justify-center bg-neutral">
          <h3 className="text-2xl">
            Are you sure U want to delete{" "}
            <span className="text-accent">{title}</span>?
          </h3>
          <div className="relative h-32 w-32">
            <Image
              src="/img/pepedelete.gif"
              layout="fill"
              objectFit="cover"
              alt="deletegif"
            />
          </div>
          <div className="modal-action self-end">
            <div className="btn btn-accent" onClick={() => deleteLink()}>
              Delete
            </div>
            <label className="btn btn-secondary" htmlFor="deletemodal">
              Close
            </label>
          </div>
        </div>
      </label>
    </>
  );
};

export default EditLinkModal;
