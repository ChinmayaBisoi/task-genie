import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type FormState = {
  title: string;
  description: string;
  members: number[];
};

const defaultFormState: FormState = {
  title: "",
  description: "",
  members: [],
};

const CreateProjectForm = () => {
  const [{ title, description }, setProject] = useState(defaultFormState);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <>
      <h3 className="text-xl font-semibold">Create a project</h3>
      <div className="my-4 flex flex-col gap-4">
        <div>
          <Label htmlFor="title" className="pl-1">
            Title
          </Label>
          <Input id="title" required value={title} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="description" className="pl-1">
            Description{" "}
            <span className="text-xs text-neutral-400">( Optional )</span>
          </Label>
          <Input id="description" value={description} onChange={handleChange} />
        </div>

        <div></div>
      </div>
    </>
  );
};

export default CreateProjectForm;
