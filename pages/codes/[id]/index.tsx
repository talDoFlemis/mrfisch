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
import { AiOutlineArrowLeft, AiOutlineDelete } from "react-icons/ai";
import axios from "axios";
import { useSession } from "next-auth/react";
import AddToFavoriteBtn from "@components/code/AddToFavoriteBtn";
import CommentaryList from "@components/code/comments/CommentaryList";
import DeleteModal from "@components/layout/DeleteModal";

const CodeView = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [linkToCopy, setLinkToCopy] = useState("");
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    userId: "",
    isOpen: false,
  });

  const { data: code, error } = useQuery<CodeInterface>(
    router.query.id ? `/api/codes/${router.query.id}` : null,
    false
  );

  if (error) {
    toast.error(`Unable to fetch the code, ${error.message}`);
  }

  const deleteCode = async (data: { id: string; userId: string }) => {
    try {
      await axios.delete(`/api/codes/${router.query.id}`, { data: data });
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
        <button
          className="flex items-center text-sm font-bold transition-colors cursor-pointer w-fit hover:text-accent"
          onClick={() => router.back()}
        >
          <AiOutlineArrowLeft className="w-6 h-6 md:w-8 md:h-8" aria-hidden />
          Go back
        </button>
        <label
          className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
          htmlFor="drawer"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </label>
      </div>
      <DeleteModal
        deleteModal={deleteModal}
        setDeleteModal={setDeleteModal}
        title="Are you sure U want do delete this code"
        postOperation={deleteCode}
      />
      {!code ? (
        <div className="flex h-[60vh]">
          <LoadingComponent className="w-16 h-16 text-base-content" />
        </div>
      ) : (
        <div className="p-4">
          <div className="flex flex-col gap-8 justify-between lg:flex-row">
            <CodeHighlighter
              input={code!.code_block as string}
              language={code.language}
              className="text-xs lg:w-full bg-neutral"
            />
            <div className="text-xs lg:w-1/4 card h-fit bg-neutral text-neutral-content">
              <div className="card-body">
                <h1 className="text-base font-bold text-center">
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
                  <p className="text-right">{code.user?.name ?? "anonymous"}</p>
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
                <StealCodeButton
                  code={code!.code_block as string}
                  codeId={code.id}
                />
                <AddToFavoriteBtn
                  session={session ?? undefined}
                  favorited_by={code.favorited_by}
                  codeId={code.id}
                />
                {session?.user?.id === code?.user?.id ? (
                  <>
                    <Link href={`/codes/${router.query.id}/edit`}>
                      <a className="gap-2 justify-center text-black bg-white border-none shadow transition-colors hover:text-white btn btn-sm hover:bg-base-300">
                        <p>Edit</p>
                        <MdEdit className="w-6 h-6" />
                      </a>
                    </Link>
                    <button
                      className="w-full border-none transition-colors hover:text-white btn btn-secondary btn-sm"
                      onClick={() =>
                        setDeleteModal({
                          id: router.query.id as string,
                          userId: session?.user.id as string,
                          isOpen: true,
                        })
                      }
                    >
                      <p>Delete Code</p>
                      <AiOutlineDelete className="w-6 h-6 shadow-accent" />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="gap-2 justify-center text-black border-none cursor-default btn btn-sm bg-base-100"
                      disabled
                    >
                      <p>Edit</p>
                      <MdEdit className="w-6 h-6" />
                    </button>
                    <button
                      className="w-full border-none transition-colors hover:text-white btn btn-secondary btn-sm"
                      disabled
                    >
                      <p>Delete Code</p>
                      <AiOutlineDelete className="w-6 h-6 shadow-accent" />
                    </button>
                  </>
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
          <CommentaryList user={session?.user} />
        </div>
      )}
    </main>
  );
};

export default CodeView;

CodeView.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
