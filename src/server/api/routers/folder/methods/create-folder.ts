import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "~/server/api/trpc";
import { FolderRespository } from "~/server/db/repositorys/folder.repository";
import { CreateFolderInput, CreateFolderOutput } from "../folder.schema";

export const createFolder = protectedProcedure
  .input(CreateFolderInput)
  .output(CreateFolderOutput)
  .mutation(async ({ input, ctx: { user } }) => {
    try {
      const folder = await FolderRespository.create({
        name: input.folderName,
        userId: user.id,
      });

      if (!folder) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Failed to create folder",
        });
      }

      return {
        success: true,
        messages: "Folder created successfully",
        data: { id: folder.id, name: folder.name },
      };
    } catch (error) {
      if (error instanceof TRPCError) throw error;

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error instanceof Error ? error.message : "Unknown error occurred",
        cause: error,
      });
    }
  });
