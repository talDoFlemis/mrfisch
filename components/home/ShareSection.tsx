import StealCodeButton from "@components/code/StealCodeButton";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineUserSwitch } from "react-icons/ai";

const ShareSection = () => {
  const mockedInput = {
    code_title: "I'm Mr Fisch",
    code_block: `
while true:
   print('Mr Fisch hehe')
`,
    description: "Welcome",
    inserted_at: new Date(),
    is_public: true,
    username: "Mr Fisch",
  };
  return (
    <div id="share" className="relative h-screen w-full text-white">
      <Image
        src="/img/space2.jpg"
        alt="space"
        layout="fill"
        objectFit="cover"
        priority
        quality={80}
        className="select-none"
      />
      <div className="relative z-10 h-full bg-gradient-to-t from-black via-transparent to-black/90 p-4 text-center">
        <div className=" mx-auto grid h-full grid-rows-2  place-content-center place-items-center gap-x-8 md:grid-cols-2 md:grid-rows-none 2xl:container">
          <div className="flex flex-col gap-y-5 self-end md:self-auto">
            <h1 className="font-raleway text-3xl font-bold sm:text-5xl 2xl:text-6xl">
              Easily <span className="text-secondary">share</span> and{" "}
              <span className="text-primary">copy</span> code from your friends
            </h1>
            <p className="text-sm text-white sm:text-lg">
              Copy the code to your clipboard with a single click or the link to
              share with your friends
            </p>
          </div>
          <div className="group relative">
            <div className="absolute -inset-0.5 animate-tilt rounded-xl bg-gradient-to-r from-secondary via-primary to-primary opacity-70 blur-lg transition-opacity duration-1000 group-hover:opacity-100 group-hover:duration-300"></div>
            <div className="card select-none bg-neutral">
              <div className="card-body">
                <h1 className="text-center text-2xl font-bold">
                  {mockedInput.code_title}
                </h1>
                <p className="line-clamp-2 text-ellipsis text-lg font-bold text-gray-200">
                  {mockedInput.description}
                </p>
                <div className="card-actions justify-end space-x-1 font-momcake">
                  <Link href={`/codes/`}>
                    <a className="btn btn-outline btn-sm text-white hover:border-[#380246] hover:bg-[#380246] hover:text-white">
                      View Code
                    </a>
                  </Link>
                  <StealCodeButton code={mockedInput.code_block} />
                </div>
                <div className="grid grid-cols-3 place-items-center font-momcake">
                  <div className="relative flex items-center gap-x-2">
                    <AiOutlineUserSwitch className="h-4 w-4" />
                    <p className="hidden sm:inline-flex">
                      {mockedInput.username ?? "anonymous"}
                    </p>
                  </div>
                  <p>{moment(mockedInput.inserted_at).fromNow()}</p>
                  <div className="flex items-center gap-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    {mockedInput.is_public ? "public" : "private"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSection;
