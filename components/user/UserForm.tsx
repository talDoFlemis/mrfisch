/* eslint-disable no-undef */
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { BiReset } from "react-icons/bi";
import * as yup from "yup";
import Image from "next/image";
import { Session } from "next-auth";

interface UserFormProps {
  initialValues: Session["user"];
  postOperation: any;
}

const schema = yup
  .object({
    name: yup.string().required("Please, input a name"),
    image: yup.mixed(),
  })
  .required();

const UserForm = ({ postOperation, initialValues }: UserFormProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<Session["user"]>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: initialValues?.name ?? "",
      image: initialValues?.image ?? "",
    },
    mode: "onBlur",
  });

  const [image, setImage] = useState(initialValues.image);

  const onImageChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <form
      id="form"
      onSubmit={handleSubmit(postOperation)}
      className="grid grid-rows-2 gap-16 place-content-center place-items-center p-8 w-full md:grid-cols-2 md:grid-rows-none"
    >
      <div className="flex flex-col gap-4 items-center">
        <div className="relative justify-self-end w-60 h-60 avatar">
          {image ? (
            <Image
              alt="avatar"
              src={image}
              layout="fill"
              objectFit="cover"
              className="mask mask-squircle"
            />
          ) : (
            <AiOutlineUser className="w-60 h-60 mask mask-squircle bg-neutral" />
          )}
        </div>
        <label htmlFor="formFile" className="label">
          Upload Image
        </label>
        <input
          type="file"
          {...register("image", {
            onChange: (e) => onImageChange(e),
          })}
          accept=".jpeg,.jpg,.png,.gif"
          className="cursor-pointer file:mr-4 file:rounded-full file:border-0 file:bg-primary file:py-2 file:px-4 file:text-sm file:font-semibold file:text-primary-content hover:file:bg-primary-focus"
          id="formFile"
        />
      </div>
      <div className="flex flex-col gap-6 justify-self-center items-center w-3/4 md:justify-self-start">
        <div className="w-full">
          <div className="flex justify-start items-center text-2xl font-bold font-geo">
            Username{" "}
            <BiReset
              className="ml-4 w-6 h-6 transition-colors cursor-pointer hover:text-accent"
              onClick={() => resetField("name")}
              aria-hidden
              aria-errormessage="name-error-message"
              aria-describedby="name-help-message"
            />
          </div>
          {errors.name && (
            <span
              className="pt-0 font-bold label text-accent"
              id="name-error-message"
            >
              {errors.name?.message}
            </span>
          )}
          <span className="label-text" id="name-help-message">
            Add your name to show in card creation
          </span>
        </div>
        <input
          placeholder="Enter your name"
          {...register("name")}
          className="w-full input input-bordered input-primary bg-neutral"
        />{" "}
      </div>
    </form>
  );
};

export default UserForm;
