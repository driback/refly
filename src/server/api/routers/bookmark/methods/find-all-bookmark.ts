import { publicProcedure } from "~/server/api/trpc";
import { BookmarkRepository } from "~/server/db/repositorys/bookmark.repository";
import {
  FindAllBookmarkInput,
  FindAllBookmarkOutput,
  type TBookmarkSchema,
} from "../bookmark.schema";

export const findAllBookMark = publicProcedure
  .input(FindAllBookmarkInput)
  .output(FindAllBookmarkOutput)
  .query(async ({ input }) => {
    const res = await BookmarkRepository.findAll(input);

    const output: TBookmarkSchema[] = res.map((s) => ({
      title: s.title!,
      description: s.description!,
      icon: s.iconUrl,
      image: s.imageUrl,
      url: s.url,
    }));

    return output;
  });
