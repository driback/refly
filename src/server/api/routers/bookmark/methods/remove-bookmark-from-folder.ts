import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";
import { BookmarkToFolderRespository } from "~/server/db/repositorys/bookmark-to-folder.repository";
import { RemoveBookmarkFromFolderInput } from "../bookmark.schema";

export const removeBookmarkFromFolder = protectedProcedure
  .input(RemoveBookmarkFromFolderInput)
  .mutation(async ({ input }) => {
    try {
      const deleteBookmark = await BookmarkToFolderRespository.delete(
        input.bookmarkId,
        input.folderId,
      );
      if (!deleteBookmark) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No bookmarks found with the provided IDs",
        });
      }

      return {
        success: true,
        messages: `Successfully deleted ${input.bookmarkId} from ${input.folderId}`,
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        cause: error,
      });
    }
  });
