import Link from "next/link";
import { useParams } from "next/navigation";
import { RouterOutputs, api } from "~/utils/api";
import { Button } from "../ui/button";
import ProjectNotFound from "./ProjectNotFound";

const ProjectDetails = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { projectId } = useParams<{ projectId: string }>();

  const {
    error,
    isError,
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

  const loading = isLoading || isRefetching;

  if (error) return <ProjectNotFound refetch={refetchProjectDetails} />;
  return (
    <div className="">
      {/* {true && (
        <div className="flex flex-col gap-4">
          <Shimmer className="h-10 w-80" />
          <Shimmer className="h-6 w-full" />
        </div>
      )} */}
      {/* <div>
        {loading &&
          new Array(4).fill(null).map((_, index) => {
            return <Shimmer key={index} className="mb-4 h-20 w-full" />;
          })}
      </div> */}
      {projectData && (
        <div className="">
          <div className="mb-4 flex items-center justify-between gap-x-4 border-b border-brand-dark pb-2">
            <div className="font-medium text-brand-dark">
              <h2 className="text-2xl">{projectData.title}</h2>
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
          <Button className="ml-auto grow rounded-full transition-all duration-200 sm:grow-0">
            Add Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
