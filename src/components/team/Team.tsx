import { useSession } from "next-auth/react";
import { useState } from "react";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import AddMember from "./AddMember";
import Members from "./Members";
import Requests from "./Requests";

const CONTENT = {
  MEMBERS: "Members",
  REQUESTS: "Requests",
};

const ChooseContent = ({
  content,
  setContent,
}: {
  content: string;
  setContent: (x: string) => void;
}) => {
  return (
    <div className="flex gap-1 rounded-full bg-brand-light p-1 font-medium">
      {Object.values(CONTENT).map((contentOption) => {
        const isActive = content === contentOption;
        return (
          <Button
            key={contentOption}
            onClick={() => {
              setContent(contentOption);
            }}
            size={"sm"}
            className={`flex-1 rounded-full px-4 py-1 text-xs ${
              isActive ? "hover:bg-brand-light" : "hover:bg-slate-200"
            }`}
            variant={isActive ? "default" : "secondary"}
          >
            {contentOption}
          </Button>
        );
      })}
    </div>
  );
};

const Team = () => {
  const [content, setContent] = useState(CONTENT.MEMBERS);
  const showMembers = content === CONTENT.MEMBERS;

  const { data: sessionData } = useSession();
  const unacceptedRequestsQuery = api.member.getUnacceptedRequests.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  const membersListQuery = api.member.getMembers.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  async function refetchData() {
    await unacceptedRequestsQuery.refetch();
    await membersListQuery.refetch();
  }

  return (
    <div>
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h4 className="pb-2 text-lg font-medium text-brand-dark sm:pb-0">
          Manage your colaborations
        </h4>

        <ChooseContent content={content} setContent={setContent} />
      </div>
      <div className="my-4 flex items-center justify-between gap-4">
        <h2 className="text-lg font-medium text-brand-dark">{content}</h2>
        <AddMember refetchData={refetchData} />
      </div>
      <div className="my-6">
        {showMembers ? (
          <Members membersListQuery={membersListQuery} />
        ) : (
          <Requests
            unacceptedRequestsQuery={unacceptedRequestsQuery}
            refetchMembers={refetchData}
          />
        )}
      </div>
    </div>
  );
};

export default Team;
