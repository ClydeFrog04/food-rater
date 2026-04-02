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
        {
            rating: {
                taste: 2,
                texture: 3,
                presentation: 2,
            },
            optionalNotes: "",
            burgerName: "Jagger Fried Chicken Burger",
            restaurantId: "Randi's Kitchen",
            imageUrl: "/images/burgers/jaggerFriedChickenBurger.jpg",
        },
        {
            rating: {
                taste: 5,
                texture: 5,
                presentation: 5,
            },
            optionalNotes: "",
            burgerName: "Cheese Burger",
            restaurantId: "Randi's Kitchen",
            imageUrl: "/images/burgers/jaggerCheeseBurger.jpg",
        },
    ];

    return Response.json(data);
}
