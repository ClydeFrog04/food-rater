"use client";

import type { RestaurantT } from "~/app/lib/RestaurantTypes";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { MapPinIcon } from "lucide-react";

type ParamsT = {
    restaurant: RestaurantT;
    onClick: (restaurant: RestaurantT) => void;
}

export default function RestaurantCard({restaurant, onClick}: ParamsT) {

    return (
        <Card>
            <CardActionArea onClick={() => onClick(restaurant)}>
                <CardContent>
                    <Typography variant="h6">{restaurant.name}</Typography>
                    <MapPinIcon className="w-8 h-8 stroke-grey-300"/>
                    <Typography variant="body2">{restaurant.address}, {restaurant.city}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
