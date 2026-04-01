"use client"
import { Container, Rating, Stack, Typography } from "@mui/material";
import { useState } from "react";
import {
    ChefHatIcon,
    HamburgerIcon,
    HeaterIcon,
    UtensilsCrossedIcon,
} from "lucide-react";
import type { RatingT, ReviewT } from "~/app/lib/ReviewTypes";

type ParamsT = {
    isCreate: boolean;
};

type RatingParamsT = {
    isCreate: boolean;
    rating: RatingT;
    onChange: (rating: RatingT) => void;
};
const BurgerRating = ({ isCreate, rating, onChange }: RatingParamsT) => {
    //(taste, texture, presentation each 1–5)

    return (
        <Stack spacing={2}>
            <Stack direction="row" alignItems="center" gap={2}>
                <Typography variant="body2" width={100}>
                    Taste
                </Typography>
                <Rating
                    name="taste"
                    value={rating.taste}
                    disabled={!isCreate}
                    onChange={(_, newRating) =>
                        onChange({ ...rating, taste: newRating ?? 1 })
                    }
                    icon={
                        <HamburgerIcon
                            className="stroke-goldenApricot"
                            size={28}
                        />
                    }
                    emptyIcon={
                        <HamburgerIcon className="stroke-grey-300" size={28} />
                    }
                />
            </Stack>

            <Stack direction="row" alignItems="center" gap={2}>
                <Typography variant="body2" width={100}>
                    Texture
                </Typography>
                <Rating
                    name="texture"
                    value={rating.texture}
                    disabled={!isCreate}
                    onChange={(_, newRating) =>
                        onChange({ ...rating, texture: newRating ?? 1 })
                    }
                    icon={
                        <UtensilsCrossedIcon
                            className="stroke-goldenApricot"
                            size={28}
                        />
                    }
                    emptyIcon={
                        <UtensilsCrossedIcon
                            className="stroke-grey-300"
                            size={28}
                        />
                    }
                />
            </Stack>

            <Stack direction="row" alignItems="center" gap={2}>
                <Typography variant="body2" width={100}>
                    Presentation
                </Typography>
                <Rating
                    name="presentation"
                    value={rating.presentation}
                    disabled={!isCreate}
                    onChange={(_, newRating) =>
                        onChange({ ...rating, presentation: newRating ?? 1 })
                    }
                    icon={
                        <ChefHatIcon
                            className="stroke-goldenApricot"
                            size={28}
                        />
                    }
                    emptyIcon={
                        <ChefHatIcon className="stroke-grey-300" size={28} />
                    }
                />
            </Stack>
        </Stack>
    );
};

export default function ReviewModal({ isCreate }: ParamsT) {
    const [rating, setRating] = useState<RatingT>({} as RatingT);

    return (
        <Container>
            <BurgerRating isCreate={isCreate} rating={rating} />
        </Container>
    );
}

