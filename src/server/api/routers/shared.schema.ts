import { z } from "zod";

export const MutationResponse = <T>(schema?: z.ZodType<T>) => {
  return z.object({
    success: z.boolean(),
    messages: z.string(),
    data: schema || z.null().default(null),
  });
};
