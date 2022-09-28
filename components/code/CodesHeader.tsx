import {
  AiOutlineDown,
  AiOutlineExclamationCircle,
  AiOutlineUser,
} from "react-icons/ai";
import { UserInterface } from "../../typings";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect } from "react";
import { supabase } from "../../utils/supabaseClient";
import { useAuth } from "@utils/authProvider";
import { HiOutlineMenu } from "react-icons/hi";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface CodesHeaderInterface {
  id: string;
  user?: UserInterface;
  setUser: Dispatch<SetStateAction<UserInterface | undefined>>;
}

const CodesHeader = ({ id, user, setUser }: CodesHeaderInterface) => {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    if (id) {
      let { data, error } = await supabase
        .from<UserInterface>("profiles")
        .select(`username, avatar_url`)
        .eq("id", id)
        .single();
      if (error) toast.error(`Unable to fetch user, ${error.message}`);
      if (data) {
        setUser(data);
      }
    }
  };

  return (
    <header className="navbar sticky top-0 z-10 justify-end bg-opacity-40 p-4 font-raleway backdrop-blur-sm">
      {user ? (
        <div className="flex items-center justify-end gap-2 sm:gap-6">
          {user.is_new && (
            <Link href="/profile">
              <a className="badge text-2xs badge-warning p-3 text-warning-content transition-transform hover:scale-105 sm:text-sm">
                Your profile need to be updated{" "}
                <AiOutlineExclamationCircle className="ml-2 h-5 w-5 text-warning-content" />
              </a>
            </Link>
          )}
          <div className="dropdown-end dropdown rounded-full">
            <label
              tabIndex={0}
              className="group m-1 flex cursor-pointer items-center gap-x-2 border-none"
            >
              <AiOutlineDown className="hidden h-4 w-4 transition-colors group-hover:text-accent sm:inline-flex" />
              <div className="mask mask-circle relative h-10 w-10 transition-transform group-hover:scale-110">
                {user.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    layout="fill"
                    objectFit="cover"
                    alt="avatar"
                  />
                ) : (
                  <AiOutlineUser className="h-full w-full" />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 gap-2 bg-neutral p-2"
            >
              <li>
                <Link href="/profile">
                  <a className="transition-colors hover:bg-accent hover:text-accent-content">
                    Profile
                  </a>
                </Link>
              </li>
              <li>
                <a
                  className="transition-colors hover:bg-accent hover:text-accent-content"
                  onClick={() => {
                    signOut();
                    router.reload();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
          <label
            className="cursor-pointer text-base-content transition-colors hover:text-accent lg:hidden"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="ml-4 h-6 w-6" />
          </label>
        </div>
      ) : (
        <div className="flex items-center justify-end">
          <Link href="/login">
            <a className="btn space-x-2 border-none">
              <p>login</p>
              <AiOutlineUser className="h-6 w-6" />
            </a>
          </Link>
          <label
            className="cursor-pointer text-base-content transition-colors hover:text-accent lg:hidden"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="ml-4 h-6 w-6" />
          </label>
        </div>
      )}
    </header>
  );
};

export default CodesHeader;
