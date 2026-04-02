"use client"
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { HamburgerIcon } from "lucide-react";
import BurgerStarRating from "~/app/components/BurgerStarRating";
import { useReviewModal } from "~/app/contexts/ReviewModalContext";
import type { ReviewT } from "~/app/lib/ReviewTypes";

type Props = {
    reviews: ReviewT[];
};

export default function ReviewsGridClient({ reviews }: Props) {
    const { openView } = useReviewModal();

    return (
        <Container className="pt-4">
            <Grid container spacing={2}>
                {reviews.map((review) => (
                    <Grid
                        key={`${review.restaurantId}-${review.burgerName}`}
                        size={{ xs: 12, sm: 6, md: 4 }}
                        onClick={() => openView(review)}
                        className="cursor-pointer"
                    >
                        <Card className="flex gap-4">
                            {review.imageUrl ? (
                                <Box className="relative aspect-square w-[200px]">
                                    <Image
                                        src={review.imageUrl}
                                        alt="a picture of a burger"
                                        fill
                                        className="object-cover object-bottom"
                                    />
                                </Box>
                            ) : (
                                <Box className="flex aspect-square w-full max-w-[200px] items-center justify-center bg-[#ebeae5]">
                                    <HamburgerIcon className="h-1/2 w-1/2 stroke-gray-400" />
                                </Box>
                            )}
                            <Box component="section" className="pt-4">
                                <Typography>{review.burgerName}</Typography>
                                <BurgerStarRating
                                    label="Burger Rating"
                                    name="burgerRating"
                                    value={review.rating.taste}
                                    icon={<HamburgerIcon className="stroke-goldenApricot" size={28} />}
                                    emptyIcon={<HamburgerIcon className="stroke-grey-400" size={28} />}
                                    disabled
                                />
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
