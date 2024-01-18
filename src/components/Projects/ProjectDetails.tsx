import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { RouterOutputs, api } from "~/utils/api";
import Popup from "../common/Popup";
import Shimmer from "../common/Shimmer";
import Task from "../tasks/Task";
import TaskForm from "../tasks/TaskForm";
import { Button } from "../ui/button";
import ProjectNotFound from "./ProjectNotFound";
import { filter } from "d3";

type ProjectProps = RouterOutputs["project"]["getProjectDetails"];

const AddTask = ({
  project,
  refetch,
}: {
  project: ProjectProps;
  refetch: () => void;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Button
        onClick={() => {
          setShow(true);
        }}
        className="ml-auto grow rounded-full transition-all duration-200 sm:grow-0"
      >
        Add Task
      </Button>
      <Popup
        show={show}
        className="max-h-screen md:max-h-[80vh] md:max-w-xl"
        onClose={() => {
          setShow(false);
        }}
      >
        <TaskForm
          project={project}
          refetch={refetch}
          close={() => {
            setShow(false);
          }}
        />
      </Popup>
    </div>
  );
};

const ProjectDetails = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { projectId } = useParams<{ projectId: string }>();

  const {
    error,
    isLoading,
    isRefetching,
    refetch,
    data: projectData,
  } = api.project.getProjectDetails.useQuery(
    { projectId },
    { enabled: isLoggedIn },
  );

  async function refetchProjectDetails() {
    await refetch();
  }

  const [filters, setFilters] = useState({
    isPriority: false,
    status: null,
  });

  const filteredTasks: any = projectData?.tasks.filter((task) => {
    if (filters.status && filters.status !== task.status) {
      return false;
    }

    return true;
  });

  const handleToggleStatus = (status: any) => {
    if (filters.status === status) {
      status = null;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: status,
    }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      isPriority: false,
      status: null,
    });
  };

  const loading = isLoading || isRefetching;

  if (loading)
    return (
      <>
        <div className="flex flex-col gap-4">
          <Shimmer className="h-10 w-80" />
          <Shimmer className="h-6 w-full" />
        </div>
        <div className="my-4 h-0.5 bg-slate-200"></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {new Array(5).fill(null).map((_, index) => {
            return <Shimmer key={index} className="h-20 w-full" />;
          })}
        </div>
      </>
    );

  if (error) return <ProjectNotFound refetch={refetchProjectDetails} />;
  return (
    <div className="">
      {projectData && (
        <div className="">
          <div className="mb-4 flex items-center justify-between gap-x-4 overflow-hidden border-b border-brand-dark pb-2">
            <div className="grow font-medium text-brand-dark">
              <h2 className="text-ellipsis text-2xl">{projectData.title}</h2>
              {projectData.description && <h3>{projectData.description}</h3>}
            </div>
            <Link href={`/project/${projectData.id}/settings`}>
              <Button
                variant={"secondary"}
                className="rounded-full px-5 hover:bg-slate-300"
              >
                Settings
              </Button>
            </Link>
          </div>
          <div className="flex justify-end">
            <AddTask project={projectData} refetch={refetchProjectDetails} />
          </div>
          <div className="mb-4 flex flex-wrap gap-4">
            <Button
              variant={
                filters.status === "Not Started" ? "default" : "secondary"
              }
              onClick={() => {
                handleToggleStatus("Not Started");
              }}
            >
              Not Started
            </Button>
            <Button
              variant={
                filters.status === "In Progress" ? "default" : "secondary"
              }
              onClick={() => {
                handleToggleStatus("In Progress");
              }}
            >
              In Progress
            </Button>
            <Button
              variant={filters.status === "Done" ? "default" : "secondary"}
              onClick={() => {
                handleToggleStatus("Done");
              }}
            >
              Done
            </Button>
          </div>
          <div className="mt-4">
            {filteredTasks.length === 0 ? (
              <div className="mt-20 text-center text-brand-dark">
                <div className="font-medium">No task available.</div>
                <div className="text-sm text-gray-500">
                  Add a task above to view here.
                </div>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {projectData.tasks.map((task) => {
                    return (
                      <Task
                        task={task}
                        key={task.id}
                        project={projectData}
                        refetch={refetchProjectDetails}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
