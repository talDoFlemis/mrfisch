import Link from "next/link";
import { CodeInterface } from "../../typings";
import { AiOutlineEye, AiOutlineUserSwitch } from "react-icons/ai";
import cl from "clsx";
import moment from "moment";
import StealCodeButton from "./StealCodeButton";
import Image from "next/image";
import { Highlight } from "react-instantsearch-hooks-web";

interface CodeCardProps extends CodeInterface {
  className?: string;
  hit?: any;
}

const CodeCard = ({
  id,
  user,
  codeTitle,
  language,
  description,
  updatedAt,
  codeBlock,
  className,
  tags,
  hit,
}: CodeCardProps) => {
  return (
    <div className={cl("card", className)}>
      <div className="justify-between card-body text-neutral-content">
        <div>
          <h1 className="text-xl font-bold text-center">
            {hit ? <Highlight attribute="codeTitle" hit={hit} /> : codeTitle}
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
            {codeBlock && (
              <StealCodeButton code={codeBlock} codeId={id} toHide />
            )}
          </div>
          <div className="grid grid-cols-3 place-items-center">
            <div className="flex gap-x-2 items-center self-center place-self-start sm:place-self-auto">
              {user?.image ? (
                <div className="relative w-8 h-8 mask mask-circle shrink-0">
                  <Image
                    src={user.image}
                    alt="avatar"
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              ) : (
                <AiOutlineUserSwitch className="w-4 h-4" />
              )}
              <small className="hidden w-14 text-sm sm:inline-flex truncate">
                {user?.name ?? "anonymous"}
              </small>
            </div>
            {updatedAt ? (
              <p className="text-center">{moment(updatedAt).fromNow()}</p>
            ) : (
              <div></div>
            )}
            <div className="flex gap-x-2 items-center">{language}</div>
          </div>
          {tags && (
            <div className="flex flex-wrap gap-2 justify-center pt-2 item-center">
              {tags?.map((tag) => (
                <div key={tag.id} className="badge badge-secondary shrink-0">
                  {tag.tagName}
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
