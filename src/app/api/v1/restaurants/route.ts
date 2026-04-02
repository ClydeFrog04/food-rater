import { NextResponse } from "next/server";
import type { RestaurantT } from "~/app/lib/RestaurantTypes";

const MOCK_RESTAURANTS: RestaurantT[] = [
    {
        id: "KitsKitchen",
        name: "KitsKitchen",
        address: "123 Kits Kitchen Street",
        city: "Copenhagen",
        hours: {
            monday: "11:00 - 22:00",
            tuesday: "11:00 - 22:00",
            wednesday: "11:00 - 22:00",
            thursday: "11:00 - 22:00",
            friday: "11:00 - 23:00",
            saturday: "12:00 - 23:00",
            sunday: "12:00 - 21:00",
        },
    },
    {
        id: "Jagger",
        name: "Jagger Burger",
        address: "Strandlodsvej 15",
        city: "Amager",
        hours: {
            monday: "Closed",
            tuesday: "12:00 - 21:00",
            wednesday: "12:00 - 21:00",
            thursday: "12:00 - 21:00",
            friday: "12:00 - 22:00",
            saturday: "11:00 - 22:00",
            sunday: "11:00 - 20:00",
        },
    },
    {
        id: "Randi's Kitchen",
        name: "Randi's Kitchen",
        address: "Lindsgreen Alle",
        city: "Amager",
        hours: {
            monday: "11:00 - 21:00",
            tuesday: "11:00 - 21:00",
            wednesday: "11:00 - 21:00",
            thursday: "11:00 - 21:00",
            friday: "11:00 - 22:00",
            saturday: "12:00 - 22:00",
            sunday: "Closed",
        },
    },
];

export async function GET() {
    return NextResponse.json(MOCK_RESTAURANTS);
}
