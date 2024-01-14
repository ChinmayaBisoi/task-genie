import React from "react";
import UserHeader from "../common/UserHeader";
import Projects from "../Projects/Projects";

const Dashboard = () => {
  return (
    <div className="p-4">
      <UserHeader />
      <div className="my-8">
        <Projects />
      </div>
    </div>
  );
};

export default Dashboard;
