import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { env } from "~/env";
import { db } from "~/server/db";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        genericOAuth({
            config: [
                {
                    providerId: "keycloak",
                    clientId: "kits-kitchen-web",
                    clientSecret: "",
                    discoveryUrl: `${process.env.KEYCLOAK_INTERNAL_URL}/realms/kits-kitchen/.well-known/openid-configuration`,
                    authorizationUrl: `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/kits-kitchen/protocol/openid-connect/auth`,
                    tokenUrl: `${process.env.KEYCLOAK_INTERNAL_URL}/realms/kits-kitchen/protocol/openid-connect/token`,
                    scopes: ["openid", "profile", "email"],
                },
            ],
        }),
    ],
});

export type Session = typeof auth.$Infer.Session;
