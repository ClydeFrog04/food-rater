"use client";
import {
    Box,
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
import { useEffect, useState } from "react";
import {
    ChefHatIcon,
    HamburgerIcon,
    HeaterIcon,
    UtensilsCrossedIcon,
} from "lucide-react";
import type { RatingT, ReviewT } from "~/app/lib/ReviewTypes";
import { useReviewModal } from "~/app/contexts/ReviewModalContext";
import BurgerStarRating from "~/app/components/BurgerStarRating";
import Image from "next/image";
import clsx from "clsx";
import { useReviews } from "~/app/contexts/ReviewsContext";

//in a real production app, we might reuse this, but change some of the styling so it looks less like a form and more like a proper view review:]
//time constraint, we just made it all disabled

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
            <BurgerStarRating
                label="Taste"
                name="taste"
                value={rating.taste}
                disabled={!isCreate}
                icon={
                    <HamburgerIcon className="stroke-goldenApricot" size={28} />
                }
                emptyIcon={
                    <HamburgerIcon className="stroke-grey-300" size={28} />
                }
                onChange={(newRating) =>
                    onChange({ ...rating, taste: newRating })
                }
            />
            <BurgerStarRating
                label="Texture"
                name="texture"
                value={rating.texture}
                disabled={!isCreate}
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
                onChange={(newRating) =>
                    onChange({ ...rating, texture: newRating })
                }
            />
            <BurgerStarRating
                label="Presentation"
                name="presentation"
                value={rating.presentation}
                disabled={!isCreate}
                icon={
                    <ChefHatIcon className="stroke-goldenApricot" size={28} />
                }
                emptyIcon={
                    <ChefHatIcon className="stroke-grey-300" size={28} />
                }
                onChange={(newRating) =>
                    onChange({ ...rating, presentation: newRating })
                }
            />
        </Stack>
    );
};

export default function ReviewModal() {
    const { review, isOpen, closeModal, isCreate } = useReviewModal();
    const { refreshData } = useReviews();
    const [rating, setRating] = useState<RatingT>(
        review?.rating ?? DEFAULT_RATING,
    );
    const [burgerName, setBurgerName] = useState(review?.burgerName ?? "");
    const [restaurantName, setRestaurantName] = useState(
        review?.restaurantId ?? "",
    );

    const [optionalNotes, setOptionalNotes] = useState(
        review?.optionalNotes ?? "",
    );

    const handleSubmit = async () => {
        //mock review post to api for poc!
        const payload = {
            rating: rating,
            burgerName,
            optionalNotes: optionalNotes,
        };
        await fetch("/api/v1/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        await refreshData();
        closeModal();
    };

    //reset state on close!
    useEffect(() => {
        if (isOpen) {
            setRating(review?.rating ?? DEFAULT_RATING);
            setBurgerName(review?.burgerName ?? "");
            setOptionalNotes(review?.optionalNotes ?? "");
            setRestaurantName(review?.restaurantId ?? "");
        }
    }, [isOpen, review]);

    //todo: also need to add the image of the burger when viewing the review
    return (
        //todo: max width might be better at xs or a fixed with, same for restaurant details modal
        <Dialog open={isOpen} onClose={closeModal} fullWidth maxWidth="sm">
            <DialogTitle>
                <Typography className="text-lg">
                    {/*todo for the non create, we could grab the name of the review and change the text to "Viewing {userName}'s thoughts!*/}
                    {isCreate ? "Review a burger!" : `Viewing Review`}
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

                    {/*this would do a proper search for restaurants so that all reviews are properly conencted for a restaurant. maybe for the poc we can make this a dropdown with just a few restaurants??????*/}
                    {/*todo: mock this functionality if time*/}
                    <TextField
                        label="Restaurant name"
                        value={restaurantName}
                        disabled={!isCreate}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        fullWidth
                    />

                    <BurgerRating
                        isCreate={isCreate}
                        rating={rating}
                        onChange={setRating}
                    />

                    {isCreate && (
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
                    )}

                    <Box
                        className={clsx(
                            "",
                            review?.imageUrl &&
                                "flex h-[200px] flex-col justify-between gap-2 sm:flex-row",
                        )}
                    >
                        <TextField
                            label="Additional Notes (optional)"
                            value={optionalNotes}
                            onChange={(e) => setOptionalNotes(e.target.value)}
                            disabled={!isCreate}
                            multiline
                            className={clsx(
                                "w-full",
                                review?.imageUrl && "w-1/2",
                            )}
                            sx={{
                                ...(review?.imageUrl && {
                                    height: "100%",
                                    "& .MuiInputBase-root": {
                                        height: "100%",
                                        alignItems: "flex-start",
                                        "& textarea": {
                                            height: "100% !important",
                                            overflow: "auto !important",
                                        },
                                    },
                                }),
                            }}
                        />
                        {review?.imageUrl && (
                            <Box className="flex h-[200px] w-full justify-center sm:w-1/2">
                                <Box className="relative aspect-square w-[200px]">
                                    <Image
                                        src={review.imageUrl}
                                        alt="a picture of a burger"
                                        fill
                                        className="rounded-[10px] object-cover object-bottom"
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Stack>
            </DialogContent>

            <DialogActions>
                <Button onClick={closeModal} className="btn-cancel">
                    Cancel
                </Button>
                {isCreate && (
                    <Button
                        variant="contained"
                        className="btn-primary"
                        disableElevation
                        disabled={burgerName.length === 0}
                        onClick={handleSubmit}
                    >
                        Submit Review
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}
