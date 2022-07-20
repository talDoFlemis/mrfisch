import LoadingComponent from "@components/layout/LoadingComponent";
import axios from "axios";
import { NextRouter } from "next/router";
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";

interface DeleteCodeButtonProps {
  id: string;
  disabled?: boolean;
  router: NextRouter;
}

const DeleteCodeButton = ({
  id,
  disabled = false,
  router,
}: DeleteCodeButtonProps) => {
  const [isPosting, setIsPosting] = useState(false);

  const deleteCode = async (id: string) => {
    setIsPosting(true);
    try {
      await axios.delete(`/api/codes/${id}`);
      router.push("/codes");
    } catch (error) {
      console.log(error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <button
      className="btn btn-secondary btn-sm border-none transition-colors hover:text-white"
      onClick={() => deleteCode(id)}
      disabled={disabled}
    >
      {isPosting ? (
        <>
          <p>Deleting</p>
          <LoadingComponent className="h-6 w-6 " />
        </>
      ) : (
        <>
          <p>Delete Code</p>
          <AiOutlineDelete className="h-6 w-6 shadow-accent" />
        </>
      )}
    </button>
  );
};

export default DeleteCodeButton;
