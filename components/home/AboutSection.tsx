import Image from "next/image";
import { GithubInterface } from "typings";

const AboutSection = ({ profile }: { profile: GithubInterface }) => {
  return (
    <div id="about" className="relative w-full text-white sm:h-screen h-max">
      <Image
        src="/img/space3.jpg"
        alt="space"
        layout="fill"
        objectFit="cover"
        priority
        quality={80}
        className="select-none"
      />
      <div className="flex relative z-10 justify-center items-center p-4 h-full bg-gradient-to-t via-transparent from-black/80 to-black/90">
        <div className="container shadow-2xl xl:w-1/2 card bg-neutral">
          <div className="grid grid-cols-1 grid-rows-6 gap-4 place-items-center sm:grid-cols-5 sm:grid-rows-3 card-body">
            <div className="sm:col-span-4">
              <h1 className="text-xl font-bold md:text-2xl">
                No, I&apos;m not Mr Fisch
              </h1>
              <p className="text-sm md:text-base">
                Mr Fisch is a brazillian professor who has a unique way of
                teaching. The only professor that has rented a triplex in my
                mind
              </p>
            </div>
            <a
              className="relative w-full h-full transition-transform cursor-pointer hover:scale-110 mask mask-circle"
              href={profile.html_url}
            >
              <Image
                src={profile.avatar_url}
                layout="fill"
                objectFit="contain"
                alt="mr flemis"
              />
            </a>
            <div className="relative row-start-4 w-full h-full sm:row-start-auto">
              <Image
                src="/img/pepe.png"
                layout="fill"
                objectFit="contain"
                alt="pepe"
              />
            </div>
            <p className="text-sm sm:col-span-4 md:text-base">
              This website was made because of the extensive use of{" "}
              <a href="http://dontpad.com/" className="font-bold text-accent">
                Dontpad
              </a>{" "}
              by me and my friends on a page called Mr Fisch to exchange some
              college stuff
            </p>

            <div className="text-sm sm:col-span-4 md:text-base">
              <p>
                But I wanted something more complete than dontpad plain text
                with the same speed as it has. So I made this shit, I hope you
                enjoy it 👍
              </p>
            </div>
            <div className="relative w-full h-full">
              <Image
                src="/img/chad.png"
                layout="fill"
                objectFit="contain"
                className="scale-125"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
