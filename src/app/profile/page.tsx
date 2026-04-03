"use client";
import { authClient } from "~/server/better-auth/client";
import { Box, Typography } from "@mui/material";
import { redirect } from "next/navigation";

export default function ProfilePage() {
    const { data: session } = authClient.useSession();

    if (!session) redirect("/");

    return (
        <Box className="flex w-full justify-center">
            <Typography className="pt-6 text-xl">Viewing profile for: {session.user.name}</Typography>
        </Box>
    );
}
