import { getSession } from "~/server/better-auth/server";
import ReviewModal from "~/app/components/ReviewModal";
import ReviewsGrid from "~/app/components/ReviewsGrid";

export default async function Home() {
  const session = await getSession();

  return (
    <main>
        {/*<ReviewModal isCreate={true}/>*/}
        <ReviewsGrid/>
    </main>
  );
}
