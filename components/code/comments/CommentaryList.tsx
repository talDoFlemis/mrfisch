import Image from "next/image";
import { AiOutlineDelete, AiOutlineUserSwitch } from "react-icons/ai";
import moment from "moment";
import { Session } from "next-auth";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import YuiGif from "../../../public/img/yui.gif";
import { IoAddOutline } from "react-icons/io5";
import AddCommentModal from "./AddCommentModal";
import EditCommentModal from "./EditCommentModal";
import { useRouter } from "next/router";
import { useQuery } from "hooks/useQuery";
import { CommentInterface } from "typings";
import { useSWRConfig } from "swr";
import LoadingComponent from "@components/layout/LoadingComponent";
import DeleteModal from "@components/layout/DeleteModal";

interface CommentaryListProps {
  user?: Session["user"];
}

const CommentaryList = ({ user }: CommentaryListProps) => {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const [editModal, setEditModal] = useState({
    id: "",
    userId: "",
    block: "",
    isOpen: false,
  });
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    userId: "",
    isOpen: false,
  });

  const { mutate } = useSWRConfig();
  const { data: comments, error } = useQuery<CommentInterface[]>(
    router.query.id ? `/api/codes/${router.query.id}/comments` : null,
    false
  );

  if (error) {
    toast.error(`Unable to fetch comments, ${error}`);
  }

  const addComment = async (data: string) => {
    const postData = {
      block: data,
    };
    try {
      const resp = await axios.post(
        `/api/codes/${router.query.id}/comments`,
        postData
      );
      mutate(
        `/api/codes/${router.query.id}/comments`,
        async (comments: CommentInterface[]) => {
          comments.unshift(resp.data);
          return comments;
        },
        { revalidate: false }
      );
      toast.success("Comment created with success");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setAddOpen(false);
    }
  };

  const editComment = async (data: {
    id: string;
    block: string;
    userId: string;
  }) => {
    try {
      const resp = await axios.patch(
        `/api/codes/${router.query.id}/comments`,
        data
      );
      mutate(
        `/api/codes/${router.query.id}/comments`,
        async (comments: CommentInterface[]) => {
          const filteredComments = comments.filter(
            (comm) => comm.id !== resp.data.id
          );
          filteredComments.unshift(resp.data);
          return filteredComments;
        },
        { revalidate: false }
      );

      toast.success("Comment edited with success");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setEditModal({ ...editModal, isOpen: false });
    }
  };

  const deleteComment = async (data: { id: string; userId: string }) => {
    try {
      await axios.delete(`/api/codes/${router.query.id}/comments`, {
        data: data,
      });
      mutate(
        `/api/codes/${router.query.id}/comments`,
        async (comments: CommentInterface[]) => {
          const filteredComments = comments.filter(
            (comm) => comm.id !== data.id
          );
          return filteredComments;
        },
        { revalidate: false }
      );

      toast.success("Comment deleted with success");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setDeleteModal({ ...deleteModal, isOpen: false });
    }
  };
  return (
    <div className="flex flex-col gap-y-4 my-4 w-full">
      <AddCommentModal
        isOpen={addOpen}
        setIsOpen={setAddOpen}
        postOperation={addComment}
      />
      <EditCommentModal
        editModal={editModal}
        postOperation={editComment}
        setEditModal={setEditModal}
      />
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        postOperation={deleteComment}
        title="Are you sure U want to delete this comment"
      />
      <div className="flex justify-between items-center text-4xl font-geo">
        <h1>Comments</h1>
        {user?.id ? (
          <button
            className="text-base btn btn-primary btn-sm"
            onClick={() => setAddOpen(true)}
          >
            <IoAddOutline className="w-6 h-6" aria-hidden />
            Add
          </button>
        ) : (
          <button className="text-base btn btn-sm" disabled>
            <IoAddOutline className="w-6 h-6" aria-hidden />
            Add
          </button>
        )}
      </div>
      {!comments && !error ? (
        <div className="flex justify-center items-center h-3/5">
          <LoadingComponent className="w-16 h-16 text-accent" />
        </div>
      ) : comments?.length !== 0 ? (
        comments?.map((com) => (
          <div key={com.id} className="card">
            <div className="card-body bg-neutral text-neutral-content">
              {user?.id === com.user.id && (
                <div className="flex gap-x-2 justify-end items-center">
                  <MdEdit
                    className="w-4 h-4 cursor-pointer hover:text-accent"
                    aria-hidden
                    onClick={() => {
                      setEditModal({
                        id: com.id,
                        userId: com.user?.id as string,
                        isOpen: true,
                        block: com.block,
                      });
                    }}
                  />
                  <AiOutlineDelete
                    className="w-4 h-4 cursor-pointer hover:text-accent"
                    aria-hidden
                    onClick={() =>
                      setDeleteModal({
                        id: com.id,
                        userId: com.user?.id as string,
                        isOpen: true,
                      })
                    }
                  />
                </div>
              )}
              <p>{com.block}</p>
              <div className="flex justify-between items-center text-xs text-primary">
                <div className="text-center">
                  {moment(com.updated_at).fromNow()}
                </div>{" "}
                <div className="flex gap-x-4 items-center">
                  {com.user.image ? (
                    <div className="relative w-6 h-6 mask mask-circle">
                      <Image
                        src={com.user.image}
                        alt={com.user.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  ) : (
                    <AiOutlineUserSwitch className="w-4 h-4" aria-hidden />
                  )}
                  {com.user.name}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-col gap-y-2 justify-center items-center text-center">
          <h3 className="mx-auto text-2xl font-geo">
            No comment found for this code
          </h3>
          <div className="relative w-52 h-40">
            <Image
              src={YuiGif}
              layout="fill"
              objectFit="contain"
              alt="yui gif"
            />
          </div>
          <p className="mx-auto text-xl font-geo">
            Click on the ADD comment button to add a new comment
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentaryList;
