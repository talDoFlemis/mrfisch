import DashboardLayout from "@components/layout/DashboardLayout";
import { ReactElement } from "react";

interface settingsProps {}

const Settings = ({}: settingsProps) => {
  return <div className="h-max w-full">Will be a good settings page</div>;
};

export default Settings;

Settings.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
