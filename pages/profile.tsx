import DashboardLayout from "@components/layout/DashboardLayout";
import Head from "next/head";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { NextPageWithLayout } from "./_app";
import { TbUserExclamation } from "react-icons/tb";
import { IconArrowLeft } from "@supabase/ui";
import { HiOutlineMenu } from "react-icons/hi";
import UserForm from "@components/user/UserForm";
import { UserInterface } from "typings";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { supabase } from "@utils/supabaseClient";
import { useAuth } from "@utils/authProvider";

const Profile: NextPageWithLayout = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserInterface>();
  const [isPosting, setIsPosting] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      let { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id)
        .single();
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      const error = err as Error | AxiosError;
      toast.error(`Unable to get the profile, ${error.message}`);
    }
  };

  const uploadAvatar = async (data: any) => {
    try {
      const file = data[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.email}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const publicUrl = `https://gmltbufzxjrgpbxxywpk.supabase.co/storage/v1/object/public/avatars/${filePath}`;

      return publicUrl;
    } catch (err) {
      const error = err as Error | AxiosError;
      toast.error(`Unable to create the code, ${error.message}`);
    } finally {
      setIsPosting(false);
    }
  };

  const updateProfile = async (data: UserInterface) => {
    setIsPosting(true);
    let updateData: {
      id: string;
      username: string;
      avatar_url: string | undefined;
      is_new: boolean;
    } = {
      id: user.id,
      username: data.username,
      avatar_url: undefined,
      is_new: false,
    };

    try {
      if (data.avatar_url) {
        updateData.avatar_url = await uploadAvatar(data.avatar_url);
      }
      await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", updateData.id);
      toast.success("Updated with success");
      router.push("/codes/");
    } catch (err) {
      const error = err as Error | AxiosError;
      toast.error(`Unable to change the profile, ${error.message}`);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <main className="h-full w-full font-raleway">
      <Head>
        <title>Updating profile • Mr Fisch</title>
      </Head>
      <div className="navbar sticky top-0 z-10 justify-between bg-neutral  bg-opacity-40 backdrop-blur-sm">
        <Link href="/codes/">
          <a className="flex w-fit cursor-pointer items-center font-bold transition-colors hover:text-accent">
            <IconArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
            <p className="hidden md:inline-flex">Go back</p>
          </a>
        </Link>
        <div className="flex items-center justify-between gap-x-3">
          {user && (
            <div className="flex gap-4">
              {isPosting ? (
                <button
                  type="submit"
                  form="form"
                  className="btn btn-disabled btn-sm mx-auto w-20 border-none text-sm text-white md:w-32 lg:btn-md"
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
              )}
            </div>
          )}
          <label
            className="cursor-pointer text-base-content transition-colors hover:text-accent lg:hidden"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="h-6 w-6" />
          </label>
        </div>
      </div>
      {!user ? (
        <div className="flex h-3/5 flex-col items-center justify-center gap-4">
          <TbUserExclamation className="h-14 w-14" />
          <h1 className="text-xl lg:text-2xl">No user found to update</h1>
          <h2 className="text-lg lg:text-xl">Please, log in to continue</h2>
          <Link href="/login">
            <a className="btn btn-accent btn-lg">Log In</a>
          </Link>
        </div>
      ) : (
        <UserForm initialValues={profile} postOperation={updateProfile} />
      )}
    </main>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
