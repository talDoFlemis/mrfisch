import React from "react";
import { useAuth } from "../utils/authProvider";
import CodesList from "../components/code/CodesList";
import DashboardLayout from "../components/layout/DashboardLayout";
import CodesHeader from "../components/code/CodesHeader";

const Codes = () => {
  const { user } = useAuth();

  return (
    <main className="w-full">
      <CodesHeader id={user?.id} />
      <CodesList />
    </main>
  );
};

Codes.PageLayout = DashboardLayout;

export default Codes;
