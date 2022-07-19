import Image from "next/image";
import { GithubInterface } from "typings";

const AboutSection = ({ profile }: { profile: GithubInterface }) => {
  return (
    <div id="about" className="relative h-max w-full text-white sm:h-screen">
      <Image
        src="/img/space3.jpg"
        alt="space"
        layout="fill"
        objectFit="cover"
        priority
        quality={80}
        className="select-none"
      />
      <div className="relative z-10 flex h-full items-center justify-center bg-gradient-to-t from-black/80 via-transparent to-black/90 p-4">
        <div className="container card bg-neutral shadow-2xl xl:w-1/2">
          <div className="card-body  grid grid-cols-1 grid-rows-6 place-items-center gap-4 sm:grid-cols-5 sm:grid-rows-3">
            <div className="sm:col-span-4 ">
              <h1 className="text-2xl font-bold">No, I'm not Mr Fisch</h1>
              <p>
                Mr Fisch is a brazillian professor who has a unique way of
                teaching. The only professor that has rented a triplex in my
                mind
              </p>
            </div>
            <div className="mask mask-circle relative h-full w-full">
              <Image
                src={profile.avatar_url}
                layout="fill"
                objectFit="contain"
                alt="mr flemis"
              />
            </div>
            <div className="relative row-start-4 h-full w-full sm:row-start-auto">
              <Image src="/img/pepe.png" layout="fill" objectFit="contain" />
            </div>
            <p className=" sm:col-span-4 ">
              This website was made because of the extensive use of{" "}
              <a href="http://dontpad.com/" className="font-bold text-accent">
                Dontpad
              </a>{" "}
              by me and my friends on a page called Mr Fisch to exchange some
              college stuff
            </p>

            <div className="sm:col-span-4 ">
              <p>
                But I wanted something more complete than dontpad plain text
                with the same speed as it has. So I made this shit, I hope you
                enjoy it 👍
              </p>
            </div>
            <div className="relative h-full w-full">
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
