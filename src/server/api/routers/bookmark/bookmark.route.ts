import { createBookmark } from "./methods/create-bookmark";
import { findAllBookMark } from "./methods/find-all-bookmark";

export const BookmarkRoute = {
  create: createBookmark,
  findAll: findAllBookMark,
};
