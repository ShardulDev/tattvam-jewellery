import postgres from "postgres";
import { z } from "zod";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

if (existsSync(".env.local")) process.loadEnvFile(".env.local");

const config = z
  .object({
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(32),
    BETTER_AUTH_URL: z.string().url().optional(),
    OWNER_EMAIL: z.email(),
    OWNER_NAME: z.string().trim().min(1).max(120),
  })
  .parse(process.env);

const client = postgres(config.DATABASE_URL, { max: 1, prepare: false });
let ownerAlreadyExists = false;
try {
  const owners = await client<
    { email: string }[]
  >`select email from "user" where role = 'OWNER'`;
  if (
    owners.some((owner) => owner.email.toLowerCase() === config.OWNER_EMAIL.toLowerCase())
  ) {
    ownerAlreadyExists = true;
  } else if (owners.length > 0) {
    throw new Error(
      "An OWNER account already exists with a different email. Refusing to create another.",
    );
  } else {
    const existing = await client<
      { role: string }[]
    >`select role from "user" where lower(email) = lower(${config.OWNER_EMAIL})`;
    if (existing.length > 0)
      throw new Error(
        "This email is already assigned to a non-owner administrator. Refusing to change its role.",
      );
  }
} finally {
  await client.end();
}

if (ownerAlreadyExists) {
  console.info("The configured owner account already exists; nothing to do.");
  process.exitCode = 0;
} else {
  console.info(
    "Create the initial owner. Enter the password only at the secure interactive prompt.",
  );
  const child = spawn(
    "pnpm",
    [
      "exec",
      "auth",
      "create-admin",
      "--config",
      "src/server/auth/cli-config.ts",
      "--email",
      config.OWNER_EMAIL,
      "--name",
      config.OWNER_NAME,
      "--role",
      "OWNER",
    ],
    { stdio: "inherit", env: process.env },
  );
  const exitCode = await new Promise<number>((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
  process.exitCode = exitCode;
}
