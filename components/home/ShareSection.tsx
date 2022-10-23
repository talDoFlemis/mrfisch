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
    <div id="share" className="relative w-full h-screen text-white">
      <Image
        src="/img/space2.jpg"
        alt="space"
        layout="fill"
        objectFit="cover"
        priority
        quality={80}
        className="select-none"
      />
      <div className="relative z-10 p-4 h-full text-center bg-gradient-to-t from-black via-transparent to-black/90">
        <div className="grid grid-rows-2 gap-x-8 place-content-center place-items-center mx-auto h-full md:grid-cols-2 md:grid-rows-none 2xl:container">
          <div className="flex flex-col gap-y-5 self-end md:self-auto">
            <h1 className="text-3xl font-bold sm:text-5xl 2xl:text-6xl font-raleway">
              Easily <span className="text-secondary">share</span> and{" "}
              <span className="text-primary">copy</span> code from your friends
            </h1>
            <p className="text-sm text-white sm:text-lg">
              Copy the code to your clipboard with a single click or the link to
              share with your friends
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r rounded-xl opacity-70 transition-opacity duration-1000 group-hover:opacity-100 group-hover:duration-300 animate-tilt from-secondary via-primary to-primary blur-lg"></div>
            <div className="select-none card bg-neutral">
              <div className="card-body">
                <h1 className="text-2xl font-bold text-center">
                  {mockedInput.code_title}
                </h1>
                <p className="text-lg font-bold text-gray-200 line-clamp-2 text-ellipsis">
                  {mockedInput.description}
                </p>
                <div className="justify-end space-x-1 card-actions font-momcake">
                  <Link href={`/codes/`}>
                    <a className="btn btn-outline btn-sm text-white hover:border-[#380246] hover:bg-[#380246] hover:text-white">
                      View Code
                    </a>
                  </Link>
                  <StealCodeButton code={mockedInput.code_block} codeId="" />
                </div>
                <div className="grid grid-cols-3 place-items-center font-momcake">
                  <div className="flex relative gap-x-2 items-center">
                    <AiOutlineUserSwitch className="w-4 h-4" />
                    <p className="hidden sm:inline-flex">
                      {mockedInput.username ?? "anonymous"}
                    </p>
                  </div>
                  <p>{moment(mockedInput.inserted_at).fromNow()}</p>
                  <div className="flex gap-x-2 items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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
