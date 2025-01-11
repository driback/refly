import { TRPCError } from "@trpc/server";
import { publicProcedure } from "~/server/api/trpc";
import { FolderRespository } from "~/server/db/repositorys/folder.repository";
import { CreateFolderInput } from "../folder.schema";

export const createFolder = publicProcedure
  .input(CreateFolderInput)
  .mutation(async ({ input }) => {
    try {
      const folder = await FolderRespository.create({
        name: input.folderName,
      });

      if (!folder) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create folder",
        });
      }

      return {
        success: true,
        folder,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error.message,
        });
      }
      throw error;
    }
  });
