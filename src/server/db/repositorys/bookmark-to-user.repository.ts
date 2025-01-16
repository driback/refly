import { and, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { db } from "../client";
import { Bookmark, BookmarkToUser } from "../schemas";
import { handleMutation, handleQuerys } from "./respository.helper";

type BookmarkToUserInsert = typeof BookmarkToUser.$inferInsert;
type BookmarkToUserFindAll = {
  page: number;
  limit: number;
  filter: Partial<{
    userId: string;
    search: string;
    folderItemIds: string[];
  }>;
};

export const BookmarkToUserRepository = {
  create: async (values: BookmarkToUserInsert) => {
    const res = await db.insert(BookmarkToUser).values(values).returning();
    return handleMutation(res);
  },
  delete: async (ids: string[], userId: string) => {
    const res = await db
      .delete(BookmarkToUser)
      .where(
        and(inArray(BookmarkToUser.bookmarkId, ids), eq(BookmarkToUser.userId, userId)),
      )
      .returning();
    return handleMutation(res);
  },
  findAll: async ({ page, limit, filter }: BookmarkToUserFindAll) => {
    const res = await db
      .select()
      .from(BookmarkToUser)
      .innerJoin(Bookmark, eq(BookmarkToUser.bookmarkId, Bookmark.id))
      .where(buildFindAllWhereClause(filter))
      .offset((page - 1) * limit)
      .limit(limit)
      .orderBy(desc(BookmarkToUser.createdAt));
    return res;
  },
  find: async (bookmarkId: string, userId: string) => {
    const res = await db.query.BookmarkToUser.findFirst({
      where: (bk, { and, eq }) =>
        and(eq(bk.userId, userId), eq(bk.bookmarkId, bookmarkId)),
    });
    return handleQuerys(res);
  },
};

const buildFindAllWhereClause = (props: BookmarkToUserFindAll["filter"]) => {
  if (!props) return undefined;
  const whereOpt = [];

  if (props.userId) {
    whereOpt.push(eq(BookmarkToUser.userId, props.userId));
  }

  if (props.folderItemIds) {
    whereOpt.push(inArray(BookmarkToUser.bookmarkId, props.folderItemIds));
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
