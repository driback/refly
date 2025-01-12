import { bookmarkToFolder } from "./methods/bookmark-to-folder";
import { createBookmark } from "./methods/create-bookmark";
import { deleteBookmark } from "./methods/delete-bookmark";
import { findAllBookMark } from "./methods/find-all-bookmark";

export const BookmarkRoute = {
  create: createBookmark,
  delete: deleteBookmark,
  findAll: findAllBookMark,
  toFolder: bookmarkToFolder,
};
