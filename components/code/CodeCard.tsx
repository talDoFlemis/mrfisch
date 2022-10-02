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
      <div className="card-body justify-between text-neutral-content">
        <div>
          <h1 className="text-center text-2xl font-bold">
            {hit ? <Highlight attribute="code_title" hit={hit} /> : code_title}
          </h1>
          <p className="truncate pb-8 text-lg font-bold text-gray-400">
            {hit ? (
              <Highlight attribute="description" hit={hit} />
            ) : (
              description
            )}
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="card-actions justify-end space-x-1">
            <Link href={`/codes/${id}`}>
              <a className="btn btn-outline btn-sm gap-1 text-neutral-content transition-colors hover:border-primary hover:bg-primary-focus hover:text-primary-content">
                <p className="hidden sm:inline-flex">View Code</p>
                <AiOutlineEye className="h-6 w-6" />
              </a>
            </Link>
            {code_block && <StealCodeButton code={code_block} toHide />}
          </div>
          <div className="grid grid-cols-3 place-items-center">
            <div className="flex items-center gap-x-2 place-self-start self-center sm:place-self-auto">
              {user?.avatar_url ? (
                <div className="mask mask-circle relative h-8 w-8 shrink-0">
                  <Image
                    src={user.avatar_url}
                    alt="avatar"
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              ) : (
                <AiOutlineUserSwitch className="h-4 w-4" />
              )}
              <p className="hidden w-20 overflow-hidden text-ellipsis whitespace-nowrap sm:inline-flex">
                {user?.username ?? "anonymous"}
              </p>
            </div>
            {updated_at ? <p>{moment(updated_at).fromNow()}</p> : <div></div>}
            <div className="flex items-center gap-x-2">
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
            <div className="item-center flex flex-wrap justify-center gap-2 pt-2">
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
