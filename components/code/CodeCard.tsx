import Link from "next/link";
import { CodeInterface } from "../../typings";
import { GiDaemonSkull } from "react-icons/gi";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AiOutlineUserSwitch } from "react-icons/ai";
import cl from "clsx";
import moment from "moment";

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
        <div className="text-center text-2xl font-bold">{code_title}</div>
        <div className="text-lg font-bold text-gray-200 line-clamp-2">
          {description}{" "}
          aeouaoeuaoeuaoeuaoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </div>
        <div className="card-actions justify-end space-x-1">
          <Link href={`/codes/${id}`}>
            <a className="btn btn-outline btn-sm hover:border-[#380246] hover:bg-[#380246]">
              View Code
            </a>
          </Link>
          <CopyToClipboard text={code_block}>
            <div className="btn btn-sm border-none bg-[#ed3833] shadow hover:bg-[#ed3833]  hover:text-[#021431] hover:shadow-white">
              <p>Steal Code</p>
              <GiDaemonSkull className="h-6 w-6 shadow-accent transition-colors duration-300 " />
            </div>
          </CopyToClipboard>
        </div>
        <div className="grid grid-cols-3 place-items-center">
          <div className="relative flex items-center gap-x-2">
            <AiOutlineUserSwitch className="h-4 w-4" />
            {user.username}
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
