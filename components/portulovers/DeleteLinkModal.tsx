import Image from "next/image";

interface DeleteLinkModalProps {
  title: string;
  deleteOP: () => {};
}

const DeleteLinkModal = ({ title, deleteOP }: DeleteLinkModalProps) => {
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
