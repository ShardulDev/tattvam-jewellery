import { z } from "zod";

const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url().optional(),
});

export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}
