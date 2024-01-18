import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(z.object({ name: z.string().min(4) }))
    .mutation(async ({ ctx, input }) => {
      const requestor = ctx.session.user;

      const user = await ctx.db.user.update({
        where: {
          id: requestor.id,
        },
        data: {
          name: input.name,
        },
      });

      return user;
    }),
});
