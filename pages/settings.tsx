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
    <main className="flex flex-col gap-4 w-full h-max">
      <Head>
        <title>Settings • Mr Fisch</title>
      </Head>
      <div className="sticky top-0 z-10 justify-between bg-opacity-40 navbar bg-neutral backdrop-blur-sm">
        <Link href="/codes/">
          <a className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent">
            <IconArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            <p className="hidden md:inline-flex">Go back</p>
          </a>
        </Link>
        <label
          className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
          htmlFor="drawer"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </label>
      </div>
      <h1 className="p-4 text-3xl lg:text-4xl">Pick a theme</h1>
      <div className="flex flex-col flex-wrap gap-4 justify-center items-center sm:flex-row">
        {allThemes.map((theme) => (
          <div
            onClick={() => changeTheme(theme)}
            className="flex flex-col justify-center items-center rounded-md border-2 transition-transform cursor-pointer hover:scale-110 border-base-200"
            data-theme={theme}
            key={theme}
          >
            <div className="flex gap-1 p-4 bg-base">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <div className="w-4 h-4 rounded-full bg-secondary"></div>
              <div className="w-4 h-4 rounded-full bg-accent"></div>
              <div className="w-4 h-4 rounded-full bg-base-content"></div>
            </div>
            <p className="font-bold">{theme}</p>
          </div>
        ))}
      </div>
      <h1 className="p-4 text-3xl lg:text-4xl">
        Previewing Code with theme {theme}
      </h1>
      <div className="mx-8 select-none card bg-neutral">
        <div className="p-0 lg:p-6 card-body">
          <CodeHighlighter
            language="javascript"
            input={mockedCode}
            className="text-xs 2xl:text-sm"
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
        className="mx-auto mb-4 w-4/5 lg:w-1/2 min-h-52 bg-neutral"
        tags={mockedInput.tags}
      />
    </main>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
