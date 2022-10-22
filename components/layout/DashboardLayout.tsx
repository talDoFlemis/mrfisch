import Link from "next/link";
import { useRouter } from "next/router";
import { HiCode } from "react-icons/hi";
import { MdOutlineCreate, MdSettings } from "react-icons/md";
import { GiFriedFish } from "react-icons/gi";
import cl from "clsx";
import React from "react";
import { AiFillHeart, AiOutlineSearch } from "react-icons/ai";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useRouter();
  return (
    <div className="flex h-screen antialiased bg-base-100 font-momcake">
      <div className="drawer drawer-mobile text-base-content">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="flex drawer-content">{children}</div>
        <aside className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay"></label>
          <ul className="overflow-y-auto justify-center items-center p-1 w-40 sm:p-4 sm:w-48 menu bg-base-100 text-base-content">
            <Link href="/">
              <a className="absolute top-4 text-xl italic transition-colors font-spaceRave text-base-content hover:text-accent">
                Mr fisch
                <GiFriedFish className="mx-auto w-8 h-8" />
              </a>
            </Link>
            <div className="flex flex-col text-lg">
              <Link href="/codes/">
                <a
                  className={cl(
                    "btn flex cursor-pointer items-center justify-start space-x-2 rounded-md border-none bg-transparent py-2 transition-colors hover:bg-accent/80 hover:text-accent-content",
                    pathname === "/codes" ? "text-accent" : "text-base-content"
                  )}
                >
                  <HiCode className="w-6 h-6" />
                  <p>all codes</p>
                </a>
              </Link>
              <Link href="/create/">
                <a
                  className={cl(
                    "btn flex cursor-pointer items-center justify-start space-x-4 rounded-md border-none bg-transparent py-2 transition-colors hover:bg-accent/80 hover:text-accent-content",
                    pathname === "/create" ? "text-accent" : "text-base-content"
                  )}
                >
                  <MdOutlineCreate className="w-6 h-6" />
                  <p>create</p>
                </a>
              </Link>
              <Link href="/search/">
                <a
                  className={cl(
                    "btn flex cursor-pointer items-center justify-start space-x-4 rounded-md border-none bg-transparent py-2 transition-colors hover:bg-accent/80 hover:text-accent-content",
                    pathname === "/search" ? "text-accent" : "text-base-content"
                  )}
                >
                  <AiOutlineSearch className="w-6 h-6" />
                  <p>search</p>
                </a>
              </Link>
              <Link href="/portulovers/">
                <a
                  className={cl(
                    "btn flex cursor-pointer items-center justify-start space-x-4 rounded-md border-none bg-transparent py-2 transition-colors hover:bg-accent/80 hover:text-accent-content",
                    pathname === "/portulovers"
                      ? "text-accent"
                      : "text-base-content"
                  )}
                >
                  <AiFillHeart className="w-6 h-6" />
                  <p>portulovers</p>
                </a>
              </Link>
              <Link href="/settings/">
                <a
                  className={cl(
                    "btn flex cursor-pointer items-center justify-start space-x-4 rounded-md border-none bg-transparent py-2 transition-colors hover:bg-accent/80 hover:text-accent-content",
                    pathname === "/settings"
                      ? "text-accent"
                      : "text-base-content"
                  )}
                >
                  <MdSettings className="w-6 h-6" />
                  <p>settings</p>
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
