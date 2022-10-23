import { CodeInterface } from "../../typings";
import CodeCard from "./CodeCard";
import LoadingComponent from "@components/layout/LoadingComponent";
import { useQuery } from "hooks/useQuery";
import { toast } from "react-toastify";

const CodesList = () => {
  const { data: codes, error } = useQuery<CodeInterface[]>("/api/codes/all");
  if (error) toast.error(`Failed to fetch codes, ${error}`);
  return (
    <>
      <h2 className="flex gap-x-4 p-4 text-4xl">Most recent codes</h2>
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
              codeTitle={code.codeTitle}
              description={code.description}
              updatedAt={code.updatedAt}
              codeBlock={code.codeBlock}
              user={code.user}
              className="min-h-52 bg-neutral"
              tags={code.tags}
              hit={undefined}
              createdAt={code.createdAt}
              language={code.language}
              numberOfHits={code.numberOfHits}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CodesList;
