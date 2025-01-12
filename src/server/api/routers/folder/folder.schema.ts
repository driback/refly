import { z } from "zod";
import { MutationResponse } from "../shared.schema";

const FolderSchema = z.object({ id: z.string(), name: z.string() });
export type TFolderSchema = z.infer<typeof FolderSchema>;

export const FindAllFolderOutput = FolderSchema.array();
export type TFindAllFolderOutput = z.infer<typeof FindAllFolderOutput>;

export const CreateFolderInput = z.object({
  folderName: z
    .string()
    .trim()
    .min(1, "Folder name is required")
    .max(255, "Folder name is too long")
    .refine((value) => !value.includes(".."), "Path traversal is not allowed")
    .refine(
      (value) => !/[<>:"|?*\\\/]/.test(value),
      "Folder name contains invalid characters",
    )
    .refine((value) => !value.startsWith("."), "Folder name cannot start with a dot")
    .refine((value) => !/\s+$/.test(value), "Folder name cannot end with whitespace")
    .transform((value) => value.trim()),
});

export const CreateFolderOutput = MutationResponse(
  z.object({ id: z.string(), name: z.string() }),
);
