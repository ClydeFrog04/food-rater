"use client"
import { Container, Grid} from "@mui/material";
import { ReviewPreviewCard } from "~/app/components/ReviewPreviewCard";
import { useReviews } from "~/app/contexts/ReviewsContext";


export default function ReviewsGridClient() {
    const {reviews} = useReviews();
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
