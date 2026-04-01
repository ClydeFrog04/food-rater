"use client";

import type { RestaurantT } from "~/app/lib/RestaurantTypes";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import { ClockIcon, MapPinIcon } from "lucide-react";

type ParamsT = {
    restaurant: RestaurantT | null;
    onClose: () => void;
}

const DAYS_OF_WEEK = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
] as const;



export default function RestaurantDetailsModal({restaurant, onClose}: ParamsT){
    if(!restaurant) return null;

    return (
        <Dialog open={!!restaurant} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>
                {restaurant.name}, {restaurant.city}
            </DialogTitle>
            <DialogContent>
                <Box className="flex items-center gap-2">
                    <MapPinIcon className="h-8 w-8 stroke-grey-300" />
                    <Typography variant="body2">
                        {restaurant.address}, {restaurant.city}
                    </Typography>
                </Box>
                <Divider />
                <Box>
                    <Box className="mb-2 flex items-center gap-2">
                        <ClockIcon className="h-8 w-8 stroke-grey-300" />
                        <Typography variant="body2">Hours of Operation</Typography>
                    </Box>
                    <Stack spacing={0.5}>
                        {DAYS_OF_WEEK.map((day) =>{
                            return (
                                <Box key={day} className="flex justify-between">
                                    <Typography
                                        variant="body2"
                                        className="capitalize"
                                        color="text.secondary"
                                    >
                                        {day}
                                    </Typography>
                                    <Typography variant="body2">
                                        {restaurant.hours[day]}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Stack>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}