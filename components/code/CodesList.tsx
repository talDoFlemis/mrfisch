import { CodeInterface } from "../../typings";
import CodeCard from "./CodeCard";
import LoadingComponent from "@components/layout/LoadingComponent";
import { useQuery } from "hooks/useQuery";
import { toast } from "react-toastify";
import Link from "next/link";
import { MdOutlineCreate } from "react-icons/md";
import Image from "next/image";

const CodesList = () => {
  const { data: codes, error } = useQuery<CodeInterface[]>("/api/codes/all");
  if (error) toast.error(`Failed to fetch codes, ${error}`);
  return (
    <>
      <h2 className="flex gap-x-4 p-4 text-5xl font-geo">Most recent codes</h2>
      {!codes && !error ? (
        <div className="flex justify-center items-center h-3/5">
          <LoadingComponent className="w-16 h-16 text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 p-4 mx-auto md:grid-cols-2 xl:grid-cols-3 h-max">
          {codes?.length !== 0 ? (
            codes?.map((code) => (
              <CodeCard
                key={code.id}
                id={code.id}
                code_title={code.code_title}
                description={code.description}
                updated_at={code.updated_at}
                code_block={code.code_block}
                user={code.user}
                className="min-h-52 bg-neutral"
                tags={code.tags}
                hit={undefined}
                language={code.language}
              />
            ))
          ) : (
            <div className="flex flex-col col-span-full gap-y-4 justify-center items-center font-geo">
              <h3 className="text-2xl text-center">No code was found</h3>
              <div className="relative w-52 h-40">
                <Image
                  src="/img/yui.gif"
                  layout="fill"
                  objectFit="contain"
                  alt="yui gif"
                />
              </div>
              <Link href="/create">
                <a className="btn btn-accent btn-lg">
                  <MdOutlineCreate className="w-6 h-6" />
                  <small className="text-base">create now</small>
                </a>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CodesList;
