import Link from "next/link";
import { UserInterface } from "../../typings";
import { AiOutlineEye, AiOutlineUserSwitch } from "react-icons/ai";
import cl from "clsx";
import moment from "moment";
import StealCodeButton from "./StealCodeButton";
import Image from "next/image";
import { Highlight } from "react-instantsearch-hooks-web";

interface CodeCardProps {
  id: string;
  user?: UserInterface;
  code_title: string;
  description?: string;
  updated_at?: Date;
  code_block?: string;
  is_public: boolean;
  className?: string;
  tags?: string[] | null;
  hit?: any;
}
const CodeCard = ({
  id,
  user,
  code_title,
  description,
  updated_at,
  code_block,
  is_public,
  className,
  tags,
  hit,
}: CodeCardProps) => {
  return (
    <div className={cl("card", className)}>
      <div className="justify-between card-body text-neutral-content">
        <div>
          <h1 className="text-2xl font-bold text-center">
            {hit ? <Highlight attribute="code_title" hit={hit} /> : code_title}
          </h1>
          <p className="pb-8 text-lg font-bold text-gray-400 truncate">
            {hit ? (
              <Highlight attribute="description" hit={hit} />
            ) : (
              description
            )}
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="justify-end space-x-1 card-actions">
            <Link href={`/codes/${id}`}>
              <a className="gap-1 transition-colors btn btn-outline btn-sm text-neutral-content hover:border-primary hover:bg-primary-focus hover:text-primary-content">
                <p className="hidden sm:inline-flex">View Code</p>
                <AiOutlineEye className="w-6 h-6" />
              </a>
            </Link>
            {code_block && <StealCodeButton code={code_block} toHide />}
          </div>
          <div className="grid grid-cols-3 place-items-center">
            <div className="flex gap-x-2 items-center self-center place-self-start sm:place-self-auto">
              {user?.avatar_url ? (
                <div className="relative w-8 h-8 mask mask-circle shrink-0">
                  <Image
                    src={user.avatar_url}
                    alt="avatar"
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              ) : (
                <AiOutlineUserSwitch className="w-4 h-4" />
              )}
              <p className="hidden overflow-hidden w-20 whitespace-nowrap sm:inline-flex text-ellipsis">
                {user?.username ?? "anonymous"}
              </p>
            </div>
            {updated_at ? <p>{moment(updated_at).fromNow()}</p> : <div></div>}
            <div className="flex gap-x-2 items-center">
              <div
                className={cl(
                  "h-2 w-2 rounded-full",
                  is_public ? "bg-green-500" : "bg-red-500"
                )}
              ></div>
              {is_public ? "public" : "private"}
            </div>
          </div>
          {tags && (
            <div className="flex flex-wrap gap-2 justify-center pt-2 item-center">
              {tags?.map((tag, index: number) => (
                <div key={index} className="badge badge-secondary shrink-0">
                  {tag}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeCard;
