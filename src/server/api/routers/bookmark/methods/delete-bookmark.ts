import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";
import { BookmarkRepository } from "~/server/db/repositorys/bookmark.repository";
import { MutationResponse } from "../../shared.schema";
import { DeleteBookmarkInput } from "../bookmark.schema";

export const deleteBookmark = publicProcedure
  .input(DeleteBookmarkInput)
  .output(MutationResponse())
  .mutation(async ({ input }) => {
    if (!input.ids?.length) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No bookmark IDs provided",
      });
    }

    try {
      const deleteBookmark = await BookmarkRepository.delete(input.ids);
      if (!deleteBookmark) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No bookmarks found with the provided IDs",
        });
      }

      return {
        success: true,
        messages: `Successfully deleted ${input.ids.length} bookmark(s)`,
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        cause: error,
      });
    }
  });
