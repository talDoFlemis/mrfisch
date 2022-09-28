import { CodeInterface } from "../../typings";
import CodeCard from "./CodeCard";
import LoadingComponent from "@components/layout/LoadingComponent";
import { useQuery } from "hooks/useQuery";

const CodesList = () => {
  const { data: codes, error } = useQuery<CodeInterface[]>("/api/codes/all");

  if (!codes && !error) {
    return (
      <div className="flex h-3/5 items-center justify-center">
        <LoadingComponent className="h-16 w-16 text-red-500" />
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto grid h-max grid-cols-1 gap-8 p-4 md:grid-cols-2 xl:grid-cols-3">
        {codes?.map((code) => (
          <CodeCard
            key={code.id}
            id={code.id}
            code_title={code.code_title}
            description={code.description}
            updated_at={code.updated_at}
            code_block={code.code_block}
            is_public={code.is_public}
            user={code.user}
            className="min-h-52 bg-neutral"
            tags={code.tags}
          />
        ))}
      </div>
    </>
  );
};

export default CodesList;
