import DashboardLayout from "@components/layout/DashboardLayout";
import React, { ReactElement, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "hooks/useQuery";
import { CodeInterface } from "typings";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineMenu } from "react-icons/hi";
import CodeForm from "@components/code/CodeForm";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Head from "next/head";
import { useSession } from "next-auth/react";

const Edit = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const { id } = router.query;
  const { data: code, error } = useQuery<CodeInterface>(
    id ? `/api/codes/${id}` : null,
    false
  );

  if (error) toast.error(`Unable to create the code, ${error}`);

  const updateCode = async (data: CodeInterface) => {
    setIsPosting(true);

    try {
      await axios.put(`/api/codes/${id}`, data);
      toast.success("Updated with success");
      router.push(`/codes/${id}`);
    } catch (err) {
      const error = err as Error | AxiosError;
      toast.error(`Unable to create the code, ${error.message}`);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="w-full h-max font-raleway">
      <Head>
        <title>Edit • Mr Fisch</title>
      </Head>
      <div className="sticky top-0 z-10 justify-between bg-opacity-40 navbar bg-neutral backdrop-blur-sm">
        <Link href={`/codes/${id}`}>
          <a className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent">
            <AiOutlineArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            <p className="hidden md:inline-flex">Go back</p>
          </a>
        </Link>
        <div className="flex gap-x-3 justify-between items-center">
          {code?.user?.id === session?.user?.id ||
          code?.user?.id === undefined ? (
            <>
              {isPosting ? (
                <button
                  className="mx-auto w-20 text-sm text-white border-white md:w-32 btn btn-sm lg:btn-md"
                  disabled
                >
                  Updating
                </button>
              ) : (
                <button
                  type="submit"
                  form="form"
                  className="mx-auto w-20 text-sm text-white border-none md:w-32 btn btn-accent btn-sm lg:btn-md"
                >
                  Update
                </button>
              )}{" "}
            </>
          ) : (
            <button
              type="submit"
              form="form"
              className="mx-auto w-20 text-sm text-white border-none md:w-32 btn btn-accent btn-sm lg:btn-md"
              disabled
            >
              Update
            </button>
          )}
          <label
            className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </label>
        </div>
      </div>
      <CodeForm
        postOperation={updateCode}
        initialValues={code}
        user={session?.user}
      />
    </div>
  );
};

export default Edit;

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
