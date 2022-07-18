import DashboardLayout from "@components/layout/DashboardLayout";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch, Controller } from "react-hook-form";
import CodeHighlighter from "@components/code/CodeHighlighter";
import LanguageSelector from "@components/code/LanguageSelector";
import AutoSizeTextarea from "@components/layout/AutoSizeTextarea";
import React, { useState } from "react";
import { CodeInterface } from "typings";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { IconArrowLeft } from "@supabase/ui";
import { HiOutlineMenu } from "react-icons/hi";
import { BiReset } from "react-icons/bi";
import Tags from "@components/layout/Tags";
import cl from "clsx";
import Alert from "@components/layout/Alert";
import { useAlert } from "hooks/useAlert";
import { useRouter } from "next/router";

const schema = yup
  .object({
    code_title: yup.string().required("Title is a required field"),
    code_block: yup.string().required("Code is a required field"),
    description: yup.string(),
    documentation: yup.string(),
    tags: yup.array().min(0),
    language: yup.string().required("Language is a required field"),
    is_public: yup.boolean().required(),
  })
  .required();

const Create = ({}) => {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    reset,
    formState: { errors },
  } = useForm<CodeInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      language: "css",
    },
    mode: "onBlur",
  });

  const languageList = ["javascript", "python", "css"];

  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(true);
  const [isPosting, setIsPosting] = useState(true);
  const [hasAlert, setHasAlert] = useAlert();

  const createCode = async (data: CodeInterface) => {
    setIsPosting(true);

    try {
      const resp = await axios.post("/api/codes/all", data);
      setHasAlert({ alertType: "success", message: "Created with success" });
      router.push("/codes");
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        setHasAlert({ alertType: "error", message: error.message });
      }
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div
      className="h-max w-full font-raleway"
      onScroll={() => console.log("aoeu")}
    >
      <div
        className={cl(
          "navbar sticky top-0 z-10 justify-between ",
          isScrolled && "bg-neutral  bg-opacity-40 backdrop-blur-sm"
        )}
      >
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
      <Alert message={hasAlert.message} alertType={hasAlert.alertType} />
      <form
        onSubmit={handleSubmit(createCode)}
        className="form-control w-full  gap-y-4 p-4"
        id="form"
      >
        <div>
          <label className="label justify-start text-xl font-bold sm:text-2xl">
            Title{" "}
            <BiReset
              className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
              onClick={() => resetField("code_title")}
            />
          </label>
          {errors.code_title && (
            <label className="label pt-0 font-bold text-accent">
              {errors.code_title?.message}
            </label>
          )}
          <label className="label pt-0">
            <span className="label-text">Add a code title</span>
          </label>{" "}
        </div>
        <input
          placeholder="Enter code title"
          {...register("code_title")}
          className="input input-bordered input-primary bg-neutral"
        />{" "}
        <div>
          <label className="label justify-start text-xl font-bold sm:text-2xl">
            Description
            <BiReset
              className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
              onClick={() => resetField("description")}
            />
          </label>
          <label className="label pt-0">
            <span className="label-text">
              Add a code description for quick reference
            </span>
          </label>{" "}
        </div>
        <input
          placeholder="Enter code description"
          {...register("description")}
          className="input input-bordered input-primary bg-neutral"
        />{" "}
        <div>
          <label className="label justify-start text-xl font-bold sm:text-2xl">
            Tags
            <BiReset
              className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
              onClick={() => resetField("tags")}
            />
          </label>
          <label className="label pt-0">
            <span className="label-text">
              Create new tags or add previous one
            </span>
          </label>{" "}
        </div>
        <Controller
          control={control}
          name="tags"
          render={({ field: { value, onChange } }) => (
            <Tags onChange={onChange} initialValues={value} />
          )}
        />
        <div className="card bg-neutral">
          <div className="card-body">
            <h1 className="flex items-center text-xl font-bold sm:text-2xl">
              Code
              <BiReset
                className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
                onClick={() => reset({ code_block: "", language: "css" })}
              />
            </h1>
            <div className="flex flex-col items-center justify-between gap-y-4 sm:flex-row">
              <Controller
                control={control}
                name="language"
                render={({ field: { value, onChange } }) => (
                  <LanguageSelector
                    onChange={onChange}
                    languages={languageList}
                    value={value}
                  />
                )}
              />
              <div className="flex items-center gap-x-2">
                <label>Public</label>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                  {...register("is_public")}
                />
              </div>
            </div>
            {errors.code_block && (
              <label className="label pb-0 font-bold text-accent">
                {errors.code_block?.message}
              </label>
            )}
            <div className="mt-4 flex flex-col lg:flex-row">
              <Controller
                control={control}
                name="code_block"
                render={({ field: { value, onChange } }) => (
                  <AutoSizeTextarea
                    setText={onChange}
                    text={value}
                    className="w-full lg:w-1/2"
                  />
                )}
              />
              <CodeHighlighter
                language={useWatch({ control, name: "language" })}
                input={useWatch({ control, name: "code_block" })}
                theme="dracula"
                className="text-sm lg:w-1/2"
              />
            </div>
            <div className="mt-4 flex flex-col space-y-2">
              <h1 className="flex text-xl font-bold sm:text-2xl">
                Documentation
                <BiReset
                  className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
                  onClick={() => reset({ documentation: "", language: "css" })}
                />
              </h1>
              <h3 className="label-text">In markdown</h3>
              <Controller
                control={control}
                name="documentation"
                render={({ field: { value, onChange } }) => (
                  <AutoSizeTextarea
                    setText={onChange}
                    text={value as string}
                    className="mt-4"
                  />
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;

Create.PageLayout = DashboardLayout;
