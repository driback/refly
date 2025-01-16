import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { Time } from "~/lib/constants";
import { hashPassword, verifyPasswordHash } from "~/lib/password";
import { db } from "~/server/db/client";
import { env } from "./env";

export const auth = betterAuth({
  appName: "refly",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    password: { hash: hashPassword, verify: verifyPasswordHash },
  },
  advanced: { cookiePrefix: "refly" },
  session: {
    freshAge: 0,
    expiresIn: Time.Month,
    updateAge: Time.Day,
    cookieCache: {
      enabled: true,
      maxAge: Time.Minute * 5,
    },
  },
  trustedOrigins: !env.VERCEL_URL ? ["http://127.0.0.1:3000"] : [env.VERCEL_URL],
  plugins: [username()],
});
