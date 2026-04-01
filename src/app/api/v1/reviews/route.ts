import type { ReviewT } from "~/app/lib/ReviewTypes";


export async function GET(): Promise<Response> {
    const data: ReviewT[] = [
        {
            rating: {
                taste: 4,
                texture: 3,
                presentation: 5,
            },
            optionalNotes:
                "This was a very tasty burger prepared by a lovely cat chef, Kit!",
            burgerName: "kat get enough of it!",
            restaurantId: "KitsKitchen",
            imageUrl: "/images/burgers/jaggerMatureCheddar.jpg",
        },
        {
            rating: {
                taste: 5,
                texture: 4,
                presentation: 5,
            },
            optionalNotes:
                "The burgers and fries at Jagger are always SO good, we go there way too much!",
            burgerName: "Jagger Burger",
            restaurantId: "Jagger",
        },
    ];

    return Response.json(data);
}