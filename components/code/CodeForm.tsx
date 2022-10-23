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
import { UserState } from "@supabase/auth-helpers-shared";

const schema = yup
  .object({
    codeTitle: yup.string().required("Title is a required field"),
    codeBlock: yup.string().required("Code block is a required field"),
    description: yup.string(),
    documentation: yup.string(),
    tags: yup.array().min(0),
    language: yup.string().required("Language is a required field"),
  })
  .required();

interface CodeFormProps {
  postOperation: any;
  initialValues?: CustomCodeInterface;
  user?: UserState;
}

interface CustomCodeInterface extends Omit<CodeInterface, "tags"> {
  tags: string[];
}

const CodeForm = ({ postOperation, initialValues, user }: CodeFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    reset,
    formState: { errors },
  } = useForm<CustomCodeInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      codeTitle: initialValues?.codeTitle ?? "",
      description: initialValues?.description ?? "",
      codeBlock: initialValues?.codeBlock ?? "",
      tags: initialValues?.tags ?? [],
      language: initialValues?.language ?? "c",
      documentation: initialValues?.documentation ?? "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (initialValues) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updatedAt, createdAt, user, ...data } = initialValues;

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
      className="gap-y-4 p-4 w-full form-control"
      id="form"
    >
      <div>
        <label
          className="justify-start text-xl font-bold label"
          htmlFor="code-title"
        >
          Title{" "}
          <BiReset
            className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
            onClick={() => resetField("codeTitle")}
          />
        </label>
        {errors.codeTitle && (
          <span
            className="pt-0 font-bold label text-accent"
            id="code-title-error"
          >
            {errors.codeTitle?.message}
          </span>
        )}
        <small className="pt-0 label" id="code-title-help">
          <span className="label-text">Add a code title</span>
        </small>{" "}
      </div>
      <input
        id="code-title"
        placeholder="Enter code title"
        aria-describedby="code-title-help"
        aria-errormessage="code-title-error"
        aria-invalid={errors?.codeTitle ? true : false}
        {...register("codeTitle")}
        className="input input-bordered input-primary bg-neutral"
      />{" "}
      <div>
        <label
          className="justify-start text-xl font-bold label"
          htmlFor="description"
        >
          Description
          <BiReset
            className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
            onClick={() => resetField("description")}
          />
        </label>
        <small className="pt-0 label" id="description-help">
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
        <label className="justify-start text-xl font-bold label" htmlFor="tags">
          Tags
          <BiReset
            className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
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
          <h1 className="flex items-center text-xl font-bold">
            Code
            <BiReset
              className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
              onClick={() => reset({ codeBlock: "", language: "css" })}
            />
          </h1>
          <div className="flex flex-col gap-y-4 justify-between items-center sm:flex-row">
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
          </div>
          <div>
            {errors.codeBlock && (
              <span
                className="pb-0 font-bold label text-accent"
                id="code-block-error"
              >
                {errors.codeBlock?.message}
              </span>
            )}
            <label htmlFor="code-block">Code Block</label>
            <div className="flex flex-col mt-2 lg:flex-row">
              <Controller
                control={control}
                name="codeBlock"
                render={({ field: { value, onChange } }) => (
                  <AutoSizeTextarea
                    setText={onChange}
                    text={value}
                    className="w-full"
                    id="code-block"
                    errormessage="code-block-error"
                    error={errors.codeBlock ? true : false}
                  />
                )}
              />
              <CodeHighlighter
                language={useWatch({ control, name: "language" })}
                input={useWatch({ control, name: "codeBlock" })}
                className="text-xs lg:w-full"
              />
            </div>
          </div>
          <div className="flex flex-col mt-4 space-y-2">
            <label className="flex text-xl font-bold" htmlFor="documentation">
              Documentation
              <BiReset
                className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
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
      {initialValues?.user?.id === user?.user?.id ? (
        <button type="submit" className="max-w-md btn btn-accent">
          Create
        </button>
      ) : (
        <button
          type="submit"
          className="max-w-md btn btn-accent"
          disabled
          aria-disabled
        >
          Create
        </button>
      )}
    </form>
  );
};

export default CodeForm;
