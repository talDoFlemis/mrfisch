import React, { ReactElement } from "react";
import { useAuth } from "../utils/authProvider";
import CodesList from "../components/code/CodesList";
import DashboardLayout from "../components/layout/DashboardLayout";
import CodesHeader from "../components/code/CodesHeader";
import { NextPageWithLayout } from "./_app";

const Codes: NextPageWithLayout = () => {
  const { user } = useAuth();

  return (
    <main className="w-full">
      <CodesHeader id={user?.id} />
      <CodesList />
    </main>
  );
};

Codes.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Codes;
