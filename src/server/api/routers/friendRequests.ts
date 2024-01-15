import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function addMember(email: string) {
  try {
    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser;
    }

    // If the user doesn't exist, create a new user
    const newUser = await prisma.user.create({
      data: {
        email,

        // Add other user-related fields as needed
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function sendFriendRequest() {}

export async function confirmFriendRequest() {} // accept or reject

export async function removeFriend() {}

export async function getAllFriends() {}

import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const friendRequestsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    console.log(ctx);
    return ctx.db.friendRequest.findFirst({
      orderBy: { createdAt: "desc" },
      // where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});
