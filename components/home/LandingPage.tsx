import Image from "next/image";
import Link from "next/link";
import LandingPageImg from "../../public/img/banner-bg.webp";
import DabbingAstro from "../../public/img/dabastronaut.webp";

const LandingPage = () => {
  return (
    <div className="relative w-full h-screen text-white">
      <Image
        src={LandingPageImg}
        alt="banner bg"
        layout="fill"
        objectFit="cover"
        priority
        quality={100}
        className="select-none"
      />
      <div className="grid relative z-10 grid-cols-1 gap-8 w-full h-full bg-gradient-to-b from-transparent via-transparent sm:grid-cols-2 to-black/95 font-geo">
        <div className="hidden relative mx-auto max-w-md sm:inline-flex sm:w-2/3 lg:w-1/2 animate-wiggle">
          <Image
            src={DabbingAstro}
            alt="dabbing astronaut"
            objectFit="contain"
            layout="fill"
            priority
          />
        </div>
        <div className="flex relative flex-col gap-y-4 justify-center items-center p-4 w-full h-full text-center sm:gap-y-0">
          <h2 className="text-8xl italic font-extrabold uppercase">Mr fisch</h2>
          <p className="text-3xl">
            The perfect place to share codes with your friends
          </p>
          <div className="relative mt-4 group">
            <div className="absolute -inset-1 bg-red-500 rounded opacity-60 transition-opacity duration-1000 group-hover:opacity-100 blur group-hover:duration-000"></div>
            <Link href="/codes">
              <a className="font-spaceQuest btn btn-md relative border-none bg-gradient-to-r from-[#180526] font-normal text-3xl">
                Explore
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
