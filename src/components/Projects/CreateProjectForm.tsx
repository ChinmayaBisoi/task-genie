import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/router";

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
  const router = useRouter();
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProject((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const createProjectMutation = api.project.createProject.useMutation();

  async function handleCreateProject() {
    try {
      await createProjectMutation
        .mutateAsync({ title, description })
        .then((res) => {
          router.push(`/project/${res.id}`);
        });
      toast({ title: "Project created." });
    } catch (err: any) {
      toast({ title: err.message, variant: "error" });
    }
  }

  return (
    <>
      <h3 className="text-xl font-semibold">Create a project</h3>
      <div className="my-4 flex flex-col gap-4">
        <div>
          <Label htmlFor="title" className="pl-3">
            Title
          </Label>
          <Input
            id="title"
            name="title"
            placeholder="Add a title..."
            required
            value={title}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label htmlFor="description" className="pl-1">
            Description{" "}
            <span className="text-xs text-neutral-400">( Optional )</span>
          </Label>
          <Input
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleCreateProject}
            disabled={title.length === 0 || createProjectMutation.isLoading}
            loading={createProjectMutation.isLoading}
            className="mt-4 px-8"
          >
            Create
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreateProjectForm;
