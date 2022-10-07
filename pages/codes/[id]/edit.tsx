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
import { useUser } from "@supabase/auth-helpers-react";

const Edit = () => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);
  const { user } = useUser();

  const { id } = router.query;
  const { data: code, error } = useQuery<CodeInterface>(
    id ? `/api/codes/${id}` : null
  );

  if (error) {
    toast.error(`Unable to create the code, ${error}`, {
      theme: "dark",
    });
  }

  const updateCode = async (data: CodeInterface) => {
    setIsPosting(true);

    try {
      await axios.put(`/api/codes/${id}`, data);
      toast.success("Updated with success", { theme: "dark" });
      router.push(`/codes/${id}`);
    } catch (err) {
      const error = err as Error | AxiosError;
      toast.error(`Unable to create the code, ${error.message}`);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="h-max w-full font-raleway">
      <Head>
        <title>Edit • Mr Fisch</title>
      </Head>
      <div className="navbar sticky top-0 z-10 justify-between bg-neutral  bg-opacity-40 backdrop-blur-sm">
        <Link href={`/codes/${id}`}>
          <a className="flex w-fit cursor-pointer items-center font-bold transition-colors hover:text-accent">
            <AiOutlineArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
            <p className="hidden md:inline-flex">Go back</p>
          </a>
        </Link>
        <div className="flex items-center justify-between gap-x-3">
          {code?.user?.id === user?.id || code?.user?.id === undefined ? (
            <>
              {isPosting ? (
                <button
                  className="btn btn-sm  mx-auto w-20 border-white  text-sm text-white md:w-32 lg:btn-md"
                  disabled
                >
                  Updating
                </button>
              ) : (
                <button
                  type="submit"
                  form="form"
                  className="btn btn-accent btn-sm mx-auto w-20 border-none text-sm text-white md:w-32 lg:btn-md"
                >
                  Update
                </button>
              )}{" "}
            </>
          ) : (
            <button
              type="submit"
              form="form"
              className="btn btn-accent btn-sm mx-auto w-20 border-none text-sm text-white md:w-32 lg:btn-md"
              disabled
            >
              Update
            </button>
          )}
          <label
            className="cursor-pointer text-base-content transition-colors hover:text-accent lg:hidden"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </label>
        </div>
      </div>
      <CodeForm postOperation={updateCode} initialValues={code} />
    </div>
  );
};

export default Edit;

Edit.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
