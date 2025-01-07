import {
  createCallerFactory,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  post: publicProcedure.query(async () => {
    return ["okok"];
  }),
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
