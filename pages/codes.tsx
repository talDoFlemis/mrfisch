import React, { useState } from "react";
import { useAuth } from "../utils/authProvider";
import CodesList from "../components/code/CodesList";
import DashboardLayout from "../components/layout/DashboardLayout";
import CodesHeader from "../components/code/CodesHeader";
import { supabase } from "../utils/supabaseClient";
import { Auth } from "@supabase/ui";

const Codes = () => {
  const { user } = useAuth();

  // {!user && <Auth supabaseClient={supabase} />}
  return (
    <main className="w-full">
      <CodesHeader id={user?.id} />
      <CodesList />
    </main>
  );
};

Codes.PageLayout = DashboardLayout;

export default Codes;
