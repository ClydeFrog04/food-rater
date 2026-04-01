//reusable component so i can use in modal as well as the review preview card:]
"use client";
import type { ReactNode } from "react";
import { Rating, Stack, Typography } from "@mui/material";

type ParamsT = {
    label: string;
    name: string;
    value: number;
    icon: ReactNode;
    emptyIcon: ReactNode;
    disabled?: boolean;
    onChange?: (value: number) => void;
};

export default function BurgerStarRating({
    label,
    name,
    value,
    icon,
    emptyIcon,
    disabled,
    onChange,
}: ParamsT) {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            gap={{xs: 0, sm: 2}}
        >
        {/*<Stack direction="row" alignItems="center" gap={2}>*/}
            <Typography variant="body2" width={100}>
                {label}
            </Typography>
            <Rating
                name={name}
                value={value}
                disabled={disabled}
                onChange={(_, newRating) => onChange?.(newRating ?? 1)}
                icon={icon}
                emptyIcon={emptyIcon}
            />
        </Stack>
    );
}
