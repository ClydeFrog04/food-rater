/*
Logo / app name on the left — clicking it goes home
"Add Review" button on the right — this is the primary action, always one click away regardless of what page you're on
User avatar or profile indicator on the far right — shows you're logged in, clicking it opens a small dropdown with "Profile" and "Sign out"
On mobile, a hamburger icon replaces the navigation items
 */
"use client";
import {
    AppBar,
    Box,
    Button,
    Menu,
    MenuItem,
    Stack,
    Toolbar,
} from "@mui/material";
import { CatIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "~/server/better-auth/client";
import { useReviewModal } from "~/app/contexts/ReviewModalContext";
import axios from "axios";
import { useRef, useState } from "react";

export default function TopBar() {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const { openView, openCreate } = useReviewModal();
    const [menuAnchorEl, setMenuAnchorEl] = useState<
        HTMLElement | SVGElement | null
    >(null);

    return (
        <AppBar elevation={0} position="static">
            <Menu
                open={!!menuAnchorEl}
                anchorEl={menuAnchorEl}
                onClose={() => setMenuAnchorEl(null)}
                slotProps={{
                    paper: {
                        className: "min-w-[200px] p-4",
                    },
                }}
            >
                <Stack spacing={1}>
                    <MenuItem
                        onClick={() => {
                            setMenuAnchorEl(null);
                            router.push("/profile");
                        }}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem
                        className="btn-primary"
                        onClick={async () => {
                            await Promise.all([
                                axios.post("/api/auth/signout"),
                                authClient.signOut(),
                            ]);
                            router.refresh();
                            router.push("/");
                            setMenuAnchorEl(null);
                        }}
                    >
                        Sign Out
                    </MenuItem>
                </Stack>
            </Menu>
            <Toolbar className="flex justify-between">
                <CatIcon
                    onClick={() => router.push("/")}
                    className="h-8 w-8 cursor-pointer"
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
                        onClick={() => {
                            router.push("/restaurants");
                        }}
                    >
                        Find Restaurants
                    </Button>
                    <Button
                        aria-label="add burger review"
                        variant="contained"
                        className="btn-primary"
                        onClick={openCreate}
                    >
                        Add Review
                    </Button>
                    {session ? (
                        <UserIcon
                            className="cursor-pointer"
                            onClick={(event) => {
                                setMenuAnchorEl(event.currentTarget);
                            }}
                        />
                    ) : (
                        <Button
                            aria-label="login button"
                            variant="contained"
                            className="btn-primary"
                            onClick={() => {
                                router.push("/login");
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
