import React, { useState } from "react";
import { useAuth } from "../utils/authProvider";
import CodesList from "../components/code/CodesList";
import DashboardLayout from "../components/layout/DashboardLayout";
import CodesHeader from "../components/code/CodesHeader";
import { supabase } from "../utils/supabaseClient";
import { Auth } from "@supabase/ui";

const Codes = () => {
  const [theme, setTheme] = useState("dracula");
  const [input, setInput] = useState("import React from 'react';");
  const { user, view, signOut } = useAuth();

  return (
    <main className="w-full">
      {!user && <Auth supabaseClient={supabase} />}
      <CodesHeader id={user?.id} />
      <CodesList />
    </main>
  );
};

Codes.PageLayout = DashboardLayout;

export default Codes;
