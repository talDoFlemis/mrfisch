import React, { ReactElement } from "react";
import CodesList from "../components/code/CodesList";
import DashboardLayout from "../components/layout/DashboardLayout";
import CodesHeader from "../components/code/CodesHeader";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import { useSession } from "next-auth/react";
import TrendingCodes from "@components/code/TrendingCodes";

const Codes: NextPageWithLayout = () => {
  const { data: session } = useSession();

  return (
    <main className="w-full h-max">
      <Head>
        <title>All Codes • Mr Fisch</title>
      </Head>
      <CodesHeader user={session?.user} />
      <h1 className="p-4 text-4xl font-light text-base-content">
        Welcome,{" "}
        <span className="font-spaceRave text-primary">
          {" "}
          {session?.user?.name || "anonymous"}
        </span>{" "}
      </h1>
      <TrendingCodes />
      <CodesList />
    </main>
  );
};

Codes.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Codes;
