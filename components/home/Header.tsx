import Link from "next/link";
import { GiAstronautHelmet } from "react-icons/gi";
interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <header className="fixed top-0 right-0 left-0 z-20 mx-auto flex w-4/5 items-center justify-between p-4 text-white ">
      <Link href="/">
        <a className="font-spaceRave text-2xl italic transition-colors hover:text-red-500 md:text-4xl">
          Mr Fisch
        </a>
      </Link>

      <div className="btn rounded-full border-none bg-white/20 font-momcake text-sm shadow hover:bg-[#522f54] hover:bg-opacity-50 hover:shadow-white sm:space-x-4 sm:rounded-3xl md:text-xl">
        <p className="hidden sm:inline-flex">Explorar</p>{" "}
        <GiAstronautHelmet className="h-4 w-4 md:h-8 md:w-8" />
      </div>
    </header>
  );
};

export default Header;
