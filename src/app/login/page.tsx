"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "~/server/better-auth/client";
import {
    Box,
    Button,
    Container,
    Divider,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

//todo: add a middleware file that will redirect us here if no session, unless we want to support non logged in users which is likely?
export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleCredentialsLogin = async () => {
        setIsLoading(true);
        setError("");
        const { error } = await authClient.signIn.email({
            email,
            password,
        });
        if (error) {
            setError(error.message ?? "Login failed");
        } else {
            router.push("/");
        }
        setIsLoading(false);
    };

    const handleKeycloakLogin = async () => {
        await authClient.signIn.social({
            provider: "keycloak",
            callbackURL: "/",
        });
    };

    return (
        <Container maxWidth="sm">
            <Box className="flex flex-col items-center pt-16">
                <Typography className="mb-8">
                    Welcome to Kits Burger Kitchen
                </Typography>

                <Stack spacing={2} className="w-full">
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleCredentialsLogin()
                        }
                    />
                    {error && (
                        <Typography color="error" variant="body2">
                            {error}
                        </Typography>
                    )}
                    <Button
                        variant="contained"
                        className="btn-primary"
                        onClick={handleCredentialsLogin}
                        disabled={isLoading}
                        fullWidth
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                    <Divider>or</Divider>
                    <Button
                        variant="outlined"
                        className="btn-primary"
                        onClick={handleKeycloakLogin}
                        fullWidth
                    >
                        Sign in with Keycloak
                    </Button>
                    <Typography variant="body2" textAlign="center">
                        Need an account?{" "}
                        <Typography
                            component="a"
                            href="/register"
                            variant="body2"
                            color="primary"
                        >
                            Register here!
                        </Typography>
                    </Typography>
                </Stack>
            </Box>
        </Container>
    );
}
/*


<Typography variant="body2" textAlign="center">
    Don't have an account?{" "}
    <Typography
        component="a"
        href="/register"
        variant="body2"
        color="primary"
    >
        Register
    </Typography>
</Typography>
</Stack>
</Box>
</Container>
);
}*/
