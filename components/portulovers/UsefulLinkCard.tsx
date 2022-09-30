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
    <div className="card w-full bg-neutral text-neutral-content transition-transform hover:scale-105">
      <div className="card-body gap-2 p-6">
        <div className="flex items-center justify-end gap-x-2">
          <label htmlFor="editmodal">
            <AiFillEdit
              className="h-6 w-6 cursor-pointer transition-colors hover:text-accent"
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
              className="h-6 w-6 cursor-pointer transition-colors hover:text-accent"
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
        <h3 className="truncate text-2xl">{title}</h3>
        <a className="btn btn-accent btn-sm gap-x-2" href={link}>
          Visit the website <BsGlobe className="h-4 w-4" />
        </a>
        <div className="flex items-center justify-evenly">
          <div className="flex items-center gap-x-2">
            {user_id.avatar_url ? (
              <div className="mask mask-circle relative h-10 w-10 shrink-0">
                <Image
                  src={user_id.avatar_url}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ) : (
              <AiOutlineUserSwitch className="h-6 w-6" />
            )}
            <div className="hidden truncate sm:inline-flex">
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
