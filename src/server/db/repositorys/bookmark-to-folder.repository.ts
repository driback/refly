import { and, eq } from "drizzle-orm";
import { db } from "../client";
import { BookmarkToFolder } from "../schemas";
import { handleMutation } from "./respository.helper";

type BookmarkToFolderInsert = typeof BookmarkToFolder.$inferInsert;

export const BookmarkToFolderRespository = {
  create: async (values: BookmarkToFolderInsert[]) => {
    const res = await db.insert(BookmarkToFolder).values(values).returning();
    return handleMutation(res);
  },
  delete: async (bookmarkId: string, folderId: string) => {
    const res = await db
      .delete(BookmarkToFolder)
      .where(
        and(
          eq(BookmarkToFolder.bookmarkId, bookmarkId),
          eq(BookmarkToFolder.folderId, folderId),
        ),
      )
      .returning();
    return handleMutation(res);
  },
};
