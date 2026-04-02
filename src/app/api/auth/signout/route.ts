import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/server/better-auth/config";

async function getKeycloakAdminToken() {
    const res = await fetch(
        `${process.env.KEYCLOAK_INTERNAL_URL}/realms/master/protocol/openid-connect/token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                grant_type: "client_credentials",
                client_id: "admin-cli",
                username: "admin",
                password: "admin",
                // grant_type: "password",
            }),
        },
    );
    const data = (await res.json()) as { access_token: string };
    return data.access_token;
}

//very hacky, close all sessions, this is ONLY for sake of poc for interview. in production we would not do this. It turns out better auth doesn't support tokens fully yet, i picked better auth as a way to learn something new
export async function POST(req: NextRequest) {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return NextResponse.json({ success: false });

    try {
        const adminToken = await getKeycloakAdminToken();

        const usersRes = await fetch(
            `${process.env.KEYCLOAK_INTERNAL_URL}/admin/realms/kits-kitchen/users?email=${session.user.email}`,
            {
                headers: { Authorization: `Bearer ${adminToken}` },
            },
        );
        const users = (await usersRes.json()) as { id: string }[];
        const keycloakUserId = users[0]?.id;

        if (keycloakUserId) {
            await fetch(
                `${process.env.KEYCLOAK_INTERNAL_URL}/admin/realms/kits-kitchen/users/${keycloakUserId}/logout`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${adminToken}` },
                },
            );
        }

        return NextResponse.json({ success: true });
    } catch (e) {
        console.error("Keycloak session revocation failed:", e);
        return NextResponse.json({ success: false });
    }
}
