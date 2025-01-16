import { protectedProcedure } from "~/server/api/trpc";
import { FolderRespository } from "~/server/db/repositorys/folder.repository";
import { FindAllFolderOutput, type TFindAllFolderOutput } from "../folder.schema";

export const findAllFolder = protectedProcedure
  .output(FindAllFolderOutput)
  .query(async ({ ctx: { user } }) => {
    const res = await FolderRespository.findAll(user.id);
    const output: TFindAllFolderOutput = res.map((folder) => ({
      id: folder.id,
      name: folder.name,
    }));
    return output;
  });
