import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import useOutsideClick from "~/hooks/useOutsideClick";

export const TASK_STATUSES = ["Not Started", "In Progress", "Review", "Done"];

const TaskStatus = ({
  status,
  setStatus,
}: {
  status: string | null;
  setStatus: (x: string) => void;
}) => {
  const [show, setShow] = useState(false);
  const taskStatusRef = useRef(null);

  useOutsideClick({
    ref: taskStatusRef,
    callback: () => {
      if (show) {
        setShow(false);
      }
    },
  });

  return (
    <div className="flex items-center gap-4">
      <Label className="ml-2 w-16">Status</Label>
      <div ref={taskStatusRef} className="relative">
        <Button
          onClick={() => {
            setShow((prev) => !prev);
          }}
          className="w-56 text-brand-dark"
          variant={"secondary"}
        >
          {status ?? TASK_STATUSES[0]}
        </Button>
        <div
          className={`z-10 flex w-full flex-col bg-white shadow ${
            show ? "absolute " : "hidden"
          }`}
        >
          {TASK_STATUSES.filter((k) => {
            return k !== (status ?? TASK_STATUSES[0]);
          }).map((item) => {
            return (
              <button
                key={item}
                onClick={() => {
                  setStatus(item);
                  setShow(false);
                }}
                className="py-2 text-sm hover:bg-slate-200"
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TaskStatus;
