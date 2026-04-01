"use client"

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
import {CatIcon, SquareMenuIcon, XIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import { useReviewModal } from "~/app/contexts/ReviewModalContext";

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { openView, openCreate } = useReviewModal();

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
                    <ListItemButton onClick={() => setOpen(false)}>
                        <ListItemText
                            className="text-black"
                            primary="Find Restaurants"
                        />
                    </ListItemButton>
                    <ListItemButton onClick={() => setOpen(false)}>
                        {/*todo adding session check and profile icon*/}
                        <ListItemText className="text-black" primary="Login" />
                    </ListItemButton>
                </List>
            </Drawer>
        </>
    );
}