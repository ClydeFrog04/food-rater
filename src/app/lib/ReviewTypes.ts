export type ReviewT = {
    rating: RatingT;
    optionalNotes?: string;
    burgerName: string;
    restaurantId: string;
    imageUrl?: string;
};

export type RatingT = {
    taste: number;
    texture: number;
    presentation: number;
    optionalNotes?: string;
};
