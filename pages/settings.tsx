import CodeCard from "@components/code/CodeCard";
import CodeHighlighter from "@components/code/CodeHighlighter";
import DashboardLayout from "@components/layout/DashboardLayout";
import { IconArrowLeft } from "@supabase/ui";
import { useTheme } from "next-themes";
import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { toast } from "react-toastify";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const allThemes = [
    "mrfisch",
    "luxury",
    "emerald",
    "coffee",
    "cyberpunk",
    "valentine",
    "synthwave",
  ];

  const changeTheme = (theme: string) => {
    toast.success(`Theme changed to ${theme}`, { theme: "dark" });
    setTheme(theme);
  };

  const mockedCode = `const answerToLife = async () => {
   try {
      const resp = await fetch("/universe/answer")
      return await resp.json()
   } catch (error) {
      return throw "Impossible to answer"
   }
}
   `;

  const mockedInput = {
    code_title: "I'm Mr Fisch",
    code_block: `
while true:
   print('Mr Fisch hehe')
`,
    description: "Welcome",
    inserted_at: new Date(),
    updated_at: new Date(),
    id: "",
    is_public: true,
    username: "Mr Fisch",
    tags: ["aoeuaeu", "qjk"],
  };

  return (
    <main className="flex h-max w-full flex-col gap-4">
      <Head>
        <title>Settings • Mr Fisch</title>
      </Head>
      <div className="navbar sticky top-0 z-10 justify-between bg-neutral  bg-opacity-40 backdrop-blur-sm">
        <Link href="/codes/">
          <a className="flex w-fit cursor-pointer items-center font-bold transition-colors hover:text-accent">
            <IconArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
            <p className="hidden md:inline-flex">Go back</p>
          </a>
        </Link>
        <label
          className="cursor-pointer text-base-content transition-colors hover:text-accent lg:hidden"
          htmlFor="drawer"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </label>
      </div>
      <h1 className="p-4 text-3xl lg:text-4xl">Pick a theme</h1>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        {allThemes.map((theme) => (
          <div
            onClick={() => changeTheme(theme)}
            className="flex cursor-pointer flex-col items-center justify-center rounded-md border-2 border-base-200 transition-transform hover:scale-110"
            data-theme={theme}
          >
            <div className="bg-base flex gap-1 p-4">
              <div className="h-4 w-4 rounded-full bg-primary"></div>
              <div className="h-4 w-4 rounded-full bg-secondary"></div>
              <div className="h-4 w-4 rounded-full bg-accent"></div>
              <div className="h-4 w-4 rounded-full bg-base-content"></div>
            </div>
            <p className="font-bold">{theme}</p>
          </div>
        ))}
      </div>
      <h1 className="p-4 text-3xl lg:text-4xl">
        Previewing Code with theme {theme}
      </h1>
      <div className="card mx-8 select-none bg-neutral">
        <div className="card-body p-0 lg:p-6">
          <CodeHighlighter
            language="javascript"
            theme="dracula"
            input={mockedCode}
            className="text-xs sm:text-sm 2xl:text-base"
          />
        </div>
      </div>
      <h1 className="p-4 text-3xl lg:text-4xl">
        Previewing Cards with theme {theme}
      </h1>
      <CodeCard
        key={mockedInput.id}
        id={mockedInput.id}
        code_title={mockedInput.code_title}
        description={mockedInput.description}
        updated_at={mockedInput.updated_at}
        code_block={mockedInput.code_block}
        is_public={mockedInput.is_public}
        className="min-h-52  mx-auto mb-4 w-4/5 bg-neutral lg:w-1/2"
        tags={mockedInput.tags}
      />
    </main>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
