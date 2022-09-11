import DashboardLayout from "@components/layout/DashboardLayout";
import Head from "next/head";
import { ReactElement } from "react";

interface settingsProps {}

const Settings = ({}: settingsProps) => {
  return (
    <main className="h-max w-full">
      <Head>
        <title>Settings • Mr Fisch</title>
      </Head>
      Will be a good settings page
    </main>
  );
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
