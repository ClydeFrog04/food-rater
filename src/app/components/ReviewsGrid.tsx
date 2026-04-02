import { Box, Card, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import type { ReviewT } from "~/app/lib/ReviewTypes";
import Image from "next/image";
import { HamburgerIcon } from "lucide-react";
import BurgerStarRating from "~/app/components/BurgerStarRating";

export const dynamic = "force-dynamic";
async function getReviews(): Promise<ReviewT[]> {
    //Note for interview- next js extends fetch to add things like data caching and revalidation, but we lose the axios generic/similarity.
    //for the poc i like the <ReviewT[]> a bit better but in production we might use next fetch, or build our own axios with redis cache support!:]
    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await axios.get<ReviewT[]>(`${BASE_URL}/api/v1/reviews`);
    if (res.status !== 200) throw new Error("Failed to fetch reviews.");
    return res.data;
}

export default async function ReviewsGrid() {
    const reviewsFound = await getReviews();

    return (
        <Container className="pt-4">
            <Grid container spacing={2}>
                {reviewsFound.map((review, index) => {
                    return (
                        <Grid
                            key={`${review.restaurantId}-${review.burgerName}`}
                            size={{ xs: 12, sm: 6, md: 4 }}
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
                                        label={"Burger Rating"}
                                        name={"burgerRating"}
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
                })}
            </Grid>
        </Container>
    );
}
