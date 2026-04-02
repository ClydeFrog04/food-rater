import axios from "axios";
import type { ReviewT } from "~/app/lib/ReviewTypes";
import ReviewsGridClient from "~/app/components/ReviewsGridClient";

export const dynamic = "force-dynamic";

async function getReviews(): Promise<ReviewT[]> {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const res = await axios.get<ReviewT[]>(`${BASE_URL}/api/v1/reviews`);
    if (res.status !== 200) throw new Error("Failed to fetch reviews.");
    return res.data;
}

export default async function ReviewsGrid() {
    const reviews = await getReviews();
    return <ReviewsGridClient reviews={reviews} />;
}
