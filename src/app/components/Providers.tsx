"use client";
import {
    StyledEngineProvider,
    createTheme,
    ThemeProvider,
} from "@mui/material/styles";
import { AppColours } from "~/app/lib/AppColours";
import { ReviewModalContextProvider } from "~/app/contexts/ReviewModalContext";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: { main: AppColours.seaGreen },
        secondary: { main: AppColours.deepSkyBlue },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
        h1: { fontSize: "2rem", fontWeight: 500, color: "white" },
    },
});

export default function Providers({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <ReviewModalContextProvider>
                    {children}
                </ReviewModalContextProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
