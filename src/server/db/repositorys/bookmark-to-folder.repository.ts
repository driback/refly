import { db } from "../client";
import { BookmarkToFolder } from "../schemas";
import { handleMutation } from "./respository.helper";

type BookmarkToFolderInsert = typeof BookmarkToFolder.$inferInsert;

export const BookmarkToFolderRespository = {
  create: async (values: BookmarkToFolderInsert[]) => {
    const res = await db.insert(BookmarkToFolder).values(values).returning();
    return handleMutation(res);
  },
};
