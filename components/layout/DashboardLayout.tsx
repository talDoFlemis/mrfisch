import Link from "next/link";
import { useRouter } from "next/router";
import { HiCode } from "react-icons/hi";
import { MdOutlineCreate, MdSettings } from "react-icons/md";
import { GiFriedFish } from "react-icons/gi";
import cl from "clsx";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  return (
    <div className="flex h-screen  bg-base-100 font-momcake antialiased">
      <div className="drawer-mobile drawer text-white">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex">{children}</div>
        <aside className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <ul className="menu w-48 items-center justify-center overflow-y-auto bg-base-100 p-4 text-base-content">
            <Link href="/">
              <a className="absolute top-4 font-spaceRave text-xl italic text-white transition-colors hover:text-red-500">
                Mr fisch
                <GiFriedFish className="mx-auto h-8 w-8" />
              </a>
            </Link>
            <div className="flex flex-col text-lg text-slate-300">
              <Link href="/codes/">
                <a
                  className={cl(
                    "btn flex cursor-pointer items-center justify-start space-x-2 rounded-md border-none bg-transparent py-2 transition-colors hover:bg-red-500/80 hover:text-white",
                    pathname === "/codes" && " text-white"
                  )}
                >
                  <HiCode className="h-6 w-6" />
                  <p>All Codes</p>
                </a>
              </Link>
              <Link href="/create/">
                <a
                  className={cl(
                    "btn flex cursor-pointer items-center justify-start space-x-4 rounded-md border-none bg-transparent py-2 transition-colors hover:bg-red-500/80  hover:text-white",
                    pathname === "/create" && " text-white"
                  )}
                >
                  <MdOutlineCreate className="h-6 w-6" />
                  <p>create</p>
                </a>
              </Link>
              <Link href="/settings/">
                <a
                  className={cl(
                    "btn flex cursor-pointer items-center justify-start space-x-4 rounded-md border-none bg-transparent py-2 transition-colors hover:bg-red-500/80 hover:text-white",
                    pathname === "/settings" && " text-white"
                  )}
                >
                  <MdSettings className="h-6 w-6" />
                  <p>Settings</p>
                </a>
              </Link>
            </div>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
