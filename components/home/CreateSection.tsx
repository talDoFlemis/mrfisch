import CodeHighlighter from "@components/code/CodeHighlighter";
import Image from "next/image";
import Link from "next/link";
import SpaceImg from "../../public/img/space.webp";

const CreateSection = () => {
  const mockedInput = `const answerToLife = async () => {
   try {
      const resp = await fetch("/universe/answer")
      return await resp.json()
   } catch (error) {
      return throw "Impossible to answer"
   }
}
   `;

  return (
    <div id="create" className="relative w-full h-screen text-white">
      <Image
        src={SpaceImg}
        alt="space"
        layout="fill"
        objectFit="cover"
        priority
        className="select-none"
      />
      <div className="relative z-10 p-4 h-full text-center bg-gradient-to-t via-transparent from-black/90 to-black/90">
        <div className="grid grid-rows-2 gap-x-8 gap-y-8 place-content-center place-items-center mx-auto h-full md:grid-cols-2 md:grid-rows-none 2xl:container">
          <div className="relative row-start-2 self-start w-3/5 sm:w-full md:row-auto md:self-auto xl:w-3/4 group">
            <div className="absolute -inset-0.5 w-3/4 bg-gradient-to-r rounded-xl opacity-70 transition-opacity duration-1000 group-hover:opacity-100 group-hover:duration-300 animate-tilt from-accent via-accent to-primary blur-lg"></div>
            <div className="select-none card bg-neutral">
              <div className="p-0 lg:p-6 card-body">
                <CodeHighlighter
                  language="javascript"
                  input={mockedInput}
                  className="sm:text-xs text-2xs"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-5 self-end md:self-auto">
            <div className="text-5xl font-bold font-geo">
              Create code with{" "}
              <p className="break-words text-primary">syntax</p>
              <span className="text-accent"> highlighting</span>
            </div>
            <p className="hidden text-base sm:inline-flex text-slate-400">
              Choose between more than 100 languages and we will highlight your
              code
            </p>
            <Link href="/create">
              <a className="mx-auto w-44 btn btn-accent">Create now!</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSection;
