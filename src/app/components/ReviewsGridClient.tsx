"use client"
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import { HamburgerIcon } from "lucide-react";
import BurgerStarRating from "~/app/components/BurgerStarRating";
import { useReviewModal } from "~/app/contexts/ReviewModalContext";
import type { ReviewT } from "~/app/lib/ReviewTypes";
import { ReviewPreviewCard } from "~/app/components/ReviewPreviewCard";

type Props = {
    reviews: ReviewT[];
};

export default function ReviewsGridClient({ reviews }: Props) {

    return (
        <Container className="pt-4">
            <Grid container spacing={2}>
                {reviews.map((review, index) => (
                    <ReviewPreviewCard
                        //bad key, in production we would have a proper review id; todo: add that if time, super easy!
                        key={`${review.restaurantId}/${index}`}
                        review={review}
                    />
                ))}
            </Grid>
        </Container>
    );
}
