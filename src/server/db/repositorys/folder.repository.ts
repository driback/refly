import { db } from "../client";
import { Folder } from "../schemas";
import { handleMutation } from "./respository.helper";

type FolderInsert = typeof Folder.$inferInsert;

export const FolderRespository = {
  create: async (values: FolderInsert) => {
    const res = await db.insert(Folder).values(values).returning();
    return handleMutation(res);
  },
  findAll: async () => {
    const res = await db.query.Folder.findMany();
    return res;
  },
};
