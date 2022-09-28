import React, { ReactElement, useState } from "react";
import { useAuth } from "../utils/authProvider";
import CodesList from "../components/code/CodesList";
import DashboardLayout from "../components/layout/DashboardLayout";
import CodesHeader from "../components/code/CodesHeader";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import { UserInterface } from "typings";

const Codes: NextPageWithLayout = () => {
  const { user } = useAuth();
  const [userData, setUser] = useState<UserInterface>();

  return (
    <main className="h-max w-full">
      <Head>
        <title>All Codes • Mr Fisch</title>
      </Head>
      <CodesHeader id={user?.id} user={userData} setUser={setUser} />
      <h1 className="p-4 text-2xl font-light text-base-content sm:text-3xl md:text-4xl">
        Welcome,{" "}
        <span className="font-spaceRave text-primary">
          {" "}
          {userData?.username || "anonymous"}
        </span>{" "}
      </h1>
      <CodesList />
    </main>
  );
};

Codes.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Codes;
