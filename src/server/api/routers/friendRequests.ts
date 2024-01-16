import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const friendRequestsRouter = createTRPCRouter({
  // (think of a better name)
  getUnacceptedRequests: protectedProcedure.query(async ({ ctx }) => {
    const requestor = ctx.session.user;

    const unacceptedRequests = await ctx.db.friendRequest.findMany({
      where: {
        NOT: {
          status: "accepted",
        },
        OR: [
          {
            fromId: requestor.id,
          },
          { toId: requestor.id },
        ],
      },
      include: {
        from: true,
        to: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return unacceptedRequests.map((item) => {
      const isSentByUser = item.fromId === ctx.session.user.id;
      return { ...item, isSentByUser };
    });
  }),

  // fetch all users who are friends with requestor
  getMembers: protectedProcedure.query(async ({ ctx }) => {
    const requestor = ctx.session.user;

    const members = await ctx.db.friendRequest.findMany({
      where: {
        status: "accepted",
        OR: [
          {
            fromId: requestor.id,
          },
          { toId: requestor.id },
        ],
      },
      include: {
        from: true,
        to: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return members.map((item) => ({
      ...item,
      isSentByUser: requestor.id === item.from.id,
    }));
  }),

  sendFriendRequest: protectedProcedure
    .input(z.object({ email: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const requestor = ctx.session.user;
      const userToSendRequestTo = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (requestor.email === input.email)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Cannot add yourself as a member!`,
        });

      if (!userToSendRequestTo)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `User with email = ${input.email} not found`,
        });

      const sharedPendingRequests = await ctx.db.friendRequest.findMany({
        where: {
          status: "pending",
          OR: [
            {
              fromId: requestor.id,
              toId: userToSendRequestTo.id,
            },
            {
              fromId: userToSendRequestTo.id,
              toId: requestor.id,
            },
          ],
        },
      });

      if (sharedPendingRequests?.length > 0) {
        const isRequestAlreadySent = sharedPendingRequests.find((request) => {
          return request.fromId === requestor.id;
        });

        if (isRequestAlreadySent)
          throw new TRPCError({
            code: "FORBIDDEN",
            message: `Request already sent.`,
          });

        const hasAlreadyReceivedRequest = sharedPendingRequests.find(
          (request) => {
            return request.toId === requestor.id;
          },
        );

        if (hasAlreadyReceivedRequest)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `You already have a pending request from the user.`,
          });
      }

      return await ctx.db.friendRequest.create({
        data: {
          fromId: ctx.session.user.id,
          toId: userToSendRequestTo.id,
        },
      });
    }),

  replyFriendRequest: protectedProcedure
    .input(z.object({ requestId: z.string().cuid(), accept: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const userToSendRequestTo = await ctx.db.friendRequest.update({
        where: { id: input.requestId, status: "pending" },
        data: {
          status: input.accept ? "accepted" : "rejected",
        },
      });

      return userToSendRequestTo;
    }),

  removeMember: protectedProcedure
    .input(z.object({ requestId: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const deletedItem = await ctx.db.friendRequest.delete({
        where: { id: input.requestId },
      });

      return deletedItem;
    }),
});
