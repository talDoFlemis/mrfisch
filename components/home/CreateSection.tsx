import CodeHighlighter from "@components/code/CodeHighlighter";
import Image from "next/image";
import Link from "next/link";

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
    <div id="create" className="relative h-screen w-full text-white">
      <Image
        src="/img/space.jpg"
        alt="space"
        layout="fill"
        objectFit="cover"
        priority
        quality={80}
        className="select-none"
      />
      <div className="relative z-10 h-full bg-gradient-to-t from-black/90 via-transparent to-black/90 p-4 text-center">
        <div className="mx-auto grid h-full grid-rows-2 place-content-center place-items-center gap-x-8 gap-y-8 md:grid-cols-2 md:grid-rows-none 2xl:container">
          <div className="group relative row-start-2 w-3/4 self-start  md:row-auto md:self-auto">
            <div className="absolute -inset-0.5 animate-tilt rounded-xl bg-gradient-to-r from-accent via-accent to-primary opacity-70 blur-lg transition-opacity duration-1000 group-hover:opacity-100 group-hover:duration-300"></div>
            <div className="card select-none bg-neutral">
              <div className="card-body p-0 lg:p-6">
                <CodeHighlighter
                  language="javascript"
                  theme="dracula"
                  input={mockedInput}
                  className="text-sm lg:text-base"
                />
              </div>
            </div>
          </div>
          <div className="flex  flex-col gap-y-5 self-end md:self-auto">
            <div className="font-raleway text-3xl font-bold sm:text-5xl 2xl:text-6xl">
              Create code with{" "}
              <p className="break-words text-primary">syntax</p>
              <span className="text-accent"> highlighting</span>
            </div>
            <p className="hidden text-base text-slate-400 sm:inline-flex">
              Choose between more than 100 languages and we will highlight your
              code
            </p>
            <Link href="/create">
              <a className="btn btn-accent mx-auto w-44">Create now!</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSection;
