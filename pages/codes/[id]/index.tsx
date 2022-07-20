import { IconArrowLeft } from "@supabase/ui";
import Link from "next/link";
import CodeHighlighter from "@components/code/CodeHighlighter";
import DashboardLayout from "@components/layout/DashboardLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import moment from "moment";
import { CodeInterface } from "../../../typings";
import { useRouter } from "next/router";
import { MdEdit } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "@utils/authProvider";
import { GetStaticPaths, GetStaticProps } from "next";
import { supabase } from "@utils/supabaseClient";
import StealCodeButton from "@components/code/StealCodeButton";
import CopyLink from "@components/code/CopyLink";
import { useEffect, useState } from "react";
import DeleteCodeButton from "@components/code/DeleteCodeButton";

const CodeView = ({ code }: { code: CodeInterface }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [linkToCopy, setLinkToCopy] = useState("");
  useEffect(() => {
    setLinkToCopy(location.href);
  }, []);

  return (
    <main className="flex h-max w-full flex-col font-raleway">
      <div className="navbar sticky top-0 z-10 justify-between bg-neutral  bg-opacity-40 backdrop-blur-sm">
        <Link href="/codes/">
          <a className="flex w-fit cursor-pointer items-center font-bold transition-colors hover:text-red-500">
            <IconArrowLeft className="h-8 w-8" />
            Go back
          </a>
        </Link>
        <label
          className="cursor-pointer text-white transition-colors hover:text-accent lg:hidden"
          htmlFor="drawer"
        >
          <HiOutlineMenu className="h-6 w-6" />
        </label>
      </div>

      <div className="p-4">
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <CodeHighlighter
            input={code!.code_block}
            theme="dracula"
            language={code.language}
            className="bg-neutral text-sm lg:w-3/4"
          />
          <div className="card h-fit bg-[#1c1f37] lg:w-1/4">
            <div className="card-body">
              <h1 className="text-center text-lg font-bold">
                {code?.code_title}
              </h1>
              <p className="whitespace-pre-wrap break-words">
                {code?.description}
              </p>
              <div className="flex content-between items-center ">
                <p>Language</p>
                <p className="text-right font-bold text-primary">
                  {code?.language}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Created</p>
                <p className="text-right">
                  {moment(code?.inserted_at).format("L")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Last updated</p>
                <p className="text-right">
                  {moment(code?.updated_at).fromNow()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Made by</p>
                <p className="text-right">
                  {code.user?.username ?? "anonymous"}
                </p>
              </div>
              <div className="item-center flex flex-wrap justify-center gap-2 pt-2">
                {code.tags?.map((tag, index) => (
                  <div key={index} className="badge badge-secondary shrink-0">
                    {tag}
                  </div>
                ))}
              </div>
              <div className="divider"></div>
              <CopyLink link={linkToCopy} />
              <StealCodeButton code={code.code_block} />
              {user !== code?.user && user?.id !== code?.user ? (
                <button
                  className="btn btn-sm cursor-default justify-center gap-2 border-none bg-base-100 text-black"
                  disabled
                >
                  <p>Edit</p>
                  <MdEdit className="h-6 w-6 " />
                </button>
              ) : (
                <Link href={`/codes/${router.query.id}/edit`}>
                  <a className="btn btn-sm justify-center gap-2 border-none bg-white text-black shadow transition-colors hover:bg-base-300 hover:text-white ">
                    <p>Edit</p>
                    <MdEdit className="h-6 w-6 " />
                  </a>
                </Link>
              )}
              <DeleteCodeButton
                id={code.id}
                router={router}
                disabled={user !== code?.user && user?.id !== code?.user}
              />
            </div>
          </div>
        </div>
        {code?.documentation && (
          <div>
            <div className="card my-8 bg-[#1c1f37] ">
              <div className="card-body">
                <div className="card-title">Documentation</div>
                <div className="divider  before:bg-white after:bg-white"></div>
                <ReactMarkdown className="prose " remarkPlugins={[remarkGfm]}>
                  {code.documentation}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CodeView;

CodeView.PageLayout = DashboardLayout;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data, error } = await supabase
    .from<CodeInterface>("codes")
    .select("id");

  if (error) console.log(error);

  const paths = data!.map((code) => ({
    params: { id: code.id },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: code, error } = await supabase
    .from("codes")
    .select(`*, user(avatar_url, username)`)
    .eq("id", params!.id)
    .single();

  if (error) console.log(error);

  return {
    props: { code },
  };
};
