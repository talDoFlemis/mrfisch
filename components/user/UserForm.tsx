/* eslint-disable no-undef */
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import { UserInterface } from "typings";
import * as yup from "yup";
import Image from "next/image";

interface UserFormProps {
  initialValues: UserInterface | undefined;
  postOperation: any;
}

const schema = yup
  .object({
    username: yup.string().required("Please, input a username"),
    avatar_url: yup.mixed(),
  })
  .required();

const UserForm = ({ postOperation, initialValues }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm<UserInterface>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: initialValues?.username ?? "",
      avatar_url: initialValues?.avatar_url ?? "",
    },
    mode: "onBlur",
  });

  const [image, setImage] = useState("");

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  useEffect(() => {
    if (initialValues) {
      const { ...data } = initialValues;
      console.log(initialValues);

      reset(data);
    }
  }, [initialValues]);

  return (
    <form
      id="form"
      onSubmit={handleSubmit(postOperation)}
      className="grid w-full grid-rows-2 place-content-center place-items-center gap-16 p-8 md:grid-cols-2  md:grid-rows-none"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="avatar relative h-60 w-60 justify-self-end">
          {initialValues?.avatar_url || image ? (
            <Image
              alt="avatar"
              src={initialValues?.avatar_url ?? image}
              layout="fill"
              objectFit="cover"
              className="mask mask-squircle"
            />
          ) : (
            <AiOutlineUser className="mask mask-squircle h-60 w-60 bg-neutral" />
          )}
        </div>
        <label htmlFor="formFile" className="label">
          Upload Image
        </label>
        <input
          type="file"
          {...register("avatar_url", {
            onChange: (e) => onImageChange(e),
          })}
          className="cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-primary file:py-2 file:px-4 file:text-sm file:font-semibold file:text-primary-content hover:file:bg-primary-focus"
          id="formFile"
        />
      </div>
      <div className="flex flex-col gap-6 justify-self-start">
        <div>
          <label className="label justify-start text-xl font-bold sm:text-2xl">
            Username{" "}
            <BiReset
              className="ml-4 h-6 w-6 cursor-pointer transition-colors hover:text-accent"
              onClick={() => resetField("username")}
            />
          </label>
          {errors.username && (
            <label className="label pt-0 font-bold text-accent">
              {errors.username?.message}
            </label>
          )}
          <label className="label pt-0">
            <span className="label-text">
              Add your username to show in card creation
            </span>
          </label>{" "}
        </div>
        <input
          placeholder="Enter your username"
          {...register("username")}
          className="input input-bordered input-primary bg-neutral"
        />{" "}
      </div>
    </form>
  );
};

export default UserForm;
