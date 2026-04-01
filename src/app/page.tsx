import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "~/server/better-auth";
import { getSession } from "~/server/better-auth/server";
import ReviewModal from "~/app/components/ReviewModal";

export default async function Home() {
  const session = await getSession();

  return (
    <main>

        <ReviewModal isCreate={true}/>
    </main>
  );
}
