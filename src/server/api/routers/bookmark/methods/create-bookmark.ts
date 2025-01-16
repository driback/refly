import { TRPCError } from "@trpc/server";
import { env } from "~/configs/env";
import { parseMetadata } from "~/lib/metadata-parser";
import { protectedProcedure } from "~/server/api/trpc";
import { BookmarkRepository } from "~/server/db/repositorys/bookmark.repository";
import { MutationResponse } from "../../shared.schema";
import { CreateBookmarkInput } from "../bookmark.schema";

export const createBookmark = protectedProcedure
  .input(CreateBookmarkInput)
  .output(MutationResponse())
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const params = new URLSearchParams({
        api_key: env.SCRAPPER_API_KEY,
        url: input.url,
      });
      const response = await fetch(`http://api.scraperapi.com?${params.toString()}`);

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
        userId: user.id,
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

// const response = await fetch("https://api.zyte.com/v1/extract", {
//   headers: {
//     accept: "application/json, text/plain, */*",
//     "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
//     authorization: "Basic ODRhMDcwMzkwMzU1NDQ1NTg3OTY3NjI2OWJlOWFjNDU6",
//     "content-type": "application/json",
//   },
//   body: JSON.stringify({
//     url: input.url,
//     httpResponseBody: true,
//   }),
//   method: "POST",
// });

// if (!response.ok) {
//   throw new TRPCError({
//     code: "BAD_REQUEST",
//     message: `Falied to fetch URL: ${response.statusText}`,
//   });
// }

// const json = (await response.json()) as {
//   url: string;
//   status: number;
//   httpResponseBody: string;
// };

// const originalString = Buffer.from(json.httpResponseBody, "base64").toString(
//   "utf-8",
// );
