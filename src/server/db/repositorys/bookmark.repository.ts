import { and, eq, ilike, inArray, or } from "drizzle-orm";
import { db } from "../client";
import { Bookmark, BookmarkToFolder } from "../schemas";
import { handleMutation } from "./respository.helper";

type BookmarkInsert = typeof Bookmark.$inferInsert;
type BookmarkAddFolderInsert = typeof BookmarkToFolder.$inferInsert;
type BookmarkFindAll = {
  page: number;
  limit: number;
  filter: Partial<{
    userId: string;
    search: string;
    folderItemIds: string[];
  }>;
};

export const BookmarkRepository = {
  create: async (values: BookmarkInsert) => {
    const res = await db.insert(Bookmark).values(values).returning();
    return handleMutation(res);
  },
  delete: async (ids: string[], userId: string) => {
    const res = await db
      .delete(Bookmark)
      .where(and(eq(Bookmark.userId, inArray(Bookmark.id, ids))))
      .returning();
    return handleMutation(res);
  },
  addFolder: async (values: BookmarkAddFolderInsert[]) => {
    const res = await db.insert(BookmarkToFolder).values(values).returning();
    return handleMutation(res);
  },
  findAll: async ({ page, limit, filter }: BookmarkFindAll) => {
    const res = await db.query.Bookmark.findMany({
      where: buildFindAllWhereClause(filter),
      orderBy: (bk, { desc }) => desc(bk.createdAt),
      limit: limit,
      offset: (page - 1) * limit,
    });
    return res;
  },
};

const buildFindAllWhereClause = (props: BookmarkFindAll["filter"]) => {
  if (!props) return undefined;
  const whereOpt = [];

  if (props.userId) {
    whereOpt.push(eq(Bookmark.userId, props.userId));
  }

  if (props.folderItemIds) {
    whereOpt.push(inArray(Bookmark.id, props.folderItemIds));
  }

  if (props.search) {
    whereOpt.push(
      or(
        ilike(Bookmark.title, `%${props.search}%`),
        ilike(Bookmark.description, `%${props.search}%`),
      ),
    );
  }

  return and(...whereOpt);
};
