import React from "react";
import { Button } from "../ui/button";

const Team = () => {
  return (
    <div>
      <h4 className="border-b border-neutral-200 pb-2 text-lg font-medium text-brand-dark">
        Manage your colaborations
      </h4>
      <div className="my-4 flex items-center justify-between">
        <h5 className="text-lg font-medium text-brand-dark">Members</h5>
        <Button>Add member</Button>
      </div>
    </div>
  );
};

export default Team;
