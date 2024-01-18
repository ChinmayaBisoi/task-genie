import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  saveTask: protectedProcedure
    .input(
      z.object({
        id: z.optional(z.string().min(1)),
        title: z.string().min(1),
        description: z.string(),
        deadline: z.any(),
        assignedTo: z.array(z.string()),
        isPriority: z.boolean(),
        status: z.string().min(1),
        projectId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const requestor = ctx.session.user;
      const {
        id,
        title,
        description,
        deadline,
        assignedTo,
        isPriority,
        status,
        projectId,
      } = input;

      if (id) {
        // update task
        const updatedProject = await ctx.db.task.update({
          where: {
            id,
          },
          data: {
            title,
            description,
            // createdById: requestor.id,
            status,
            deadline,
            isPriority,
            // projectId,
            assignedTo: {
              set: assignedTo.map((k) => ({ id: k })),
            },
          },
        });

        return updatedProject;
      } else {
        // create task
        const createdProject = await ctx.db.task.create({
          data: {
            title,
            description,
            status,
            createdById: requestor.id,
            deadline,
            isPriority,
            projectId,
            assignedTo: {
              connect: assignedTo.map((k) => ({ id: k })),
            },
          },
        });

        return createdProject;
      }
    }),

  // fetch all users who are friends with requestor
  getTasks: protectedProcedure
    .input(z.object({ projectId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const requestor = ctx.session.user;
      const projectId = input.projectId;

      const tasks = await ctx.db.task.findMany({
        where: {
          id: projectId,
        },
        include: {
          assignedTo: true,
          createdBy: true,
        },
      });

      if (!tasks)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Task details not found`,
        });

      return tasks;
    }),

  deleteTask: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const requestor = ctx.session.user;
      const taskId = input.id;

      const taskDetails = await ctx.db.task.delete({
        where: {
          id: taskId,
        },
      });

      if (!taskDetails)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Error deleting task.`,
        });

      return taskDetails;
    }),
});
