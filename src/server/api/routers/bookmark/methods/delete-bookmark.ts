import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";
import { BookmarkToUserRepository } from "~/server/db/repositorys/bookmark-to-user.repository";
import { MutationResponse } from "../../shared.schema";
import { DeleteBookmarkInput } from "../bookmark.schema";

export const deleteBookmark = protectedProcedure
  .input(DeleteBookmarkInput)
  .output(MutationResponse())
  .mutation(async ({ input, ctx: { user } }) => {
    if (!input.ids?.length) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No bookmark IDs provided",
      });
    }

    try {
      const deleteBookmark = await BookmarkToUserRepository.delete(input.ids, user.id);
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
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        cause: error,
      });
    }
  });
