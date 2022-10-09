import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch, Controller } from "react-hook-form";
import CodeHighlighter from "@components/code/CodeHighlighter";
import LanguageSelector from "@components/code/LanguageSelector";
import AutoSizeTextarea from "@components/layout/AutoSizeTextarea";
import React, { useEffect } from "react";
import { CodeInterface } from "typings";
import { BiReset } from "react-icons/bi";
import Tags from "@components/layout/Tags";

const schema = yup
  .object({
    code_title: yup.string().required("Title is a required field"),
    code_block: yup.string().required("Code block is a required field"),
    description: yup.string(),
    documentation: yup.string(),
    tags: yup.array().min(0),
    language: yup.string().required("Language is a required field"),
    is_public: yup.boolean().required(),
  })
  .required();

interface CodeFormProps {
  postOperation: any;
  initialValues?: CodeInterface;
}

const CodeForm = ({ postOperation, initialValues }: CodeFormProps) => {
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
      code_title: initialValues?.code_title ?? "",
      description: initialValues?.description ?? "",
      code_block: initialValues?.code_block ?? "",
      tags: initialValues?.tags ?? [],
      language: initialValues?.language ?? "c",
      documentation: initialValues?.documentation ?? "",
      is_public: initialValues?.is_public ?? true,
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialValues) {
      /* eslint-disable no-unused-vars */
      const { updated_at, inserted_at, user, ...data } = initialValues;

      reset(data);
    }
  }, [initialValues]);

  const languageList = [
    "javascript",
    "python",
    "css",
    "c",
    "cpp",
    "rust",
    "haskell",
    "ruby",
    "bash",
    "typescript",
    "yaml",
  ];
  return (
    <form
      onSubmit={handleSubmit(postOperation)}
      className="form-control w-full gap-y-4 p-4"
      id="form"
    >
      <div>
        <label
          className="label justify-start text-xl font-bold sm:text-2xl"
          htmlFor="code-title"
        >
          Title{" "}
          <BiReset
            className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
            onClick={() => resetField("code_title")}
          />
        </label>
        {errors.code_title && (
          <span
            className="label pt-0 font-bold text-accent"
            id="code-title-error"
          >
            {errors.code_title?.message}
          </span>
        )}
        <small className="label pt-0" id="code-title-help">
          <span className="label-text">Add a code title</span>
        </small>{" "}
      </div>
      <input
        id="code-title"
        placeholder="Enter code title"
        aria-describedby="code-title-help"
        aria-errormessage="code-title-error"
        aria-invalid={errors?.code_title ? true : false}
        {...register("code_title")}
        className="input input-bordered input-primary bg-neutral"
      />{" "}
      <div>
        <label
          className="label justify-start text-xl font-bold sm:text-2xl"
          htmlFor="description"
        >
          Description
          <BiReset
            className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
            onClick={() => resetField("description")}
          />
        </label>
        <small className="label pt-0" id="description-help">
          <span className="label-text">
            Add a code description for quick reference
          </span>
        </small>{" "}
      </div>
      <input
        id="description"
        aria-describedby="description-help"
        placeholder="Enter code description"
        {...register("description")}
        className="input input-bordered input-primary bg-neutral"
      />{" "}
      <div>
        <label
          className="label justify-start text-xl font-bold sm:text-2xl"
          htmlFor="tags"
        >
          Tags
          <BiReset
            className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
            onClick={() => resetField("tags")}
          />
        </label>
        <small className="label-text" id="tags-help">
          Create new tags or add previous one
        </small>
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
          <div>
            {errors.code_block && (
              <span
                className="label pb-0 font-bold text-accent"
                id="code-block-error"
              >
                {errors.code_block?.message}
              </span>
            )}
            <label htmlFor="code-block">Code Block</label>
            <div className="mt-4 flex flex-col lg:flex-row">
              <Controller
                control={control}
                name="code_block"
                render={({ field: { value, onChange } }) => (
                  <AutoSizeTextarea
                    setText={onChange}
                    text={value}
                    className="w-full"
                    id="code-block"
                    errormessage="code-block-error"
                    error={errors.code_block ? true : false}
                  />
                )}
              />
              <CodeHighlighter
                language={useWatch({ control, name: "language" })}
                input={useWatch({ control, name: "code_block" })}
                className="text-sm lg:w-full"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            <label
              className="flex text-xl font-bold sm:text-2xl"
              htmlFor="documentation"
            >
              Documentation
              <BiReset
                className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
                onClick={() => reset({ documentation: "", language: "css" })}
              />
            </label>
            <small className="label-text" id="documentation-help">
              In markdown
            </small>
            <Controller
              control={control}
              name="documentation"
              render={({ field: { value, onChange } }) => (
                <AutoSizeTextarea
                  setText={onChange}
                  text={value as string}
                  className="mt-4"
                  id="documentation"
                  describedby="documentation-help"
                  error={errors.documentation ? true : false}
                />
              )}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-accent">
        Create
      </button>
    </form>
  );
};

export default CodeForm;
