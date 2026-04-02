"use client";

//pun intended
import { useState } from "react";
import {
    AppBar,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Toolbar,
} from "@mui/material";
import { CatIcon, SquareMenuIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useReviewModal } from "~/app/contexts/ReviewModalContext";
import { authClient } from "~/server/better-auth/client";
import axios from "axios";

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { openView, openCreate } = useReviewModal();
    const { data: session } = authClient.useSession();

    return (
        <>
            <AppBar position="static" elevation={0}>
                <Toolbar className="justify-between">
                    <CatIcon
                        onClick={() => router.push("/")}
                        className="h-8 w-8 cursor-pointer"
                    />
                    <IconButton
                        aria-expanded={open}
                        aria-controls="mobile-nav-drawer"
                        aria-label="open navigation menu"
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <SquareMenuIcon className="h-8 w-8 stroke-white" />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="right"
                open={open}
                className=""
                slotProps={{
                    paper: {
                        className: "bg-frostedBlue",
                    },
                }}
                onClose={() => {
                    setOpen(false);
                }}
            >
                <List>
                    <ListItemButton
                        onClick={() => setOpen(false)}
                        className="justify-end"
                        aria-label="close navigation menu"
                    >
                        <XIcon className="stroke-current" />
                    </ListItemButton>
                    <ListItemButton onClick={() => setOpen(false)}>
                        <ListItemText className="text-black" primary="Home" />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => {
                            openCreate();
                            setOpen(false);
                        }}
                    >
                        <ListItemText
                            className="text-black"
                            primary="Add Review"
                        />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => {
                            setOpen(false);
                            router.push("/restaurants");
                        }}
                    >
                        <ListItemText
                            className="text-black"
                            primary="Find Restaurants"
                        />
                    </ListItemButton>
                    {session ? (
                        <>
                            <ListItemButton
                                onClick={() => {
                                    setOpen(false);
                                    router.push("/profile");
                                }}
                            >
                                <ListItemText
                                    className="text-black"
                                    primary="View Profile"
                                />
                            </ListItemButton>
                            <ListItemButton
                                onClick={async () => {
                                    await Promise.all([
                                        axios.post("/api/auth/signout"),
                                        authClient.signOut(),
                                    ]);
                                    router.refresh();
                                    router.push("/");
                                }}
                            >
                                <ListItemText
                                    className="text-black"
                                    primary="Sign Out"
                                />
                            </ListItemButton>
                        </>
                    ) : (
                        <ListItemButton
                            onClick={() => {
                                setOpen(false);
                                router.push("/login");
                            }}
                        >
                            <ListItemText
                                className="text-black"
                                primary="Login"
                            />
                        </ListItemButton>
                    )}
                </List>
            </Drawer>
        </>
    );
}

/*
{session ? (
                        <UserIcon onClick={() => router.push("/profile")} />
                    ) : (
                        <Button
                            aria-label="login button"
                            variant="contained"
                            className="btn-primary"
                            onClick={ () => {
                                router.push("/login")
                            }}
                        >
                            Login
                        </Button>
                    )}
 */
