import Image from "next/image";

interface LandingPageProps {}

const LandingPage = ({}: LandingPageProps) => {
  return (
    <div className="relative h-screen w-full text-white">
      <Image
        src="/img/astronaut2.jpg"
        alt="astronaut"
        layout="fill"
        objectFit="cover"
        priority
        quality={100}
        className="select-none"
      />
      <div className="relative z-10 flex h-full flex-col items-center justify-center p-4  text-center font-momcake">
        <h2 className="font-spaceRave text-6xl italic sm:text-7xl md:text-8xl  xl:text-9xl">
          Mr fisch
        </h2>
        <p className="text-3xl sm:text-4xl md:text-5xl ">
          The perfect place to share codes with your friends
        </p>
        <div className="group relative mt-4">
          <div className="group-hover:duration-000 absolute -inset-1 rounded bg-red-500 opacity-60 blur transition-opacity duration-1000 group-hover:opacity-100"></div>
          <div className="btn btn-md relative border-none bg-gradient-to-r from-[#180526] font-spaceQuest font-normal md:btn-lg md:text-3xl">
            Explorar
          </div>
        </div>

        <p className="absolute bottom-0 pb-4 text-xl md:text-3xl">
          Made by Flemis 🔥
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
