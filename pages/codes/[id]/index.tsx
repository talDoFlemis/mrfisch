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
import StealCodeButton from "@components/code/StealCodeButton";
import CopyLink from "@components/code/CopyLink";
import { ReactElement, useEffect, useState } from "react";
import LoadingComponent from "@components/layout/LoadingComponent";
import Head from "next/head";
import { useQuery } from "hooks/useQuery";
import { toast } from "react-toastify";
import DeleteLinkModal from "@components/portulovers/DeleteLinkModal";
import { AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useUser } from "@supabase/auth-helpers-react";

const CodeView = () => {
  const router = useRouter();
  const { user } = useUser();
  const [linkToCopy, setLinkToCopy] = useState("");

  const { data: code, error } = useQuery<CodeInterface>(
    router.query.id ? `/api/codes/${router.query.id}` : null
  );

  if (error) {
    toast.error(`Unable to fetch the code, ${error}`);
  }

  const deleteCode = async () => {
    const id = router.query.id;
    try {
      await axios.delete(`/api/codes/${id}`);
      router.push("/codes");
      toast.success("Deleted code with success");
    } catch (err) {
      const error = err as Error;
      toast.error(`Unable to delete code, ${error.message}`);
    }
  };

  useEffect(() => {
    setLinkToCopy(location.href);
  }, []);

  return (
    <main className="flex flex-col w-full h-max font-raleway">
      <Head>
        <title>{code?.code_title ?? "Code"} • Mr Fisch</title>
      </Head>
      <div className="sticky top-0 z-10 justify-between bg-opacity-40 navbar bg-neutral backdrop-blur-sm">
        <Link href="/codes/">
          <a className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent">
            <IconArrowLeft className="w-8 h-8" />
            Go back
          </a>
        </Link>
        <label
          className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
          htmlFor="drawer"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </label>
      </div>
      <DeleteLinkModal
        title={code?.code_title as string}
        deleteOP={() => deleteCode()}
      />
      {!code ? (
        <div className="flex h-[60vh]">
          <LoadingComponent className="w-16 h-16 text-base-content" />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex flex-col gap-8 justify-between lg:flex-row">
            <CodeHighlighter
              input={code!.code_block}
              language={code.language}
              className="text-sm lg:w-full bg-neutral"
            />
            <div className="lg:w-1/4 card h-fit bg-neutral text-neutral-content">
              <div className="card-body">
                <h1 className="text-lg font-bold text-center">
                  {code?.code_title}
                </h1>
                <p className="whitespace-pre-wrap break-words">
                  {code?.description}
                </p>
                <div className="flex content-between items-center">
                  <p>Language</p>
                  <p className="font-bold text-right text-primary">
                    {code?.language}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Created</p>
                  <p className="text-right">
                    {moment(code?.inserted_at).format("L")}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Last updated</p>
                  <p className="text-right">
                    {moment(code?.updated_at).fromNow()}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Made by</p>
                  <p className="text-right">
                    {code.user?.username ?? "anonymous"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center pt-2 item-center">
                  {code.tags?.map((tag, index) => (
                    <div key={index} className="badge badge-secondary shrink-0">
                      {tag}
                    </div>
                  ))}
                </div>
                <div className="divider"></div>
                <CopyLink link={linkToCopy} />
                <StealCodeButton code={code.code_block} />
                {user?.id === code?.user?.id ? (
                  <Link href={`/codes/${router.query.id}/edit`}>
                    <a className="gap-2 justify-center text-black bg-white border-none shadow transition-colors hover:text-white btn btn-sm hover:bg-base-300">
                      <p>Edit</p>
                      <MdEdit className="w-6 h-6" />
                    </a>
                  </Link>
                ) : (
                  <button
                    className="gap-2 justify-center text-black border-none cursor-default btn btn-sm bg-base-100"
                    disabled
                  >
                    <p>Edit</p>
                    <MdEdit className="w-6 h-6" />
                  </button>
                )}
                {user?.id === code?.user?.id ? (
                  <label htmlFor="deletemodal">
                    <div className="w-full border-none transition-colors hover:text-white btn btn-secondary btn-sm">
                      <p>Delete Code</p>
                      <AiOutlineDelete className="w-6 h-6 shadow-accent" />
                    </div>
                  </label>
                ) : (
                  <button
                    className="w-full border-none transition-colors hover:text-white btn btn-secondary btn-sm"
                    disabled
                  >
                    <p>Delete Code</p>
                    <AiOutlineDelete className="w-6 h-6 shadow-accent" />
                  </button>
                )}
              </div>
            </div>
          </div>
          {code?.documentation && (
            <div>
              <div className="my-8 card bg-neutral text-neutral-content">
                <div className="card-body">
                  <div className="card-title">Documentation</div>
                  <div className="divider before:bg-base-300 after:bg-base-300"></div>
                  <ReactMarkdown
                    className="prose text-neutral-content"
                    remarkPlugins={[remarkGfm]}
                  >
                    {code.documentation}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
};

export default CodeView;

CodeView.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
