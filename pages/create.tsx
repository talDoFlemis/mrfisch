import DashboardLayout from "@components/layout/DashboardLayout";
import React, { ReactElement, useState } from "react";
import { CodeInterface } from "typings";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { IconArrowLeft } from "@supabase/ui";
import { HiOutlineMenu } from "react-icons/hi";
import { useRouter } from "next/router";
import CodeForm from "@components/code/CodeForm";
import { toast } from "react-toastify";
import Head from "next/head";

const Create = () => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const createCode = async (data: CodeInterface) => {
    setIsPosting(true);

    try {
      await axios.post("/api/codes/all", data);
      toast.success("Created code with success", { theme: "dark" });
      router.push("/codes");
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        toast.error(`Unable to create the code, ${error.message}`, {
          theme: "dark",
        });
      }
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <main className="h-max w-full font-raleway">
      <Head>
        <title>Create • Mr Fisch</title>
      </Head>
      <div className="navbar sticky top-0 z-10 justify-between bg-neutral  bg-opacity-40 backdrop-blur-sm">
        <Link href="/codes/">
          <a className="flex w-fit cursor-pointer items-center font-bold transition-colors hover:text-red-500">
            <IconArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
            <p className="hidden md:inline-flex">Go back</p>
          </a>
        </Link>
        <div className="flex items-center justify-between gap-x-3">
          {isPosting ? (
            <button
              className="btn btn-sm  mx-auto w-20 border-white  text-sm text-white md:w-32 lg:btn-md"
              disabled
            >
              Creating
            </button>
          ) : (
            <button
              type="submit"
              form="form"
              className="btn btn-accent btn-sm mx-auto w-20 border-none text-sm text-white md:w-32 lg:btn-md"
            >
              Create
            </button>
          )}
          <label
            className="cursor-pointer text-white transition-colors hover:text-accent lg:hidden"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </label>
        </div>
      </div>
      <CodeForm postOperation={createCode} />
    </main>
  );
};

Create.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Create;
