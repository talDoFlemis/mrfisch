import Link from "next/link";
import { UserInterface } from "../../typings";
import { AiOutlineEye, AiOutlineUserSwitch } from "react-icons/ai";
import cl from "clsx";
import moment from "moment";
import StealCodeButton from "./StealCodeButton";

interface CodeCardProps {
  id: string;
  user?: UserInterface;
  code_title: string;
  description?: string;
  updated_at: Date;
  code_block: string;
  is_public: boolean;
  className?: string;
  tags?: string[] | null;
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
}: CodeCardProps) => {
  return (
    <div className={cl("card", className)}>
      <div className="card-body justify-between text-neutral-content">
        <div>
          <h1 className="text-center text-2xl font-bold">{code_title}</h1>
          <p className="truncate pb-8 text-lg font-bold text-gray-400">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-y-3">
          <div className="card-actions justify-end space-x-1">
            <Link href={`/codes/${id}`}>
              <a className="btn btn-outline btn-sm gap-1 text-base-content transition-colors hover:border-primary hover:bg-primary-focus hover:text-primary-content">
                <p className="hidden sm:inline-flex">View Code</p>
                <AiOutlineEye className="h-6 w-6" />
              </a>
            </Link>
            <StealCodeButton code={code_block} toHide />
          </div>
          <div className="grid grid-cols-3 place-items-center">
            <div className="relative flex items-center gap-x-2 place-self-start self-center sm:place-self-auto">
              <AiOutlineUserSwitch className="h-4 w-4" />
              <p className="hidden sm:inline-flex">
                {user?.username ?? "anonymous"}
              </p>
            </div>
            <p>{moment(updated_at).fromNow()}</p>
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
              {tags?.map((tag, index) => (
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
