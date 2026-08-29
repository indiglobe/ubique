import { betterAuth } from "better-auth";
import { env } from "@repo/env/server";

const isProd = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  baseURL: env.WEB_APP_HOST,
  secret: env.BETTER_AUTH_SECRET,

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
      strategy: "jwt",
      refreshCache: true,
    },
  },

  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      redirectURI: `${env.WEB_APP_HOST}/api/auth/callback/google`,
    },
  },

  advanced: {
    useSecureCookies: isProd,
    defaultCookieAttributes: {
      sameSite: isProd ? "none" : "lax",
      secure: isProd,
      httpOnly: true,
      ...(isProd && {
        domain: env.WEB_APP_HOST.split("://")[1],
      }),
      path: "/",
    },
  },
});
