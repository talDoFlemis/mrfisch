import Link from "next/link";
import { GiAstronautHelmet, GiFriedFish } from "react-icons/gi";
import cl from "clsx";

const Header = ({ section }: { section: string }) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-20 mx-auto flex items-center justify-between bg-neutral/60 p-4 text-white backdrop-blur-sm">
      <Link href="/">
        <a>
          <GiFriedFish className="h-8 w-8 cursor-pointer hover:text-accent sm:h-12 sm:w-12" />
        </a>
      </Link>
      <div className="grid w-1/2 grid-cols-3 place-items-center font-momcake">
        <Link href="/#create">
          <a
            className={cl(
              "text-base font-bold transition-colors hover:text-accent sm:text-xl",
              section === "create" ? "text-accent" : "text-slate-400"
            )}
          >
            create
          </a>
        </Link>
        <Link href="/#share">
          <a
            className={cl(
              "text-base font-bold transition-colors hover:text-accent sm:text-xl",
              section === "share" ? "text-accent" : "text-slate-400"
            )}
          >
            share
          </a>
        </Link>
        <Link href="/#about">
          <a
            className={cl(
              "text-base font-bold transition-colors hover:text-accent sm:text-xl",
              section === "about" ? "text-accent" : "text-slate-400"
            )}
          >
            about
          </a>
        </Link>
      </div>
      <div className="rounded-full border-none bg-white/20 font-momcake text-sm shadow hover:bg-[#522f54] hover:bg-opacity-50 hover:shadow-white sm:btn sm:space-x-4 sm:rounded-3xl md:text-xl">
        <p className="hidden sm:inline-flex">Explore</p>{" "}
        <GiAstronautHelmet className="h-5 w-5 md:h-8 md:w-8" />
      </div>
    </header>
  );
};

export default Header;
