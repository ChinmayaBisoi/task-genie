import React, { useState } from "react";
import AddMember from "./AddMember";
import { RouterOutputs, api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { SmilePlus } from "lucide-react";
import Avatar from "../Avatar";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import Popup from "../common/Popup";
import Shimmer from "../common/Shimmer";
import { TRPCClientErrorLike } from "@trpc/client";
import { AppRouter } from "~/server/api/root";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import ErrorFetchingData from "../common/ErrorFetchingData";

type Member = RouterOutputs["member"]["getMembers"][number];

const MemberCard = ({ item }: { item: Member }) => {
  const otherUser = item.isSentByUser ? item.to : item.from;
  const [show, setShow] = useState(false);
  const replyRequestMutation = api.member.removeMember.useMutation();

  async function handleRemoveMember() {
    try {
      const res = await replyRequestMutation.mutateAsync({
        requestId: item.id,
      });
      console.log(res);
      toast({
        title: `Removed user ${otherUser.email}`,
      });
    } catch (err: any) {
      toast({ title: err.message, variant: "error" });
    }
    setShow(false);
  }

  return (
    <div className="rounded-lg p-4 shadow-inner shadow-brand-light/70">
      <div className="flex flex-col justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4">
          {otherUser && otherUser.image && otherUser.name && (
            <div className="rounded-full shadow-lg shadow-brand-light/40">
              <Avatar
                img={otherUser.image}
                name={otherUser.name}
                className="sm:h-12 sm:w-12"
              />
            </div>
          )}
          <div>
            <div>{otherUser.name}</div>
            <div className="max-w-60 truncate text-sm">{otherUser.email}</div>
          </div>
        </div>
        <Button
          onClick={() => {
            setShow(true);
          }}
          variant={"destructive"}
          className="self-end bg-secondary text-destructive hover:text-white sm:self-center"
        >
          Remove
        </Button>
        <Popup
          show={show}
          onClose={() => {
            setShow(false);
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="pr-12">
              Are you sure you want to remove the following user ?{" "}
            </div>
            <div>
              {otherUser && otherUser.image && otherUser.name && (
                <div className="mx-auto flex w-fit gap-2 rounded-full pr-4 shadow-lg shadow-brand-light/40">
                  <Avatar
                    img={otherUser.image}
                    name={otherUser.name}
                    className="h-12 w-12 flex-shrink-0"
                  />
                  <div>
                    <div>{otherUser.name}</div>
                    <div className="max-w-60 truncate text-sm">
                      {otherUser.email}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Button
              className="ml-auto"
              variant={"destructive"}
              onClick={handleRemoveMember}
            >
              Remove
            </Button>
          </div>
        </Popup>
      </div>
    </div>
  );
};

type MemberProps = RouterOutputs["member"]["getMembers"][number];
type MembersListQueryProps = UseTRPCQueryResult<
  MemberProps[],
  TRPCClientErrorLike<AppRouter>
>;

const Members = ({
  membersListQuery,
}: {
  membersListQuery: MembersListQueryProps;
}) => {
  const {
    data: members,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = membersListQuery;
  const loading = isLoading || isRefetching;
  const noMembersFound = !loading && members?.length === 0;

  async function refetchMembersList() {
    await refetch();
  }

  if (isError) return <ErrorFetchingData refetch={refetchMembersList} />;
  return (
    <div>
      {loading &&
        new Array(4).fill(null).map((_, index) => {
          return <Shimmer key={index} className="mb-4 h-20 w-full" />;
        })}
      {noMembersFound && (
        <div className="text-brand text-sm font-medium">
          <div>No members found !</div>
          <div>Add a member above to send a request.</div>
        </div>
      )}
      <div className="">
        {members?.map((item: MemberProps) => {
          return <MemberCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default Members;
