import { supabase } from "../../utils/supabaseClient";
import { useEffect, useState } from "react";
import { CodeInterface } from "../../typings";
import CodeCard from "./CodeCard";
interface GetCodesProps {}

const CodesList = ({}: GetCodesProps) => {
  const [codes, setCodes] = useState<CodeInterface[]>([]);

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    let { data, error } = await supabase
      .from("codes")
      .select(`*, user(avatar_url, username)`)
      .order("inserted_at", { ascending: false });
    if (error) console.log("error", error);
    if (data) {
      setCodes(data);
    }
  };

  console.log(codes);
  return (
    <div className="mx-auto grid h-max grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-3">
      {codes.map((code) => (
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
  );
};

export default CodesList;
