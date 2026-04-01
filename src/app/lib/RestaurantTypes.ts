export type HoursT = {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
};

export type RestaurantT = {
    id: string;
    name: string;
    address: string;
    city: string;
    hours: HoursT;

}
