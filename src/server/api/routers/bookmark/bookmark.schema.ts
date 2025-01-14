import { z } from "zod";

const BookmarkSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  icon: z.string().nullable(),
  image: z.string().nullable(),
  url: z.string(),
  hostname: z.string(),
});
export type TBookmarkSchema = z.infer<typeof BookmarkSchema>;

export const CreateBookmarkInput = z.object({
  url: z.string().url("Invalid URL format"),
  folders: z.string().array().optional(),
});

export const FindAllBookmarkInput = z.object({
  page: z.number(),
  limit: z.number(),
  search: z.string().optional(),
  folderId: z.string().optional(),
});
export type TFindAllBookmarkInput = z.infer<typeof FindAllBookmarkInput>;

export const FindAllBookmarkOutput = BookmarkSchema.array();

export const BookmarkToFolderInput = z.object({
  folder: z
    .object({
      id: z.string(),
      bookmarkIds: z.string().array(),
    })
    .array(),
});

export const DeleteBookmarkInput = z.object({ ids: z.string().array() });
export const RemoveBookmarkFromFolderInput = z.object({
  bookmarkId: z.string(),
  folderId: z.string(),
});
