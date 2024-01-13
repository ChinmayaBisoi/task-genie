import React from "react";
import DashboardHeader from "./DashboardHeader";
import Projects from "../Projects/Projects";

const Dashboard = () => {
  return (
    <div className="p-4">
      <DashboardHeader />
      <div className="my-8">
        <Projects />
      </div>
    </div>
  );
};

export default Dashboard;
