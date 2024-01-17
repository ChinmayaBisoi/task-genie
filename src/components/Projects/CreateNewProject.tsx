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
        className="rounded-full"
      >
        Create project
      </Button>
      <Popup
        show={show}
        onClose={() => {
          setShow(false);
        }}
        className="mx-4 md:mx-0 md:max-w-2xl md:rounded-lg"
      >
        <CreateProjectForm />
      </Popup>
    </>
  );
};

export default CreateNewProject;
