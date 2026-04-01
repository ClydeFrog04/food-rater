/*
Logo / app name on the left — clicking it goes home
"Add Review" button on the right — this is the primary action, always one click away regardless of what page you're on
User avatar or profile indicator on the far right — shows you're logged in, clicking it opens a small dropdown with "Profile" and "Sign out"
On mobile, a hamburger icon replaces the navigation items
 */
"use client";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { CatIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "~/server/better-auth/client";

export default function TopBar() {
    const router = useRouter();
    const {data: session} = authClient.useSession();

    return (
        <AppBar>
            <Toolbar className="flex justify-between">
                <CatIcon
                    onClick={() => router.push("/")}
                    className="cursor-pointer"
                />
                <Box
                    id="page-links"
                    aria-label="page navigation"
                    className="flex gap-4"
                >
                    <Button
                        aria-label="Find other burger restaurants"
                        variant="contained"
                        className="btn-primary"
                    >
                        Find Restaurants
                    </Button>
                    <Button
                        aria-label="add burger review"
                        variant="contained"
                        className="btn-primary"
                    >
                        Add Review
                    </Button>
                    {session ? (
                        <UserIcon onClick={() => router.push("/profile")} />
                    ) : (
                        <Button
                            aria-label="login button"
                            variant="contained"
                            className="btn-primary"
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}