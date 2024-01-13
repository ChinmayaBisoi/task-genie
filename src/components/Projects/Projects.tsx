import { UserRound } from "lucide-react";
import React from "react";
import CreateNewProject from "./CreateNewProject";

const Projects = () => {
  return (
    <div className="">
      <div className="flex items-center gap-2">
        <UserRound />
        <h2 className="text-lg font-medium capitalize">Your Projects</h2>
      </div>
      <div className="my-4 flex flex-wrap">
        <CreateNewProject />
      </div>
    </div>
  );
};

export default Projects;
