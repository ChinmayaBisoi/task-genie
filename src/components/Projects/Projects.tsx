import { UserRound } from "lucide-react";
import React from "react";
import CreateNewProject from "./CreateNewProject";
import { RouterOutputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";
import ErrorFetchingData from "../common/ErrorFetchingData";
import Shimmer from "../common/Shimmer";
import { format } from "date-fns";
import Link from "next/link";
import Avatar from "../Avatar";

type ProjectsProps = RouterOutputs["project"]["getUserRelatedProjects"];

const NUM_MEMBERS_TO_SHOW = 2;

const ProjectsLoading = () => {
  return (
    <div className="flex flex-col gap-4">
      {new Array(4).fill(null).map((_, index) => {
        return <Shimmer key={index} className="h-10 w-full" />;
      })}
    </div>
  );
};

const DashboardProjectList = ({ projects }: { projects: ProjectsProps }) => {
  if (projects.length === 0)
    return (
      <div className="mt-4 text-brand-dark">
        <div>No projects found.</div>
        <div className="text-sm text-gray-400">
          Create a project above to view here.
        </div>
      </div>
    );
  return (
    <div className="mt-4 flex flex-col gap-4">
      {projects.map((project) => {
        return (
          <Link key={project.id} href={`/project/${project.id}`}>
            <div className="flex min-h-32 flex-col justify-between gap-2 rounded-md bg-slate-100 p-4 font-medium text-brand-dark hover:bg-slate-200">
              <div className="flex flex-col-reverse justify-between gap-4 sm:flex-row">
                <div>
                  <p className="">{project.title}</p>
                  <p className="text-xs">{project.description}</p>
                </div>
                <p className="hidden text-xs md:block">
                  {format(project.updatedAt, "dd MMM, yyyy")}
                </p>
              </div>

              <div className="flex gap-2">
                {project.members
                  .slice(0, NUM_MEMBERS_TO_SHOW)
                  .map((member, index) => {
                    if (!member.name || !member.image) return;
                    return (
                      <div
                        key={member.id}
                        className="rounded-full shadow shadow-brand-light"
                      >
                        <Avatar name={member.name} img={member.image} />
                      </div>
                    );
                  })}
                {project.members.length - NUM_MEMBERS_TO_SHOW > 0 && (
                  <div className="ml-2 flex items-center text-xs">
                    {"+" +
                      (project.members.length - NUM_MEMBERS_TO_SHOW) +
                      " more"}
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

const Projects = () => {
  const {
    data: relatedProjects,
    error,
    isLoading,
    isRefetching,
    refetch: refetchProjects,
  } = api.project.getUserRelatedProjects.useQuery(undefined, { enabled: true });

  async function refetchRelatedProjects() {
    await refetchProjects();
  }

  const loading = isLoading || isRefetching;

  if (loading) return <ProjectsLoading />;
  if (error) return <ErrorFetchingData refetch={refetchRelatedProjects} />;
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserRound />
          <h2 className="text-lg font-medium capitalize">Your Projects</h2>
        </div>
        <CreateNewProject />
      </div>
      {relatedProjects && <DashboardProjectList projects={relatedProjects} />}
    </div>
  );
};

export default Projects;
