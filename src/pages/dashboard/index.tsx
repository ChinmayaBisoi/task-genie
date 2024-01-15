import React, { ReactElement } from "react";
import Dashboard from "~/components/Dashboard/Dashboard";
import Layout from "~/components/layout/Layout";

const DashboardPage = () => {
  return (
    <div>
      <Dashboard />
    </div>
  );
};

DashboardPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DashboardPage;
