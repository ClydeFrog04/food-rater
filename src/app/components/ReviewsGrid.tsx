import axios from "axios";
import type { ReviewT } from "~/app/lib/ReviewTypes";
import ReviewsGridClient from "~/app/components/ReviewsGridClient";

export const dynamic = "force-dynamic";


export default async function ReviewsGrid() {

    return <ReviewsGridClient />;
}
