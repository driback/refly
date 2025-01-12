import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";
import { BookmarkToFolderRespository } from "~/server/db/repositorys/bookmark-to-folder.repository";
import { MutationResponse } from "../../shared.schema";
import { BookmarkToFolderInput } from "../bookmark.schema";

export const bookmarkToFolder = publicProcedure
  .input(BookmarkToFolderInput)
  .output(MutationResponse())
  .mutation(async ({ input }) => {
    const datas = input.folder.flatMap(({ id, bookmarkIds }) =>
      bookmarkIds.map((bookmarkId) => ({
        bookmarkId,
        folderId: id,
      })),
    );

    if (!datas.length) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No bookmark IDs provided",
      });
    }

    try {
      const bookmark = await BookmarkToFolderRespository.create(datas);
      if (!bookmark) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to add bookmark to folder",
        });
      }

      return {
        success: true,
        messages: "Bookmark added to folder successfully",
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        cause: error,
      });
    }
  });
