import { TRPCError } from "@trpc/server";

import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(z.object({ title: z.string().min(1), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const requestor = ctx.session.user;

      const user = await ctx.db.user.findUnique({
        where: {
          id: requestor.id,
        },
      });

      if (!user)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Requestor data not found`,
        });

      const createdProject = await ctx.db.project.create({
        data: {
          title: input.title,
          description: input.description,
          createdById: requestor.id,
          members: {
            connect: [{ id: requestor.id }],
          },
        },
      });

      return createdProject;
    }),

  // fetch all users who are friends with requestor
  getProjectDetails: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      const requestor = ctx.session.user;
      const projectId = input.projectId;

      const projectDetails = await ctx.db.project.findUnique({
        where: {
          id: projectId,
          isDeleted: false,
        },
        include: {
          members: true,
          tasks: {
            include: {
              createdBy: true,
              assignedTo: true,
            },
          },
          createdBy: true,
        },
      });

      if (!projectDetails)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Project details not found`,
        });

      return projectDetails;
    }),

  updateProject: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        description: z.string(),
        memberIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const requestor = ctx.session.user;
      const { id, title, description, memberIds } = input;

      const projectDetails = await ctx.db.project.update({
        where: {
          id,
        },
        data: {
          title,
          description,
          members: {
            set: memberIds.map((id) => ({ id })),
          },
        },
        include: {
          members: true,
          createdBy: true,
        },
      });

      if (!projectDetails)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Error updating project details`,
        });

      return projectDetails;
    }),

  deleteProject: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id: projectId } = input;

      const projectDetails = await ctx.db.project.update({
        where: {
          id: projectId,
        },
        data: {
          isDeleted: true,
        },
      });

      return projectDetails;
    }),

  // get all projects user is involved in
  getUserRelatedProjects: protectedProcedure.query(async ({ ctx }) => {
    const requestor = ctx.session.user;

    const projectDetails = await ctx.db.project.findMany({
      where: {
        isDeleted: false,
        members: {
          some: {
            id: requestor.id,
          },
        },
      },
      include: {
        members: true,
        tasks: {
          include: {
            assignedTo: true,
          },
        },
        createdBy: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    if (!projectDetails)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Project details not found`,
      });

    return projectDetails;
  }),
});
