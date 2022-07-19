import Link from "next/link";
import { CodeInterface } from "../../typings";
import { GiDaemonSkull } from "react-icons/gi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineUserSwitch } from "react-icons/ai";
import cl from "clsx";
import moment from "moment";
import StealCodeButton from "./StealCodeButton";

const CodeCard = ({
  id,
  user,
  code_title,
  description,
  inserted_at,
  code_block,
  is_public,
}: CodeInterface) => {
  return (
    <div className="card h-56 bg-white/10">
      <div className="card-body justify-between text-white">
        <h1 className="text-center text-2xl font-bold">{code_title}</h1>
        <p className="line-clamp-2 text-ellipsis text-lg font-bold text-gray-200">
          {description}
        </p>

        <div className="card-actions justify-end space-x-1">
          <Link href={`/codes/${id}`}>
            <a className="btn btn-outline btn-sm text-white hover:border-[#380246] hover:bg-[#380246] hover:text-white">
              View Code
            </a>
          </Link>
          <StealCodeButton code={code_block} />
        </div>
        <div className="grid grid-cols-3 place-items-center">
          <div className="relative flex items-center gap-x-2">
            <AiOutlineUserSwitch className="h-4 w-4" />
            <p className="hidden sm:inline-flex">
              {user?.username ?? "anonymous"}
            </p>
          </div>
          <p>{moment(inserted_at).fromNow()}</p>
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
      </div>
    </div>
  );
};

export default CodeCard;
