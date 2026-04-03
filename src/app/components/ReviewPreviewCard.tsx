import { Box, Card, Grid, Typography } from "@mui/material";
import type { ReviewT } from "../lib/ReviewTypes";
import Image from "next/image";
import { HamburgerIcon } from "lucide-react";
import BurgerStarRating from "~/app/components/BurgerStarRating";
import { useReviewModal } from "~/app/contexts/ReviewModalContext";

/*
this component is simply for what will show as a preview for a review in our home page. the homepage will basically be instagram but for reviews, so a preview of a review will show restaurant name, image, and taste ranking!
 */

type ParamsT = {
    review: ReviewT;
};
export function ReviewPreviewCard({review}: ParamsT) {
    const { openView} = useReviewModal();
    return (
        <Grid
            key={`${review.restaurantId}-${review.burgerName}`}
            size={{ xs: 12, sm: 6, md: 4 }}
            onClick={() => openView(review)}
            className="cursor-pointer"
        >
            <Card className="flex gap-4 pr-1">
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
                        icon={
                            <HamburgerIcon
                                className="stroke-goldenApricot"
                                size={28}
                            />
                        }
                        emptyIcon={
                            <HamburgerIcon
                                className="stroke-grey-400"
                                size={28}
                            />
                        }
                        disabled
                    />
                </Box>
            </Card>
        </Grid>
    );
}