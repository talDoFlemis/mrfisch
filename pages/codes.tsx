import React, { ReactElement, useEffect, useState } from "react";
import CodesList from "../components/code/CodesList";
import DashboardLayout from "../components/layout/DashboardLayout";
import CodesHeader from "../components/code/CodesHeader";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import { UserInterface } from "typings";
import { useUser } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const Codes: NextPageWithLayout = () => {
  const { user, error } = useUser();
  const [userData, setUserData] = useState<UserInterface | null>();
  if (error) toast.error(`Unable to fetch user ${error.message}`);

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient
        .from<UserInterface>("profiles")
        .select("username, avatar_url, is_new")
        .eq("id", user?.id as string)
        .single();
      setUserData(data);
    }
    if (user) loadData();
  }, [user]);

  return (
    <main className="h-max w-full">
      <Head>
        <title>All Codes • Mr Fisch</title>
      </Head>
      <CodesHeader user={userData} />
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
