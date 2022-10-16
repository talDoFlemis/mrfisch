import DashboardLayout from "@components/layout/DashboardLayout";
import Head from "next/head";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { IconArrowLeft } from "@supabase/ui";
import { HiOutlineMenu } from "react-icons/hi";
import UserForm from "@components/user/UserForm";
import { UserInterface } from "typings";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import {
  getUser,
  supabaseClient,
  supabaseServerClient,
  User,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";

interface ProfileProps {
  userData: UserInterface;
  user: User;
}

const Profile = ({ user, userData }: ProfileProps) => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const uploadAvatar = async (data: any) => {
    try {
      const file = data[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.email}.${fileExt}`;

      const { error: uploadError } = await supabaseClient.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const publicUrl = `https://gmltbufzxjrgpbxxywpk.supabase.co/storage/v1/object/public/avatars/${filePath}`;

      return publicUrl;
    } catch (err) {
      const error = err as Error | AxiosError;
      toast.error(`Unable to change the profile image, ${error.message}`);
    } finally {
      setIsPosting(false);
    }
  };

  const updateProfile = async (data: UserInterface) => {
    setIsPosting(true);
    const updateData: {
      id: string;
      username: string;
      avatar_url: string | undefined;
      is_new: boolean;
    } = {
      id: user.id,
      username: data.username,
      avatar_url: userData.avatar_url ?? undefined,
      is_new: false,
    };

    try {
      if (typeof data.avatar_url === "object") {
        updateData.avatar_url = await uploadAvatar(data.avatar_url);
      }

      const { error } = await supabaseClient
        .from("profiles")
        .update(updateData)
        .eq("id", updateData.id);
      if (error) throw error;
      toast.success("Profile updated with success");
      router.push("/codes/");
    } catch (err) {
      const error = err as Error | AxiosError;
      toast.error(`Unable to change the profile, ${error.message}`);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <main className="w-full h-full font-raleway">
      <Head>
        <title>Updating profile • Mr Fisch</title>
      </Head>
      <div className="sticky top-0 z-10 justify-between bg-opacity-40 navbar bg-neutral backdrop-blur-sm">
        <Link href="/codes/">
          <a className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent">
            <IconArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
            <p className="hidden md:inline-flex">Go back</p>
          </a>
        </Link>
        <div className="flex gap-x-3 justify-between items-center">
          {user && (
            <div className="flex gap-4">
              {isPosting ? (
                <button
                  type="submit"
                  form="form"
                  className="mx-auto w-20 text-sm text-white border-none md:w-32 btn btn-disabled btn-sm lg:btn-md"
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
              )}
            </div>
          )}
          <label
            className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </label>
        </div>
      </div>
      <UserForm initialValues={userData} postOperation={updateProfile} />
    </main>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: "/login",
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const { data: userData } = await supabaseServerClient(ctx)
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();
    return { props: { user, userData } };
  },
});
