import { bookmarkToFolder } from "./methods/bookmark-to-folder";
import { createBookmark } from "./methods/create-bookmark";
import { deleteBookmark } from "./methods/delete-bookmark";
import { findAllBookMark } from "./methods/find-all-bookmark";
import { removeBookmarkFromFolder } from "./methods/remove-bookmark-from-folder";

export const BookmarkRoute = {
  create: createBookmark,
  delete: deleteBookmark,
  remove: removeBookmarkFromFolder,
  findAll: findAllBookMark,
  toFolder: bookmarkToFolder,
};
