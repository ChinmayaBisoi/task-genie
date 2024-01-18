import { Session } from "next-auth";
import React from "react";
import { RouterOutputs, api } from "~/utils/api";
import Shimmer from "../common/Shimmer";
import { Label } from "../ui/label";
import { addDays, differenceInDays, format } from "date-fns";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import Link from "next/link";

type UserRelatedProjectsProps =
  RouterOutputs["project"]["getUserRelatedProjects"];

const COLORS = [
  "bg-[#86A7FC] hover:bg-[#86A7FC]",
  "bg-[#9DBC98] hover:bg-[#9DBC98]",
  "bg-[#FFB996] hover:bg-[#FFB996]",
];

const TODAY = new Date(new Date().setHours(0, 0, 0, 0));

function getChartData(projects: any) {
  let res: any = [];
  let maxDifferenceBetweenDays = 1;
  projects.forEach((project: any, index: number) => {
    project.tasks.forEach((task: any) => {
      const difference = differenceInDays(task.deadline, TODAY);
      if (difference > maxDifferenceBetweenDays) {
        maxDifferenceBetweenDays = difference;
      }

      res = [
        ...res,
        {
          id: task.id,
          title: task.title,
          projectName: project.title,
          projectId: project.id,
          endDate: task.deadline,
          cssColor: COLORS[index % COLORS.length],
          startDate: task.createdAt,
          endDateRemainingDays: difference,
          members: task.assignedTo.map((k: any) => k.name),
        },
      ];
    });
  });

  return { data: res, end: maxDifferenceBetweenDays };
}

const TimelineContent = ({
  projects,
}: {
  projects: UserRelatedProjectsProps;
}) => {
  const { data, end } = getChartData(projects);
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {data.map((item: any) => {
          const taskDeadline = item.endDateRemainingDays;
          const widthPercentage = Math.floor((100 * taskDeadline) / end);
          return (
            <Link
              href={`/project/${item.projectId}`}
              key={item.id}
              className={`relative z-10 h-[64px] rounded-md bg-slate-200 bg-opacity-70 p-2 text-xs hover:bg-opacity-100 ${item.cssColor}`}
              style={{ width: `${widthPercentage}%` }}
            >
              <div className="absolute h-[64px] w-[400px]">
                <div>Project : {item.projectName}</div>
                <div>Task Name : {item.title}</div>
                <div>Deadline : {format(item.endDate, "dd MMM, yyyy")}</div>
              </div>
            </Link>
          );
        })}
      </div>
      {data.length > 0 ? (
        <div className="mt-4 flex">
          {new Array(7).fill(null).map((_, index) => {
            const dateToShow = addDays(TODAY, index * 7);
            return (
              <div
                className="text-xs "
                style={{ width: `${(100 * end) / 7}%` }}
              >
                {format(dateToShow, "dd MMM")}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="">
          <div className="text-brand">Not enough data to show.</div>
          <div className="text-sm text-gray-500">
            Create a project, add some tasks to view timeline
          </div>
        </div>
      )}
    </div>
  );
};

const Timeline = ({ user }: { user: Session["user"] }) => {
  const {
    data: userRelatedProjects,
    isLoading,
    isFetching,
  } = api.project.getUserRelatedProjects.useQuery();

  const loading = isLoading || isFetching || !userRelatedProjects;

  if (loading)
    return (
      <div>
        <Shimmer className="mb-4 h-10 w-40" />
        <Shimmer className="h-80 w-full" />
      </div>
    );
  return (
    <div>
      <h2 className="mb-4 text-xl font-medium text-brand-dark">Timeline</h2>
      {userRelatedProjects && (
        <TimelineContent projects={userRelatedProjects} />
      )}
    </div>
  );
};

export default Timeline;
