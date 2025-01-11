import { z } from "zod";

const BookmarkSchema = z.object({
  title: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  image: z.string().nullable(),
  url: z.string(),
});
export type TBookmarkSchema = z.infer<typeof BookmarkSchema>;

export const CreateBookmarkInput = z.object({
  url: z.string().url("Invalid URL format"),
});

export const FindAllBookmarkInput = z.object({
  query: z.string().optional(),
  page: z.number(),
  limit: z.number(),
});
export type TFindAllBookmarkInput = z.infer<typeof FindAllBookmarkInput>;

export const FindAllBookmarkOutput = BookmarkSchema.array();
