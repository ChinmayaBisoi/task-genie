import React, { useLayoutEffect, useRef, useState } from "react";
import DatePicker from "../common/DatePicker";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import TaskStatus from "./TaskStatus";
import { RouterOutputs, api } from "~/utils/api";
import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import UserCard from "../team/UserCard";
import useOutsideClick from "~/hooks/useOutsideClick";
import Avatar from "../Avatar";
import { toast } from "../ui/use-toast";

type TaskProps = {
  title: string;
  description: string;
  deadline: Date | null;
  assignedTo: string[];
  status: string;
  isPriority: boolean;
  id?: string;
};

const defaultTask: TaskProps = {
  title: "",
  description: "",
  deadline: null,
  assignedTo: [] as string[],
  status: "Not Started",
  isPriority: false,
};

const AssignTask = ({
  project,
  selectedMemberIds,
  hadleSetMembers,
}: {
  project: ProjectProps;
  selectedMemberIds: string[];
  hadleSetMembers: (x: string[]) => void;
}) => {
  const projectMembers = project.members;
  const [show, setShow] = useState(false);
  const assignTaskRef = useRef(null);

  useOutsideClick({
    ref: assignTaskRef,
    callback: () => {
      setShow(false);
    },
  });

  return (
    <div>
      <div className="flex items-center gap-4">
        <Label className="ml-2 w-16">Assign To</Label>
        <div ref={assignTaskRef} className="relative">
          <Button
            onClick={() => {
              setShow((prev) => !prev);
            }}
            size={"sm"}
            className="w-56 text-brand-dark"
            variant={"secondary"}
          >
            Select Members ({selectedMemberIds.length})
          </Button>
          <div
            className={`z-10 flex w-full flex-col overflow-hidden bg-white shadow ${
              show ? "absolute " : "hidden"
            }`}
          >
            {projectMembers.map((member) => {
              const isSelected = selectedMemberIds.includes(member.id);
              return (
                <button
                  key={member.id}
                  onClick={() => {
                    if (!isSelected) {
                      hadleSetMembers([...selectedMemberIds, member.id]);
                    } else {
                      hadleSetMembers(
                        selectedMemberIds.filter((k) => k !== member.id),
                      );
                    }
                  }}
                  className={`flex items-center px-2 py-2 text-left text-sm  ${
                    isSelected ? "bg-slate-300" : "hover:bg-slate-200"
                  }`}
                >
                  <UserCard user={member} avatarCss="w-6 h-6 md:w-6 md:h-6" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4">
        {selectedMemberIds.map((k) => {
          const user = project.members.find((m) => m.id === k);
          if (!user?.name || !user?.image) return;
          return <Avatar name={user.name} img={user.image} />;
        })}
      </div>
    </div>
  );
};

type ProjectProps = RouterOutputs["project"]["getProjectDetails"];

const TaskForm = ({
  project,
  task: projectTask,
  close,
  refetch,
}: {
  project: ProjectProps;
  task?: TaskProps;
  close: () => void;
  refetch: () => void;
}) => {
  const [task, setTask] = useState(projectTask ?? defaultTask);

  function handleSetMembers(memberIds: string[]) {
    setTask((prev) => ({ ...prev, assignedTo: memberIds }));
  }

  function handleSetDate(date: Date | null) {
    setTask((prev) => ({ ...prev, deadline: date }));
  }

  function isValidSave(task: TaskProps) {
    if (!task.title) {
      return "Title is required.";
    }
    if (!task.deadline) {
      return "Please set a deadline";
    }
  }

  const saveTaskMutation = api.task.saveTask.useMutation();

  async function handleSaveTask() {
    const { title, description, assignedTo, isPriority, deadline, status } =
      task;

    const errMsg = isValidSave(task);
    if (errMsg) {
      toast({ title: errMsg, variant: "error" });
      return;
    }

    try {
      console.log(task);

      await saveTaskMutation
        .mutateAsync({
          projectId: project.id,
          title,
          description,
          assignedTo,
          isPriority,
          deadline,
          status,
          ...(task.id ? { id: task.id } : {}),
        })
        .then(() => {
          refetch();
          close();
        });
      toast({ title: "Task created successfully" });
    } catch (err: any) {
      toast({ title: err.message, variant: "error" });
    }
  }

  return (
    <div className=" flex flex-col gap-4">
      <div>
        <Textarea
          id="title"
          placeholder="Add a title..."
          value={task.title}
          onBlur={() => {
            if (task.title === "") {
              setTask((prev) => ({
                ...prev,
                title: defaultTask.title,
              }));
            }
          }}
          className="block resize-none overflow-hidden border border-white pl-2 text-xl"
          onChange={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
            setTask((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
      </div>
      <div className="member-center flex gap-4">
        <Label className="ml-2 w-16">Priority</Label>
        <Input
          onChange={() => {
            setTask((prev) => ({ ...prev, isPriority: !prev.isPriority }));
          }}
          checked={task.isPriority}
          type="checkbox"
          className="h-4 w-4 cursor-pointer"
        />
      </div>
      <div className="flex items-center gap-4">
        <Label className="ml-2 w-16">Deadline</Label>
        <DatePicker date={task.deadline} setDate={handleSetDate} />
      </div>
      <TaskStatus
        status={task.status}
        setStatus={(s) => {
          setTask((prev) => ({ ...prev, status: s }));
        }}
      />
      <AssignTask
        project={project}
        selectedMemberIds={task.assignedTo}
        hadleSetMembers={handleSetMembers}
      />

      <div>
        <Textarea
          placeholder="Add a description..."
          rows={4}
          value={task.description}
          className="block resize-none overflow-hidden border border-white pl-2"
          onBlur={() => {
            if (task.description === "") {
              setTask((prev) => ({
                ...prev,
                description: defaultTask.description,
              }));
            }
          }}
          onChange={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
            setTask((prev) => ({ ...prev, description: e.target.value }));
          }}
        />
      </div>
      <div className="flex justify-end gap-6">
        <Button onClick={close} variant={"secondary"} className="w-32">
          Cancel
        </Button>
        <Button onClick={handleSaveTask} className="w-32">
          Save
        </Button>
      </div>
    </div>
  );
};

export default TaskForm;
