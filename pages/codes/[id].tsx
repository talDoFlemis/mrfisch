import { IconArrowLeft } from "@supabase/ui";
// import { GetServerSideProps } from "next";
import Link from "next/link";
import CodeHighlighter from "../../components/code/CodeHighlighter";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { supabase } from "../../utils/supabaseClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import moment from "moment";
import { useEffect, useState } from "react";
import { CodeInterface } from "../../typings";
import { useRouter } from "next/router";
import LoadingComponent from "../../components/layout/LoadingComponent";

const CodeView = () => {
  const [code, setCode] = useState<CodeInterface>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    fetchCodes();
  }, [router.isReady]);

  const fetchCodes = async () => {
    let { data, error } = await supabase
      .from("codes")
      .select(`*, user(avatar_url, username)`)
      .eq("id", router.query.id)
      .single();
    if (error) console.log("error", error);
    if (data) {
      setCode(data);
      setLoading(false);
    }
  };

  return (
    <main className="flex w-full flex-col p-4 font-raleway">
      <Link href="/codes/">
        <a className="mb-4 flex w-fit cursor-pointer items-center font-bold transition-colors hover:text-red-500">
          <IconArrowLeft className="h-8 w-8" />
          Go back
        </a>
      </Link>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="flex flex-col justify-between gap-8 lg:flex-row">
          <CodeHighlighter
            input={code!.code_block}
            theme="dracula"
            language="javascript"
          />
          <div className="card h-fit bg-[#1c1f37] lg:w-1/4">
            <div className="card-body">
              <h1 className="text-center text-lg font-bold">
                {code?.code_title}
              </h1>
              <p className="">Desc</p>
              <div className="flex content-between items-center ">
                <p>Language</p>
                <p className="text-right font-bold">{code?.language}</p>
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
            </div>
          </div>
        </div>
      )}
      {code?.documentation && (
        <div>
          <div className="card my-8 bg-[#1c1f37] ">
            <div className="card-body">
              <div className="card-title">Documentation</div>
              <div className="divider before:bg-white after:bg-white"></div>

              <ReactMarkdown
                children={code.documentation}
                className="prose"
                remarkPlugins={[remarkGfm]}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CodeView;

CodeView.PageLayout = DashboardLayout;
