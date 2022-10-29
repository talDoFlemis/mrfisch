import Image from "next/image";
import moment from "moment";
import { AiFillEdit, AiOutlineUserSwitch } from "react-icons/ai";
import { BsFillTrashFill, BsGlobe } from "react-icons/bs";
import { LinkInterface } from "typings";
import { Dispatch, SetStateAction } from "react";

interface LinkCardProps extends Omit<LinkInterface, "userId"> {
  setDeleteModal: Dispatch<
    SetStateAction<{ isOpen: boolean; id: string; userId: string }>
  >;
  setEditModal: Dispatch<
    SetStateAction<{ isOpen: boolean; id: string; title: string; url: string }>
  >;
}

const LinkCard = ({
  title,
  id,
  url,
  updated_at,
  user,
  setDeleteModal,
  setEditModal,
}: LinkCardProps) => {
  return (
    <div className="w-full transition-transform hover:scale-105 card bg-neutral text-neutral-content">
      <div className="gap-2 p-6 card-body">
        <div className="flex gap-x-2 justify-end items-center">
          <AiFillEdit
            className="w-6 h-6 transition-colors cursor-pointer hover:text-accent"
            onClick={() =>
              setEditModal({ isOpen: true, id: id, title: title, url: url })
            }
            aria-hidden
          />
          <BsFillTrashFill
            className="w-6 h-6 transition-colors cursor-pointer hover:text-accent"
            onClick={() => setDeleteModal({ isOpen: true, id: id, userId: "" })}
            aria-hidden
          />
        </div>
        <h3 className="text-base font-bold truncate">{title}</h3>
        <a className="gap-x-2 btn btn-accent btn-sm" href={url}>
          Visit the website <BsGlobe className="w-4 h-4" />
        </a>
        <div className="flex justify-evenly items-center text-xs">
          <div className="flex gap-x-2 items-center">
            {user.image ? (
              <div className="relative w-8 h-8 mask mask-circle shrink-0">
                <Image
                  src={user.image}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <AiOutlineUserSwitch className="w-4 h-4" />
            )}
            <div className="hidden sm:inline-flex">
              {user.name ?? "anonymous"}
            </div>
          </div>
          <div className="text-right">{moment(updated_at).fromNow()}</div>
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
