import { TRPCError } from "@trpc/server";
import { parseMetadata } from "~/lib/metadata-parser";
import { publicProcedure } from "~/server/api/trpc";
import { BookmarkRepository } from "~/server/db/repositorys/bookmark.repository";
import { MutationResponse } from "../../shared.schema";
import { CreateBookmarkInput } from "../bookmark.schema";

export const createBookmark = publicProcedure
  .input(CreateBookmarkInput)
  .output(MutationResponse())
  .mutation(async ({ input }) => {
    try {
      const response = await fetch(input.url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!response.ok) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Falied to fetch URL: ${response.statusText}`,
        });
      }

      const text = await response.text();
      const metadata = parseMetadata(text, input.url);

      const iconUrl =
        metadata.base.icon ||
        metadata.base.shortcutIcon ||
        metadata.base.appleIcon ||
        null;

      const bookmark = await BookmarkRepository.create({
        url: input.url,
        title: metadata.base.title || metadata.openGraph.title || input.url,
        description: metadata.base.description || null,
        imageUrl: metadata.openGraph.image?.url || iconUrl,
        iconUrl,
      });

      if (!bookmark) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create bookmark",
        });
      }

      if (input.folders?.length) {
        await BookmarkRepository.addFolder(
          input.folders.map((folderId) => ({ folderId, bookmarkId: bookmark.id })),
        );
      }

      return {
        success: true,
        messages: "Bookmark created successfully",
      };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        cause: error,
      });
    }
  });
