
// import { initTRPC } from '@trpc/server';
// import { z } from 'zod';

// const t = initTRPC.create();

// export const projectService = t.service({
//   create: t.procedure.input(
//     z.object({
//       title: z.string(),
//       description: z.string().optional(),
//       createdBy: z.string(),
//     }),
//   ).query(async (input) => {
//     const createdProject = await createProject(input);
//     return createdProject;
//   }),
// });
