import Image from "next/image";
import { UsefulLinkModalData, UserInterface } from "typings";
import moment from "moment";
import { AiFillEdit, AiOutlineUserSwitch } from "react-icons/ai";
import { BsFillTrashFill, BsGlobe } from "react-icons/bs";
import { Dispatch, SetStateAction } from "react";

interface UsefulLinkCardInterface {
  id: number;
  title: string;
  link: string;
  user_id: UserInterface;
  setShowEditModal: Dispatch<SetStateAction<UsefulLinkModalData | undefined>>;
  inserted_at: Date;
  updated_at: Date;
}

const UsefulLinkCard = ({
  title,
  id,
  link,
  updated_at,
  user_id,
  setShowEditModal,
}: UsefulLinkCardInterface) => {
  return (
    <div className="w-full transition-transform hover:scale-105 card bg-neutral text-neutral-content">
      <div className="gap-2 p-6 card-body">
        <div className="flex gap-x-2 justify-end items-center">
          <label htmlFor="editmodal">
            <AiFillEdit
              className="w-6 h-6 transition-colors cursor-pointer hover:text-accent"
              onClick={() =>
                setShowEditModal({
                  id,
                  title,
                  link,
                })
              }
            />
          </label>
          <label htmlFor="deletemodal">
            <BsFillTrashFill
              className="w-6 h-6 transition-colors cursor-pointer hover:text-accent"
              onClick={() =>
                setShowEditModal({
                  id,
                  title,
                  link,
                })
              }
            />
          </label>
        </div>
        <h3 className="text-2xl truncate">{title}</h3>
        <a className="gap-x-2 btn btn-accent btn-sm" href={link}>
          Visit the website <BsGlobe className="w-4 h-4" />
        </a>
        <div className="flex justify-evenly items-center">
          <div className="flex gap-x-2 items-center">
            {user_id.avatar_url ? (
              <div className="relative w-10 h-10 mask mask-circle shrink-0">
                <Image
                  src={user_id.avatar_url}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <AiOutlineUserSwitch className="w-6 h-6" />
            )}
            <div className="hidden sm:inline-flex truncate">
              {user_id.username ?? "anonymous"}
            </div>
          </div>
          <div className="text-right">{moment(updated_at).fromNow()}</div>
        </div>
      </div>
    </div>
  );
};

export default UsefulLinkCard;
