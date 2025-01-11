import { createFolder } from "./methods/create-folder";
import { findAllFolder } from "./methods/find-all-folder";

export const FolderRoute = {
  create: createFolder,
  findAll: findAllFolder,
};
