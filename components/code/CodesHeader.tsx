import { AiOutlineExclamationCircle, AiOutlineUser } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import HeaderDropdown from "./HeaderDropdown";
import { Session } from "next-auth";

const CodesHeader = ({ user }: { user?: Session["user"] }) => {
  return (
    <header className="sticky top-0 z-10 justify-end p-4 bg-opacity-40 navbar font-raleway backdrop-blur-sm">
      {user ? (
        <div className="flex gap-2 justify-between items-center w-full sm:gap-6 sm:justify-end">
          {user.isNew && (
            <Link href="/profile">
              <a className="hidden p-3 transition-transform sm:inline-flex sm:text-xs hover:scale-105 badge badge-warning text-warning-content">
                Your profile need to be updated{" "}
                <AiOutlineExclamationCircle className="ml-2 w-5 h-5 text-warning-content" />
              </a>
            </Link>
          )}
          <HeaderDropdown user={user} />
          <label
            className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </label>
        </div>
      ) : (
        <div className="flex justify-end items-center">
          <Link href="/api/auth/signin">
            <a className="space-x-2 border-none btn">
              <p>login</p>
              <AiOutlineUser className="w-6 h-6" />
            </a>
          </Link>
          <label
            className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="ml-4 w-6 h-6" />
          </label>
        </div>
      )}
    </header>
  );
};

export default CodesHeader;
