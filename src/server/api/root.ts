import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { BookmarkRoute } from "./routers/bookmark/bookmark.route";
import { FolderRoute } from "./routers/folder/folder.route";

export const appRouter = createTRPCRouter({
  bookmark: BookmarkRoute,
  folder: FolderRoute,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
