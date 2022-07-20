import Image from "next/image";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";

const LandingPage = () => {
  return (
    <div className="relative h-screen w-full text-white">
      <Image
        src="/img/astronaut2.jpg"
        alt="astronaut"
        layout="fill"
        objectFit="cover"
        priority
        quality={100}
        className="select-none "
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center bg-gradient-to-b from-transparent via-transparent to-black/95  p-4 text-center font-momcake">
        <h2 className="font-spaceRave text-6xl italic sm:text-7xl md:text-8xl  xl:text-9xl">
          Mr fisch
        </h2>
        <p className="text-3xl sm:text-4xl md:text-5xl ">
          The perfect place to share codes with your friends
        </p>
        <div className="group relative mt-4">
          <div className="group-hover:duration-000 absolute -inset-1 rounded bg-red-500 opacity-60 blur transition-opacity duration-1000 group-hover:opacity-100"></div>
          <Link href="/codes">
            <a className="font-spaceQuest btn btn-md relative border-none bg-gradient-to-r from-[#180526] text-2xl font-normal md:btn-lg md:text-3xl">
              Explore
            </a>
          </Link>
        </div>

        <a
          className="absolute bottom-4 flex cursor-pointer items-center gap-x-4 text-lg hover:text-accent sm:text-2xl"
          href="https://github.com/talDoFlemis/mrfisch"
        >
          Contribute
          <AiFillGithub className="h-8 w-8" />
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
