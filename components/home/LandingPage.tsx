import Image from "next/image";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen text-white">
      <Image
        src="/img/astronaut2.jpg"
        alt="astronaut"
        layout="fill"
        objectFit="cover"
        priority
        quality={100}
        className="select-none"
      />
      <div className="flex relative z-10 flex-col justify-center items-center p-4 h-full text-center bg-gradient-to-b from-transparent via-transparent to-black/95 font-momcake">
        <h2 className="text-6xl italic sm:text-7xl md:text-8xl xl:text-9xl font-spaceRave">
          Mr fisch
        </h2>
        <p className="text-3xl sm:text-4xl md:text-5xl">
          The perfect place to share codes with your friends
        </p>
        <div className="relative mt-4 group">
          <div className="absolute -inset-1 bg-red-500 rounded opacity-60 transition-opacity duration-1000 group-hover:opacity-100 blur group-hover:duration-000"></div>
          <Link href="/codes">
            <a className="font-spaceQuest btn btn-md relative border-none bg-gradient-to-r from-[#180526] text-2xl font-normal md:btn-lg md:text-3xl">
              Explore
            </a>
          </Link>
        </div>

        <a
          className="flex absolute bottom-4 gap-x-4 items-center text-lg cursor-pointer sm:text-2xl hover:text-accent"
          href="https://github.com/talDoFlemis/mrfisch"
        >
          Contribute
          <AiFillGithub className="w-8 h-8" />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
