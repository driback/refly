import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { BookmarkRoute } from "./routers/bookmark/bookmark.route";

export const appRouter = createTRPCRouter({ bookmark: BookmarkRoute });

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
