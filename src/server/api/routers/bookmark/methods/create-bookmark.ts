import { TRPCError } from "@trpc/server";
import { parseMetadata } from "~/lib/metadata-parser";
import { publicProcedure } from "~/server/api/trpc";
import { BookmarkRepository } from "~/server/db/repositorys/bookmark.repository";
import { CreateBookmarkInput } from "../bookmark.schema";

export const createBookmark = publicProcedure
  .input(CreateBookmarkInput)
  .mutation(async ({ input }) => {
    try {
      const response = await fetch(input.url, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      });

      if (!response.ok) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Failed to fetch URL: ${response.statusText}`,
        });
      }

      const text = await response.text();
      const metadata = parseMetadata(text);

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
          message: "Failed to bookmark",
        });
      }

      return bookmark;
    } catch (error) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      throw error;
    }
  });
