import { publicProcedure } from "~/server/api/trpc";
import { FolderRespository } from "~/server/db/repositorys/folder.repository";
import { FindAllFolderOutput, type TFindAllFolderOutput } from "../folder.schema";

export const findAllFolder = publicProcedure
  .output(FindAllFolderOutput)
  .query(async () => {
    const res = await FolderRespository.findAll();
    const output: TFindAllFolderOutput = res.map((folder) => ({
      id: folder.id,
      name: folder.name,
    }));
    return output;
  });
