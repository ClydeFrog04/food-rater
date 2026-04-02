import { getSession } from "~/server/better-auth/server";
import ReviewModal from "~/app/components/ReviewModal";
import ReviewsGrid from "~/app/components/ReviewsGrid";
export const dynamic = "force-dynamic"

export default async function Home() {

    return (
        <main>
            <ReviewsGrid />
        </main>
    );
}
