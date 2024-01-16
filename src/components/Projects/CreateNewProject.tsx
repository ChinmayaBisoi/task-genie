import { useState } from "react";
import Popup from "../common/Popup";
import { Button } from "../ui/button";
import CreateProjectForm from "./CreateProjectForm";

const CreateNewProject = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
        }}
        variant="secondary"
        className="h-24 hover:bg-neutral-200"
      >
        Create new project
      </Button>
      <Popup
        show={show}
        onClose={() => {
          setShow(false);
        }}
        className="rounded-none md:max-w-2xl md:rounded-lg"
      >
        <CreateProjectForm />
      </Popup>
    </>
  );
};

export default CreateNewProject;
