import { CommentInterface } from "typings";
import Image from "next/image";
import { AiOutlineUserSwitch } from "react-icons/ai";
import moment from "moment";
import { Session } from "next-auth";
import { MdEdit } from "react-icons/md";
import { useState } from "react";
import ModalCommentary from "./ModalCommentary";

interface CommentaryListProps {
  comments: CommentInterface[];
  user?: Session["user"];
}

const CommentaryList = ({ comments, user }: CommentaryListProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const updateComment = (data: string) => {};
  return (
    <div className="flex flex-col gap-y-4 my-4 w-full">
      <ModalCommentary
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        postOperation={updateComment}
      />
      {comments.length !== 0 &&
        comments?.map((com) => (
          <div key={com.id} className="card">
            <div className="card-body bg-neutral text-neutral-content">
              {user?.id !== com.user.id && (
                <MdEdit
                  className="self-end w-4 h-4 cursor-pointer hover:text-accent"
                  aria-hidden
                  onClick={() => setIsOpen(true)}
                />
              )}
              <p>{com.block}</p>
              <div className="flex justify-between items-center text-xs text-primary">
                <div className="text-center">
                  {moment(com.updated_at).fromNow()}
                </div>{" "}
                <div className="flex gap-x-4 items-center">
                  {com.user.image ? (
                    <div className="relative w-6 h-6 mask mask-circle">
                      <Image src={com.user?.image} alt={com.user?.name} />
                    </div>
                  ) : (
                    <AiOutlineUserSwitch className="w-4 h-4" aria-hidden />
                  )}
                  {com.user.name}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CommentaryList;
