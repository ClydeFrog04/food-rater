import type { RestaurantT } from "~/app/lib/RestaurantTypes";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import RestaurantsGrid from "~/app/components/RestaurantsGrid";

export const dynamic = 'force-dynamic'

async function getRestaurants(): Promise<RestaurantT[]> {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    const res = await axios.get<RestaurantT[]>(
        `${BASE_URL}/api/v1/restaurants`,
    );
    if (res.status !== 200) throw new Error("Failed to fetch restaurants.");
    return res.data;
}

export default async function Page(){
    const restaurants = await getRestaurants();


    return (
        //todos: do we need a top padding like the other?
        <Container >
            <Typography variant="h5">Browse restaurants with burgers</Typography>
            <RestaurantsGrid restaurants={restaurants} />
        </Container>
    )

}
