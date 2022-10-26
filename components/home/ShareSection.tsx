import CodeCard from "@components/code/CodeCard";
import Image from "next/image";
import { CodeInterface } from "typings";
import Space2Img from "../../public/img/space2.jpg";

const ShareSection = () => {
  const mockedInput: CodeInterface = {
    id: "123",
    inserted_at: new Date(Date.now()),
    updated_at: new Date(Date.now()),
    code_title: "welcome",
    code_block: "print('mrfisch hehe')",
    language: "python",
    number_views: 0,
    favorited_by: [],
    user: {
      name: "Mr Fisch",
      id: "123",
    },
  };
  return (
    <div id="share" className="relative w-full h-screen text-white">
      <Image
        src={Space2Img}
        alt="space"
        layout="fill"
        objectFit="cover"
        priority
        className="select-none"
      />
      <div className="relative z-10 p-4 h-full text-center bg-gradient-to-t from-black via-transparent to-black/90">
        <div className="grid grid-rows-2 gap-8 place-content-center place-items-center mx-auto h-full md:grid-cols-2 md:grid-rows-none 2xl:container">
          <div className="flex flex-col gap-y-5 self-end md:self-auto">
            <h1 className="text-5xl font-bold font-geo">
              Easily <span className="text-secondary">share</span> and{" "}
              <span className="text-primary">copy</span> code from your friends
            </h1>
            <p className="text-base text-white">
              Copy the code to your clipboard with a single click or the link to
              share with your friends
            </p>
          </div>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r rounded-xl opacity-70 transition-opacity duration-1000 group-hover:opacity-100 group-hover:duration-300 animate-tilt from-secondary via-primary to-primary blur-lg"></div>
            <CodeCard {...mockedInput} className="bg-neutral" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareSection;
