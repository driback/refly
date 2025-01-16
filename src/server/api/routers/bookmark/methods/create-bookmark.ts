import { TRPCError } from "@trpc/server";
import { env } from "~/configs/env";
import { parseMetadata } from "~/lib/metadata-parser";
import { protectedProcedure } from "~/server/api/trpc";
import { BookmarkToUserRepository } from "~/server/db/repositorys/bookmark-to-user.repository";
import { BookmarkRepository } from "~/server/db/repositorys/bookmark.repository";
import { MutationResponse } from "../../shared.schema";
import { CreateBookmarkInput } from "../bookmark.schema";

interface ScrapedMetadata {
  title: string;
  description: string | null;
  imageUrl: string | null;
  iconUrl: string | null;
}

async function scrapeUrl(url: string): Promise<ScrapedMetadata> {
  const params = new URLSearchParams({
    api_key: env.SCRAPPER_API_KEY,
    url,
  });

  const response = await fetch(`http://api.scraperapi.com?${params.toString()}`);
  if (!response.ok) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `Failed to fetch URL: ${response.statusText}`,
    });
  }

  const text = await response.text();
  const metadata = parseMetadata(text, url);

  const iconUrl =
    metadata.base.icon || metadata.base.shortcutIcon || metadata.base.appleIcon || null;

  return {
    title: metadata.base.title || metadata.openGraph.title || url,
    description: metadata.base.description || null,
    imageUrl: metadata.openGraph.image?.url || iconUrl,
    iconUrl,
  };
}

export const createBookmark = protectedProcedure
  .input(CreateBookmarkInput)
  .output(MutationResponse())
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      let bookmark = await BookmarkRepository.findByUrl(input.url);

      if (!bookmark) {
        const metadata = await scrapeUrl(input.url);
        bookmark = await BookmarkRepository.create({
          url: input.url,
          ...metadata,
        });

        if (!bookmark) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Failed to create bookmark",
          });
        }
      }

      const findUserBookmark = await BookmarkToUserRepository.find(bookmark.id, user.id);
      if (findUserBookmark) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Bookmark already in your collection",
        });
      }

      const userBookmark = await BookmarkToUserRepository.create({
        bookmarkId: bookmark.id,
        userId: user.id,
      });

      if (!userBookmark) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create user bookmark association",
        });
      }

      if (input.folders?.length) {
        await BookmarkRepository.addFolder(
          input.folders.map((folderId) => ({
            folderId,
            bookmarkId: bookmark.id,
          })),
        );
      }

      return {
        success: true,
        messages: "Bookmark created successfully",
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
