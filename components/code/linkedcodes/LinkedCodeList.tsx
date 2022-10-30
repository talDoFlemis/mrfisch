import Image from "next/image";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import YuiGif from "../../../public/img/yui.gif";
import { IoAddOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { useQuery } from "hooks/useQuery";
import { CodeInterface } from "typings";
import { useSWRConfig } from "swr";
import LoadingComponent from "@components/layout/LoadingComponent";
import LinkedCodeCard from "./LinkedCodeCard";
import Link from "next/link";
import ChangeLinkedCodesModal from "./ChangeLinkedCodesModal";

interface LinkedCodeListProps {
  user?: Session["user"];
  codeId: string;
  codeUserId?: string;
}

const LinkedCodeList = ({ user, codeId, codeUserId }: LinkedCodeListProps) => {
  const router = useRouter();
  const [addOpen, setAddOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { data: codes, error } = useQuery<CodeInterface[]>(
    router.query.id ? `/api/codes/${router.query.id}/associatedcodes` : null,
    false
  );

  const updatedLinked = async (data: CodeInterface[]) => {
    try {
      const resp = await axios.patch(
        `/api/codes/${router.query.id}/associatedcodes`,
        data
      );
      mutate(
        `/api/codes/${router.query.id}/associatedcodes`,
        async () => {
          return resp.data;
        },
        { revalidate: false }
      );
      toast.success("Codes associated with success");
    } catch (error) {
      const err = error as Error;
      toast.error(`Unable to associate the codes, ${err.message}`);
    } finally {
      setAddOpen(false);
    }
  };
  return (
    <div className="flex flex-col gap-y-4 my-4 w-full">
      {codes && (
        <ChangeLinkedCodesModal
          isOpen={addOpen}
          setIsOpen={setAddOpen}
          postOperation={updatedLinked}
          userId={codeUserId as string}
          parentId={codeId}
          previousAssociated={codes}
        />
      )}
      <div className="flex justify-between items-center text-4xl font-geo">
        <h1>Linked Codes</h1>
        {codeUserId && user?.id === codeUserId ? (
          <button
            className="text-base btn btn-primary btn-sm"
            onClick={() => setAddOpen(true)}
          >
            <IoAddOutline className="w-6 h-6" aria-hidden />
            Add
          </button>
        ) : (
          <button className="text-base btn btn-sm" disabled>
            <IoAddOutline className="w-6 h-6" aria-hidden />
            Add
          </button>
        )}
      </div>
      {!codes && !error ? (
        <div className="flex justify-center items-center h-3/5">
          <LoadingComponent className="w-16 h-16 text-accent" />
        </div>
      ) : codes?.length !== 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {codes?.map((code) => (
              <LinkedCodeCard
                key={code.id}
                code_title={code.code_title}
                code_block={code.code_block}
                description={code.description}
                id={code.id}
              />
            ))}
          </div>
          <div className="flex gap-x-2 items-center self-end">
            {/* <Link href={`/codes/${router.query.id}/associatedcodes`}> */}
            {/*   <a className="text-lg uppercase transition-colors cursor-pointer font-geo hover:text-accent"> */}
            {/*     Show More */}
            {/*   </a> */}
            {/* </Link> */}
            <button className="text-base btn btn-sm font-geo btn-secondary">
              download all
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-y-2 justify-center items-center text-center">
          <h3 className="mx-auto text-2xl font-geo">
            There is no codes associated to this code
          </h3>
          {codeUserId && user?.id === codeUserId && (
            <p className="mx-auto text-xl font-geo">
              Click on the ADD code button to add a new code
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default LinkedCodeList;
