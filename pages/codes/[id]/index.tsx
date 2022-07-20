import { IconArrowLeft } from "@supabase/ui";
import Link from "next/link";
import CodeHighlighter from "@components/code/CodeHighlighter";
import DashboardLayout from "@components/layout/DashboardLayout";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import moment from "moment";
import { CodeInterface } from "../../../typings";
import { useRouter } from "next/router";
import CopyToClipboard from "react-copy-to-clipboard";
import { GiDaemonSkull } from "react-icons/gi";
import { MdEdit } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import { useAuth } from "@utils/authProvider";
import { GetStaticPaths, GetStaticProps } from "next";
import { supabase } from "@utils/supabaseClient";

const CodeView = ({ code }: { code: CodeInterface }) => {
  const router = useRouter();
  const { user } = useAuth();

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
            language="javascript"
            className="text-sm lg:w-3/4"
          />
          <div className="card h-fit bg-[#1c1f37] lg:w-1/4">
            <div className="card-body">
              <h1 className="text-center text-lg font-bold">
                {code?.code_title}
              </h1>
              <p className="">{code?.description}</p>
              <div className="flex content-between items-center ">
                <p>Language</p>
                <p className="text-right font-bold text-[#8be9fd]">
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
              <div className="divider"></div>
              {user !== code?.user && user?.id !== code?.user ? (
                <a className="btn btn-sm justify-center gap-2 border-none bg-base-100 text-black">
                  Edit
                  <MdEdit className="h-6 w-6 " />
                </a>
              ) : (
                <Link href={`/codes/${router.query.id}/edit`}>
                  <a className="btn btn-sm justify-center gap-2 border-none bg-white text-black shadow transition-colors hover:bg-base-300 hover:text-white ">
                    Edit
                    <MdEdit className="h-6 w-6 " />
                  </a>
                </Link>
              )}

              <CopyToClipboard text={code!.code_block}>
                <div className="btn btn-sm justify-center gap-2 border-none bg-[#ed3833] text-white shadow  hover:bg-[#ed3833] hover:text-[#021431] hover:shadow-white">
                  Steal Code
                  <GiDaemonSkull className="h-6 w-6 shadow-accent transition-colors duration-300 " />
                </div>
              </CopyToClipboard>
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
