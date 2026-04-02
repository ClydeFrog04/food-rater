"use client";

import type { RestaurantT } from "~/app/lib/RestaurantTypes";
import { useState } from "react";
import { Container, Grid } from "@mui/material";
import RestaurantCard from "~/app/components/RestaurantCard";
import RestaurantDetailsModal from "~/app/components/RestaurantDetailsModal";

type ParamsT = {
    restaurants: RestaurantT[];
};

export default function RestaurantsGrid({ restaurants }: ParamsT) {
    const [selectedRestaurant, setSelectedRestaurant] =
        useState<RestaurantT | null>(null);

    return (
        <Container>
            <Grid container spacing={2}>
                {restaurants.map((restaurant) => (
                    <Grid key={restaurant.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <RestaurantCard
                            restaurant={restaurant}
                            onClick={setSelectedRestaurant}
                        />
                    </Grid>
                ))}
            </Grid>
            <RestaurantDetailsModal
                restaurant={selectedRestaurant}
                onClose={() => setSelectedRestaurant(null)}
            />
        </Container>
    );
}
