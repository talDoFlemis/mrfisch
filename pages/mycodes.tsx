import CodeCard from "@components/code/CodeCard";
import DashboardLayout from "@components/layout/DashboardLayout";
import prisma from "@utils/prisma";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { ReactElement } from "react";
import { BsCodeSlash } from "react-icons/bs";
import { CodeInterface } from "typings";
import { authOptions } from "./api/auth/[...nextauth]";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCreate } from "react-icons/md";
import Head from "next/head";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { HiOutlineMenu } from "react-icons/hi";

interface MyCodesProps {
  session: Session;
  codes: CodeInterface[];
}

const MyCodes = ({ codes }: MyCodesProps) => {
  const router = useRouter();
  return (
    <main className="flex flex-col gap-4 w-full h-max">
      <Head>
        <title>My Codes • Mr Fisch</title>
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
      <h2 className="flex gap-x-4 items-center p-4 text-5xl font-geo">
        My Codes <BsCodeSlash className="w-10 h-10" />
      </h2>
      <div className="grid grid-cols-1 gap-8 p-4 mx-auto md:grid-cols-2 xl:grid-cols-3 h-max">
        {codes?.length !== 0 ? (
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
              language={code.language}
            />
          ))
        ) : (
          <div className="flex flex-col col-span-full gap-y-4 justify-center items-center font-geo">
            <h3 className="text-2xl text-center">
              No code was found for this user
            </h3>
            <div className="relative w-52 h-40">
              <Image
                src="/img/yui.gif"
                layout="fill"
                objectFit="contain"
                alt="yui gif"
              />
            </div>
            <Link href="/create">
              <a className="btn btn-accent btn-lg">
                <MdOutlineCreate className="w-6 h-6" />
                <small className="text-base">create now</small>
              </a>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyCodes;
MyCodes.getLayout = function getLayout(page: ReactElement) {
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

  const codes = await prisma.code.findMany({
    where: { userId: session.user.id },
    include: { user: true },
  });

  return {
    props: {
      codes: JSON.parse(JSON.stringify(codes)),
    },
  };
};
