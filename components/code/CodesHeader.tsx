import {
  AiOutlineDown,
  AiOutlineExclamationCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { UserInterface } from "../../typings";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
//TODO: Supabase Client dando merda no jest

interface CodesHeaderProps {
  user?: UserInterface | null;
}

const CodesHeader = ({ user }: CodesHeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 justify-end p-4 bg-opacity-40 navbar font-raleway backdrop-blur-sm">
      {user ? (
        <div className="flex gap-2 justify-end items-center sm:gap-6">
          {user?.is_new && (
            <Link href="/profile">
              <a className="p-3 transition-transform sm:text-sm hover:scale-105 badge text-2xs badge-warning text-warning-content">
                Your profile need to be updated{" "}
                <AiOutlineExclamationCircle className="ml-2 w-5 h-5 text-warning-content" />
              </a>
            </Link>
          )}
          <div className="rounded-full dropdown-end dropdown">
            <label
              tabIndex={0}
              className="flex gap-x-2 items-center m-1 border-none cursor-pointer group"
            >
              <AiOutlineDown className="hidden w-4 h-4 transition-colors sm:inline-flex group-hover:text-accent" />
              <div className="relative w-10 h-10 transition-transform group-hover:scale-110 mask mask-circle">
                {user?.avatar_url ? (
                  <Image
                    src={user?.avatar_url}
                    layout="fill"
                    objectFit="cover"
                    alt="avatar"
                  />
                ) : (
                  <AiOutlineUser className="w-full h-full" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="gap-2 p-2 w-52 dropdown-content menu rounded-box bg-neutral"
            >
              <li>
                <Link href="/profile">
                  <a className="transition-colors hover:bg-accent hover:text-accent-content">
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <button
                  className="transition-colors hover:bg-accent hover:text-accent-content"
                  onClick={() => {
                    supabaseClient.auth.signOut();
                    router.push("/");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <label
            className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="ml-4 w-6 h-6" />
          </label>
        </div>
      ) : (
        <div className="flex justify-end items-center">
          <Link href="/login">
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
