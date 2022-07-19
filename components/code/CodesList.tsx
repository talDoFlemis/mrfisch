import { CodeInterface } from "../../typings";
import CodeCard from "./CodeCard";
import LoadingComponent from "@components/layout/LoadingComponent";
import { useQuery } from "hooks/useQuery";
interface GetCodesProps {}

const CodesList = ({}: GetCodesProps) => {
  const { data: codes, error } = useQuery<CodeInterface[]>("/api/codes/all");

  if (!codes && !error) {
    return <LoadingComponent className="text-red-500" />;
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
            inserted_at={code.inserted_at}
            code_block={code.code_block}
            is_public={code.is_public}
            user={code.user}
          />
        ))}
      </div>
    </>
  );
};

export default CodesList;
