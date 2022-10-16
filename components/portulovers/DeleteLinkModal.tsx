import Image from "next/image";

interface DeleteLinkModalProps {
  title: string;
  deleteOP: () => void;
}

const DeleteLinkModal = ({ title, deleteOP }: DeleteLinkModalProps) => {
  return (
    <>
      <input type="checkbox" id="deletemodal" className="modal-toggle" />
      <label className="modal">
        <div className="flex flex-col justify-center items-center modal-box bg-neutral">
          <h3 className="text-2xl">
            Are you sure U want to delete{" "}
            <span className="text-accent">{title}</span>?
          </h3>
          <div className="relative w-32 h-32">
            <Image
              src="/img/pepedelete.gif"
              layout="fill"
              objectFit="cover"
              alt="deletegif"
            />
          </div>
          <div className="self-end modal-action">
            <div className="btn btn-accent" onClick={() => deleteOP()}>
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

export default DeleteLinkModal;
