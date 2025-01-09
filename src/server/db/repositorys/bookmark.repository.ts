import { db } from "../client";
import { Bookmark } from "../schemas";

type BookmarkInsert = typeof Bookmark.$inferInsert;
type BookmarkFindAll = {
  query?: string;
  page: number;
  limit: number;
};

export const BookmarkRepository = {
  create: async (values: BookmarkInsert) => {
    const res = await db.insert(Bookmark).values(values).returning();
    return handleMutation(res);
  },
  findAll: async ({ query, page, limit }: BookmarkFindAll) => {
    const res = await db.query.Bookmark.findMany({
      ...(query
        ? {
            where: (bk, { ilike, or }) =>
              or(ilike(bk.title, `%${query}%`), ilike(bk.description, `%${query}%`)),
          }
        : {}),
      orderBy: (bk, { desc }) => desc(bk.createdAt),
      limit: limit,
      offset: (page - 1) * limit,
    });
    return res;
  },
};

const handleMutation = (data: object[]) => {
  if (!data?.[0]) return null;
  return data[0];
};
