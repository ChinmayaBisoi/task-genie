import { TRPCClientErrorLike } from "@trpc/client";
import { UseTRPCQueryResult } from "@trpc/react-query/shared";
import { format } from "date-fns";
import { ArrowDownLeftFromCircle, Send as SendIcon } from "lucide-react";
import { AppRouter } from "~/server/api/root";
import { RouterOutputs, api } from "~/utils/api";
import Avatar from "../Avatar";
import ErrorFetchingData from "../common/ErrorFetchingData";
import Shimmer from "../common/Shimmer";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

type UnacceptedRequestProps =
  RouterOutputs["member"]["getUnacceptedRequests"][number];

const RequestCard = ({
  item,
  refetch,
}: {
  item: UnacceptedRequestProps;
  refetch: () => void;
}) => {
  const replyRequestMutation = api.member.replyFriendRequest.useMutation();
  const loading = replyRequestMutation.isLoading;
  const isPending = item.status === "pending";
  const isReceivedRequest = !item.isSentByUser;
  const otherUser = isReceivedRequest ? item.from : item.to;
  const requestTitle = isReceivedRequest
    ? "Request received from"
    : "Request sent to";

  const icon = isReceivedRequest ? (
    <ArrowDownLeftFromCircle className="mt-2 h-auto w-5 flex-shrink-0 text-brand-dark" />
  ) : (
    <SendIcon className="mt-2 h-auto w-5 flex-shrink-0 text-brand-dark" />
  );

  async function handleReplyRequest(accept: boolean) {
    if (!isReceivedRequest) return;

    try {
      await replyRequestMutation
        .mutateAsync({
          requestId: item.id,
          accept,
        })
        .then(() => {
          refetch();
        });

      toast({
        title: `${accept ? "Accepted" : "Rejected"} request from ${
          otherUser.email
        }`,
      });
    } catch (err: any) {
      toast({ title: err.message, variant: "error" });
    }
  }

  async function acceptRequest() {
    await handleReplyRequest(true);
  }

  async function rejectRequest() {
    await handleReplyRequest(false);
  }

  return (
    <div className="rounded-lg p-4 pl-2 shadow-inner shadow-brand-light/70">
      <div className="flex justify-between gap-4">
        <div className="flex items-start gap-2">
          {icon}
          <div className="">
            <div className="text-sm">
              {format(item.updatedAt, "dd MMM, yyyy | HH:mm")}
            </div>
            <div className="flex flex-wrap items-center gap-x-1">
              <span>{requestTitle} </span>
              <span className="inline-block max-w-60 overflow-hidden truncate">
                {otherUser.email}
              </span>
            </div>
            <Badge
              variant={isPending ? "brand" : "destructive"}
              className={`rounded-lg capitalize ${
                isPending ? "hover:bg-brand-light" : "hover:bg-destructive"
              }`}
            >
              {item.status}
            </Badge>
          </div>
        </div>
        {otherUser && otherUser.image && otherUser.name && (
          <Avatar img={otherUser.image} name={otherUser.name} />
        )}
      </div>
      {isReceivedRequest && (
        <div className="flex justify-end gap-4">
          <Button
            loading={loading}
            disabled={loading}
            onClick={rejectRequest}
            variant="secondary"
            size="sm"
          >
            Reject
          </Button>
          <Button
            loading={loading}
            disabled={loading}
            onClick={acceptRequest}
            size="sm"
          >
            Accept
          </Button>
        </div>
      )}
    </div>
  );
};

type requestProps = RouterOutputs["member"]["getUnacceptedRequests"][number];
type UnacceptedRequestsQueryProps = UseTRPCQueryResult<
  requestProps[],
  TRPCClientErrorLike<AppRouter>
>;

const Requests = ({
  unacceptedRequestsQuery,
}: {
  unacceptedRequestsQuery: UnacceptedRequestsQueryProps;
}) => {
  const {
    data: unacceptedRequests,
    isLoading,
    refetch,
    isRefetching,
    isError,
  } = unacceptedRequestsQuery;

  async function refetchData() {
    await refetch();
  }

  const loading = isLoading || isRefetching;
  const noRequestsFound = !loading && unacceptedRequests?.length === 0;

  if (isError) return <ErrorFetchingData refetch={refetchData} />;
  return (
    <div className="">
      <div className="flex flex-col gap-4">
        {loading &&
          new Array(4).fill(null).map((_, index) => {
            return <Shimmer key={index} className="mb-4 h-24 w-full" />;
          })}
        {noRequestsFound && (
          <div className="text-sm font-medium">No requests found!</div>
        )}

        {unacceptedRequests?.map((item) => {
          return (
            <RequestCard key={item.id} item={item} refetch={refetchData} />
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
