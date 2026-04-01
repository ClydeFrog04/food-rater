import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import Providers from "~/app/components/Providers";
import TopBar from "~/app/components/Navigation/TopBar";
import HamburgerMenu from "~/app/components/Navigation/HamburgerMenu";
import { Box } from "@mui/material";

export const metadata: Metadata = {
    title: "Kits Burger Kitchen",
    description: "A social media platform where you rate burgers. it's simple",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${geist.variable}`}>
            <body>
                <Providers>
                    <div id="root">
                        <Box className="hidden md:block">
                            <TopBar />
                        </Box>
                        <Box className="block md:hidden">
                            <HamburgerMenu />
                        </Box>
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
