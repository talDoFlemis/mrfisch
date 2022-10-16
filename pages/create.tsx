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
      const { data: resp } = await axios.post("/api/codes/all", data);
      console.log(resp, "axios response");
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
    <div className="w-full h-max font-raleway">
      <Head>
        <title>Create • Mr Fisch</title>
      </Head>
      <div className="sticky top-0 z-10 justify-between bg-opacity-40 navbar bg-neutral backdrop-blur-sm">
        <Link href="/codes/">
          <a className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent">
            <IconArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            <p className="hidden md:inline-flex">Go back</p>
          </a>
        </Link>
        <div className="flex gap-x-3 justify-between items-center">
          {isPosting ? (
            <button
              className="mx-auto w-20 text-sm text-white border-white md:w-32 btn btn-sm lg:btn-md"
              disabled
            >
              Creating
            </button>
          ) : (
            <button
              type="submit"
              form="form"
              className="mx-auto w-20 text-sm text-white border-none md:w-32 btn btn-accent btn-sm lg:btn-md"
            >
              Create
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
      <CodeForm postOperation={createCode} />
    </div>
  );
};

Create.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Create;
