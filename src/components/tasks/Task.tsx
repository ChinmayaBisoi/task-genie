import { format } from "date-fns";
import { GripVertical } from "lucide-react";
import React, { useRef, useState } from "react";
import useOutsideClick from "~/hooks/useOutsideClick";
import { RouterOutputs, api } from "~/utils/api";
import Popup from "../common/Popup";
import TaskForm from "./TaskForm";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { Badge } from "../ui/badge";

type ProjectProps = RouterOutputs["project"]["getProjectDetails"];
type TaskProps = ProjectProps["tasks"][number];

const Task = ({
  task,
  project,
  refetch,
}: {
  task: TaskProps;
  project: ProjectProps;
  refetch: () => void;
}) => {
  const [showTask, setShowTask] = useState(false);
  const taskOptionsRef = useRef(null);

  const [show, setShow] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);

  useOutsideClick({
    ref: taskOptionsRef,
    callback: () => {
      setShow(false);
    },
  });

  const deleteTaskMutation = api.task.deleteTask.useMutation();

  async function handleTaskDeletion() {
    try {
      await deleteTaskMutation.mutateAsync({ id: task.id }).then(() => {
        toast({ title: "Task deleted" });
        refetch();
      });
    } catch (err: any) {
      toast({ title: err.message, variant: "error" });
    }
    setDeletePopup(false);
  }

  const formattedTask = {
    title: task.title,
    description: task.description || "",
    deadline: task.deadline ?? null,
    assignedTo: task.assignedTo.map((k) => k.id),
    status: task.status,
    isPriority: task.isPriority,
    id: task.id,
  };

  return (
    <div className="relative">
      <div
        onClick={() => {
          if (show) {
            setShow(false);
          } else {
            setShowTask(true);
          }
        }}
        key={task.id}
        className={`flex cursor-pointer items-start justify-between gap-2 rounded-lg ${
          show ? "" : "hover:bg-slate-200"
        } bg-secondary p-4 text-brand-dark `}
      >
        <div>
          <div className="text-lg font-medium">{task.title}</div>
          <div className="text-xs">{task.description || ""}</div>
          <div className="text-xs">
            Deadline : {format(task.deadline, "dd MMM, yyyy")}
          </div>

          <div className="text-xs">
            Last Updated : {format(task.updatedAt, "dd MMM, yyyy")}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge className="rounded-sm bg-brand-light text-xs text-xs font-normal hover:bg-brand-light">
              {task.status}
            </Badge>
            {task.isPriority && (
              <Badge className="rounded-sm bg-brand-light text-xs text-xs font-normal hover:bg-brand-light">
                Priority
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-4">
        <div ref={taskOptionsRef} className="relative">
          <button
            onClick={() => {
              setShow((prev) => !prev);
            }}
            className=" -mr-1 -mt-1 rounded-md py-1 hover:bg-slate-300"
          >
            <GripVertical />
          </button>
          <div
            className={`right-0 top-7 z-10 bg-white ${
              show ? "absolute " : "hidden"
            } w-20 overflow-hidden rounded-md shadow-md`}
          >
            <div className="relative">
              <Button
                onClick={() => {
                  setDeletePopup(true);
                }}
                variant="ghost"
                className="w-full rounded-none bg-white text-destructive hover:bg-destructive hover:text-white"
              >
                Delete
              </Button>
              <Popup
                show={deletePopup}
                className=""
                onClose={() => {
                  setDeletePopup(false);
                }}
              >
                <div>
                  <div className="mb-8 text-lg">
                    Are you sure you wish to continue?
                  </div>
                  <Button
                    onClick={handleTaskDeletion}
                    variant={"destructive"}
                    loaderColor="white"
                    loading={deleteTaskMutation.isLoading}
                    disabled={deleteTaskMutation.isLoading}
                    className="ml-auto"
                  >
                    Delete
                  </Button>
                </div>
              </Popup>
            </div>
          </div>
        </div>
      </div>
      <Popup
        show={showTask}
        className="max-h-screen md:max-h-[80vh] md:max-w-xl"
        onClose={() => {
          setShowTask(false);
        }}
      >
        <TaskForm
          task={formattedTask}
          refetch={refetch}
          project={project}
          close={() => {
            setShowTask(false);
          }}
        />
      </Popup>
    </div>
  );
};

export default Task;
