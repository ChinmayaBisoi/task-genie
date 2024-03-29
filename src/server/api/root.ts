import { createTRPCRouter } from "~/server/api/trpc";
import { friendRequestsRouter } from "./routers/friendRequests";
import { projectRouter } from "./routers/project";
import { taskRouter } from "./routers/task";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  member: friendRequestsRouter,
  project: projectRouter,
  task: taskRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
