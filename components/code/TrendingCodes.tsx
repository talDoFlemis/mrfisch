import LoadingComponent from "@components/layout/LoadingComponent";
import { useQuery } from "hooks/useQuery";
import { BiRocket } from "react-icons/bi";
import { toast } from "react-toastify";
import { CodeInterface } from "typings";
import CodeCard from "./CodeCard";

const TrendingCodes = () => {
  const { data: codes, error } = useQuery<CodeInterface[]>(
    "/api/codes/trendingcodes"
  );
  if (error) toast.error(`Failed to fetch codes, ${error}`);

  return (
    <>
      <h2 className="flex gap-x-4 items-center p-4 text-5xl font-geo">
        Trending Codes <BiRocket className="w-10 h-10" />
      </h2>
      {!codes && !error ? (
        <div className="flex justify-center items-center h-3/5">
          <LoadingComponent className="w-16 h-16 text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 p-4 mx-auto md:grid-cols-2 xl:grid-cols-3 h-max">
          {codes?.map((code) => (
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
          ))}
        </div>
      )}
    </>
  );
};

export default TrendingCodes;
