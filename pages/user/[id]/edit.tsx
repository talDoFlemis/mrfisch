import DashboardLayout from "@components/layout/DashboardLayout";
import Head from "next/head";
import { ReactElement, useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import UserForm from "@components/user/UserForm";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { reloadSession } from "@utils/reloadSession";

const Profile = ({ user }: Session) => {
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);

  const uploadAvatar = async (data: any) => {
    try {
      const formData = new FormData();
      const file = data[0];
      const filePath = `${user?.email}`;
      formData.append("file", file);
      formData.append("upload_preset", "mr_fisch");
      formData.append("public_id", filePath);
      const resp = await axios.post(
        "https://api.cloudinary.com/v1_1/flemis/image/upload",
        formData
      );

      return resp.data.secure_url;
    } catch (err) {
      const error = err as Error | AxiosError;
      toast.error(`Unable to change the profile image, ${error.message}`);
    } finally {
      setIsPosting(false);
    }
  };

  const updateProfile = async (data: Session["user"]) => {
    setIsPosting(true);
    const updateData: {
      id: string;
      name: string;
      image: string | undefined;
      isNew: boolean;
    } = {
      id: user.id,
      name: data.name as string,
      image: user.image ?? undefined,
      isNew: false,
    };

    try {
      if (typeof data.image === "object") {
        updateData.image = await uploadAvatar(data.image);
      }

      await axios.post(`/api/user/${router.query.id}/profile`, updateData);
      toast.success("Profile updated with success");
      reloadSession();
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
        <button
          className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent"
          onClick={() => router.back()}
        >
          <AiOutlineArrowLeft className="w-6 h-6 md:w-8 md:h-8" aria-hidden />
          <p className="hidden md:inline-flex">Go back</p>
        </button>
        <div className="flex gap-x-3 justify-between items-center">
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
          <label
            className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
            htmlFor="drawer"
          >
            <HiOutlineMenu className="w-6 h-6" />
          </label>
        </div>
      </div>
      <UserForm initialValues={user} postOperation={updateProfile} />
    </main>
  );
};

export default Profile;

Profile.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session || session.user.id !== context?.params?.id) {
    return {
      redirect: {
        destination: "/stop",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: session.user,
    },
  };
};
