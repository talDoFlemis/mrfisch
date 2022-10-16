import { CodeInterface } from "../../typings";
import CodeCard from "./CodeCard";
import LoadingComponent from "@components/layout/LoadingComponent";
import { useQuery } from "hooks/useQuery";
import { toast } from "react-toastify";

const CodesList = () => {
  const { data: codes, error } = useQuery<CodeInterface[]>("/api/codes/all");
  if (!codes && !error) {
    return (
      <div className="flex justify-center items-center h-3/5">
        <LoadingComponent className="w-16 h-16 text-accent" />
      </div>
    );
  }

  if (error) toast.error(`Failed to fetch codes, ${error}`);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 p-4 mx-auto md:grid-cols-2 xl:grid-cols-3 h-max">
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
