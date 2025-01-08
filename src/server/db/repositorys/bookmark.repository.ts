import { db } from "../client";
import { Bookmark } from "../schemas";

type BookmarkInsert = typeof Bookmark.$inferInsert;

export const BookmarkRepository = {
  create: async (values: BookmarkInsert) => {
    const res = await db.insert(Bookmark).values(values).returning();
    return handleMutation(res);
  },
};

const handleMutation = (data: object[]) => {
  if (!data?.[0]) return null;
  return data[0];
};
