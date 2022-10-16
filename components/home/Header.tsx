import Link from "next/link";
import { GiAstronautHelmet, GiFriedFish } from "react-icons/gi";
import cl from "clsx";

const Header = ({
  section,
  scrolled,
}: {
  section: string;
  scrolled: boolean;
}) => {
  return (
    <header
      className={cl(
        "fixed top-0 left-0 right-0 z-20 flex items-center justify-between text-white transition-all",
        scrolled ? "bg-neutral/60 p-1 backdrop-blur-sm" : "p-4"
      )}
    >
      {" "}
      <Link href="/">
        <a>
          <GiFriedFish className="w-8 h-8 cursor-pointer sm:w-12 sm:h-12 hover:text-accent" />
        </a>
      </Link>
      <div className="grid grid-cols-3 place-items-center w-1/2 font-momcake">
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
      <Link href="/codes">
        <a className="rounded-full border-none bg-white/20 font-momcake text-sm shadow hover:bg-[#522f54] hover:bg-opacity-50 hover:shadow-white sm:btn sm:space-x-4 sm:rounded-3xl md:text-xl">
          <p className="hidden sm:inline-flex">Explore</p>{" "}
          <GiAstronautHelmet className="w-5 h-5 md:w-8 md:h-8" />
        </a>
      </Link>
    </header>
  );
};

export default Header;
