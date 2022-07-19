import { AiOutlineDown, AiOutlinePlus, AiOutlineUser } from "react-icons/ai";
import { AuthInterface, UserInterface } from "../../typings";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import { GiFriedFish } from "react-icons/gi";
import { useAuth } from "@utils/authProvider";
import { HiOutlineMenu } from "react-icons/hi";

//TODO: Add avatar support and menu in logged user
const CodesHeader = ({ id }: { id: string }) => {
  const [user, setUser] = useState<UserInterface>();
  const { signOut } = useAuth();

  useEffect(() => {
    fetchCodes();
  }, [id]);

  const fetchCodes = async () => {
    if (id) {
      let { data, error } = await supabase
        .from<UserInterface>("profiles")
        .select(`username, avatar_url`)
        .eq("id", id)
        .single();
      if (error) console.log("error", error);
      if (data) {
        setUser(data);
      }
    }
  };

  return (
    <header className="p-4 font-raleway text-white">
      {user ? (
        <div className="flex items-center justify-between">
          <div>
            <label
              htmlFor="drawer"
              className="btn drawer-button cursor-pointer border-none hover:text-red-500 lg:hidden"
            >
              <GiFriedFish className="mx-auto h-8 w-8" />
            </label>
            <div className="btn btn-sm space-x-2 border-none bg-gradient-to-r from-purple-600 to-purple-500">
              <AiOutlinePlus className="h-6 w-6" />
              <p className="hidden sm:inline-flex">Create</p>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1 gap-x-2 border-none">
              <AiOutlineDown className="hidden h-4 w-4 text-slate-400 sm:inline-flex" />
              <p className="hidden text-white sm:inline-flex">
                {user.username}
              </p>
              <div className="relative rounded-full">
                <AiOutlineUser className="h-6 w-6" />
                {/*<Image src={user.avatar_url} layout="fill" objectFit="cover" />*/}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-purple-400/30 p-2 shadow drop-shadow-lg backdrop-blur-xl"
            >
              <li>
                <a className="hover:bg-purple-600" onClick={signOut}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end">
          <div className="btn space-x-2 border-none">
            <p>LogIn</p>
            <AiOutlineUser className="h-6 w-6" />
          </div>
          <label
            className="cursor-pointer text-white transition-colors hover:text-accent lg:hidden"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="ml-4 h-6 w-6" />
          </label>
        </div>
      )}
      <h1 className="mt-4 text-xl font-light text-slate-400 sm:text-2xl md:text-4xl">
        Welcome,{" "}
        <span className="font-spaceRave text-white">
          {" "}
          Mr {user?.username || "anonymous"}
        </span>{" "}
      </h1>
    </header>
  );
};

export default CodesHeader;
