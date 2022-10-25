import CodeCard from "@components/code/CodeCard";
import DashboardLayout from "@components/layout/DashboardLayout";
import prisma from "@utils/prisma";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { ReactElement } from "react";
import { BsBookmarkHeart } from "react-icons/bs";
import { CodeInterface } from "typings";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";
import Head from "next/head";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";

interface FavoriteCodesProps {
  codes: CodeInterface[];
}

const FavoriteCodes = ({ codes }: FavoriteCodesProps) => {
  const router = useRouter();
  return (
    <main className="flex flex-col gap-4 w-full h-max">
      <Head>
        <title>Favorite Codes • Mr Fisch</title>
      </Head>
      <div className="sticky top-0 z-10 justify-between bg-opacity-40 navbar bg-neutral backdrop-blur-sm">
        <button
          className="flex items-center font-bold transition-colors cursor-pointer w-fit hover:text-accent"
          onClick={() => router.back()}
        >
          <AiOutlineArrowLeft className="w-6 h-6 md:w-8 md:h-8" aria-hidden />
          <p className="hidden md:inline-flex">Go back</p>
        </button>
        <label
          className="transition-colors cursor-pointer lg:hidden text-base-content hover:text-accent"
          htmlFor="drawer"
        >
          <HiOutlineMenu className="w-6 h-6" />
        </label>
      </div>
      <h2 className="flex gap-x-4 items-center p-4 text-4xl">
        Favorite Codes <BsBookmarkHeart className="w-10 h-10" />
      </h2>
      <div className="grid grid-cols-1 gap-8 p-4 mx-auto md:grid-cols-2 xl:grid-cols-3 h-max">
        {codes.length !== 0 ? (
          codes?.map((code) => (
            <CodeCard
              key={code.id}
              id={code.id}
              code_title={code.code_title}
              description={code.description}
              updated_at={code.updated_at}
              code_block={code.code_block}
              user={code.user}
              className="min-h-52 bg-neutral"
              tags={code.tags}
              hit={undefined}
              inserted_at={code.inserted_at}
              language={code.language}
              number_views={code.number_views}
              favorited_by={[]}
            />
          ))
        ) : (
          <div className="flex flex-col col-span-full gap-y-4 justify-center items-center">
            <h3 className="text-2xl text-center">
              No favorite code was found for this user
            </h3>
            <div className="relative w-52 h-40">
              <Image
                src="/img/yui.gif"
                layout="fill"
                objectFit="contain"
                alt="yui gif"
              />
            </div>
            <h3 className="text-xl text-center">
              Choose a code to view and it will be available to favorite
            </h3>
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoriteCodes;
FavoriteCodes.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/stop",
        permanent: false,
      },
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { favorite_codes: { include: { user: true } } },
  });

  return {
    props: {
      codes: JSON.parse(JSON.stringify(user?.favorite_codes)),
    },
  };
};
