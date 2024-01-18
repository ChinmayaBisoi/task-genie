import React from "react";

const HOW_IT_WORKS_ITEMS = [
  {
    title: "Get Started",
    label:
      "Login using your favorite google account. Create a project. Add members to your project in settings. Create a task. Done. TaskGenie tracks your tasks and deadlines.",
    id: 1,
  },
  {
    title: "Projects",
    label:
      "TaskGenie projects keep thins organized and work moving forward. In a glance, see everythin from task 'In Progress' to task that are 'Done'.",
    id: 2,
  },
  {
    title: "Tasks",
    label:
      "Tasks represent and contain all the information and ideas needed to complete the project. As you make progress, update the status to keep things moving.",
    id: 3,
  },
  {
    title: "One for all",
    label:
      "Minimalistic interface to create, track and complete your tasks and improve productive all in one place",
    id: 4,
  },
];

const HowItWorksCard = ({ id, label }: { id: number; label: string }) => {
  return (
    <div className="flex h-20 gap-4 rounded-lg bg-brand-light p-4 text-brand-light">
      <div className="w-full text-center text-lg text-white">{label}</div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <div className="grid grid-cols-12 px-4 py-16 md:px-0 md:py-20">
      <div className="col-span-full md:col-span-10 md:col-start-2">
        <div className="text-brand col-span-full mb-8 text-center">
          <div className="text-center text-3xl">A productivity powerhouse</div>
          <div className="mt-4 text-center md:text-lg">
            Simple, flexible, and powerful. All it takes are boards, lists, and
            cards to get a clear view of who's doing what and what needs to get
            done.
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {HOW_IT_WORKS_ITEMS.map(({ id, label, title }) => {
            return (
              <div
                key={id}
                className="flex rounded-lg border-y border-r border-gray-200 shadow-md"
              >
                <div className="h-full w-2 flex-shrink-0 rounded-l-lg bg-brand-light" />
                <div className="flex flex-col gap-2 p-4">
                  <div className="text-lg font-medium text-brand-dark">
                    {title}
                  </div>
                  <div className="flex items-center justify-center text-sm">
                    {label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
