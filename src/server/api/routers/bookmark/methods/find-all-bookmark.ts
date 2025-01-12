import { publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db/client";
import { BookmarkRepository } from "~/server/db/repositorys/bookmark.repository";
import {
  FindAllBookmarkInput,
  FindAllBookmarkOutput,
  type TBookmarkSchema,
} from "../bookmark.schema";

export const findAllBookMark = publicProcedure
  .input(FindAllBookmarkInput)
  .output(FindAllBookmarkOutput)
  .query(async ({ input }) => {
    const { page, limit, search, folderId } = input;

    let folderItemIds: string[] | undefined = undefined;

    if (folderId) {
      const folderRes = await db.query.BookmarkToFolder.findMany({
        where: (fol, { eq }) => eq(fol.folderId, folderId),
      });

      folderItemIds = folderRes.map((f) => f.bookmarkId);
    }

    const res = await BookmarkRepository.findAll({
      page,
      limit,
      filter: { search, folderItemIds },
    });

    const output: TBookmarkSchema[] = res.map((s) => ({
      id: s.id,
      title: s.title!,
      description: s.description!,
      icon: s.iconUrl,
      image: s.imageUrl,
      url: s.url,
    }));

    return output;
  });
