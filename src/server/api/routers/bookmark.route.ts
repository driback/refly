import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { parseMetadata } from "~/lib/metadata-parser";
import { BookmarkRepository } from "~/server/db/repositorys/bookmark.repository";
import { publicProcedure } from "../trpc";

const CreateBookmarkInput = z.object({
  url: z.string().url("Invalid URL format"),
});

export const BookmarkRoute = {
  create: publicProcedure.input(CreateBookmarkInput).mutation(async ({ input }) => {
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

      const bookmark = await BookmarkRepository.create({
        url: input.url,
        title: metadata.base.title || metadata.openGraph.title || input.url,
        description: metadata.base.description || null,
        iconUrl:
          metadata.base.icon ||
          metadata.base.shortcutIcon ||
          metadata.base.appleIcon ||
          null,
        imageUrl: metadata.openGraph.image?.url || null,
      });

      return bookmark;
    } catch (error) {
      console.error("Error creating bookmark:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create bookmark",
        cause: error,
      });
    }
  }),
};
