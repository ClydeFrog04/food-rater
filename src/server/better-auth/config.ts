import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";
import { memoryAdapter } from "better-auth/adapters/memory"

const db = {
    user: [],
    session: [],
    account: [],
    verification: [],
}

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
    },
    database: memoryAdapter(db),

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

const seedDemoUser = async () => {
    try {
        await auth.api.signUpEmail({
            body: {
                email: "kit@thisiskitskitchen.com",
                password: "kitpass1/",
                name: "Kit Egan",
            }
        })
    } catch {
    }
}

void seedDemoUser()

export type Session = typeof auth.$Infer.Session;
