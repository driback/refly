import { protectedProcedure } from "~/server/api/trpc";
import { db } from "~/server/db/client";
import { BookmarkToUserRepository } from "~/server/db/repositorys/bookmark-to-user.repository";
import {
  FindAllBookmarkInput,
  FindAllBookmarkOutput,
  type TBookmarkSchema,
} from "../bookmark.schema";

export const findAllBookMark = protectedProcedure
  .input(FindAllBookmarkInput)
  .output(FindAllBookmarkOutput)
  .query(async ({ input, ctx: { user } }) => {
    const { page, limit, search, folderId } = input;

    let folderItemIds: string[] | undefined = undefined;

    if (folderId) {
      const folderRes = await db.query.BookmarkToFolder.findMany({
        where: (fol, { eq }) => eq(fol.folderId, folderId),
      });
      folderItemIds = folderRes.map((f) => f.bookmarkId);
    }

    const res = await BookmarkToUserRepository.findAll({
      page,
      limit,
      filter: { folderItemIds, userId: user.id, search },
    });

    const output: TBookmarkSchema[] = res.map(({ bookmark }) => ({
      id: bookmark.id,
      title: bookmark.title!,
      description: bookmark.description!,
      icon: bookmark.iconUrl,
      image: bookmark.imageUrl,
      url: bookmark.url,
      hostname: new URL(bookmark.url).host,
    }));

    return output;
  });
