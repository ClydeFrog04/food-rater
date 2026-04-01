"use client";
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useState } from "react";
import {
    ChefHatIcon,
    HamburgerIcon,
    HeaterIcon,
    UtensilsCrossedIcon,
} from "lucide-react";
import type { RatingT, ReviewT } from "~/app/lib/ReviewTypes";
import { useReviewModal } from "~/app/contexts/ReviewModalContext";

type ParamsT = {
    isCreate: boolean;
};

type RatingParamsT = {
    isCreate: boolean;
    rating: RatingT;
    onChange: (rating: RatingT) => void;
};

const DEFAULT_RATING = {
    taste: 1,
    texture: 1,
    presentation: 1,
    optionalNotes: "",
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
    const { review, isOpen, closeModal } = useReviewModal();
    const [rating, setRating] = useState<RatingT>(
        review?.rating ?? DEFAULT_RATING,
    );
    const [burgerName, setBurgerName] = useState(review?.burgerName ?? "");
    const [optionalNotes, setOptionalNotes] = useState(
        review?.optionalNotes ?? "",
    );

    const handleSubmit = async () => {
        //mock review post to api for poc!
        const payload = { ...rating, burgerName, optionalNotes: optionalNotes };
        console.log("Submitting review:", payload);
        await fetch("/api/v1/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        close();
    };

    return (
        <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography>
                    {/*todo for the non create, we could grab the name of the review and change the text to "Viewing {userName}'s thoughts!*/}
                    {isCreate ? "Review a burger!" : "Viewing Review"}
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={3} className="mt-2">
                    <TextField
                        label="Burger name"
                        value={burgerName}
                        onChange={(e) => setBurgerName(e.target.value)}
                        disabled={!isCreate}
                        fullWidth
                    />

                    {/*this would do a proper search for restaurants so that all reviews are properly conencted for a restaurant*/}
                    {/*todo: mock this functionality if time*/}
                    <TextField
                        label="Restaurant name"
                        value="Kits Kitchen"
                        disabled={!isCreate}
                        fullWidth
                    />

                    <BurgerRating
                        isCreate={isCreate}
                        rating={rating}
                        onChange={setRating}
                    />

                    <Button
                        variant="outlined"
                        className="btn-primary"
                        component="label"
                        disabled={!isCreate}
                        fullWidth
                    >
                        Upload an image of your burger!
                        <input type="file" accept="image/*" hidden />
                    </Button>

                    <TextField
                        label="Additional Notes(optional)"
                        value={optionalNotes}
                        onChange={(e) => setOptionalNotes(e.target.value)}
                        disabled={!isCreate}
                        multiline
                        rows={5}
                        fullWidth
                    />
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={closeModal} className="btn-cancel">
                    Cancel
                </Button>
                {isCreate && (
                    <Button variant="contained" className="btn-primary" disableElevation>
                        Submit Review
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
