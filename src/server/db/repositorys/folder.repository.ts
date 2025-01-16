import { db } from "../client";
import { Folder } from "../schemas";
import { handleMutation } from "./respository.helper";

type FolderInsert = typeof Folder.$inferInsert;

export const FolderRespository = {
  create: async (values: FolderInsert) => {
    const res = await db.insert(Folder).values(values).returning();
    return handleMutation(res);
  },
  findAll: async (userId: string) => {
    const res = await db.query.Folder.findMany({
      where: (fl, { eq }) => eq(fl.userId, userId),
      orderBy: (fl, { desc }) => desc(fl.createdAt),
    });
    return res;
  },
};
