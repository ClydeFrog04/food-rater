"use client";
//shared state so mobile and desktop navigations as well as review modal can all access the same state
//normally i would use something like jotai particularly to avoid the nesting of providers but for this poc context is fine:]

import type { ReviewT } from "~/app/lib/ReviewTypes";
import {
    createContext,
    type ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import axios from "axios";

type ReviewsContextT = {
    reviews: ReviewT[];
    getReviews: () => Promise<ReviewT[]>;
    refreshData: () => Promise<void>;
};

const ReviewsContext = createContext<ReviewsContextT | null>(null);



export function ReviewsContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [reviews, setReviews] = useState<ReviewT[]>([]);


    async function getReviews(): Promise<ReviewT[]> {
        const BASE_URL = typeof window === 'undefined'
            ? (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000")
            : ""
        const res = await axios.get<ReviewT[]>(`${BASE_URL}/api/v1/reviews`)
        if (res.status !== 200) throw new Error("Failed to fetch reviews.")
        return res.data
    }

    const refreshData = async () => {
        setReviews(await getReviews());
    }

    //load reviews initially
    useEffect(() => {
        void refreshData();
    }, []);

    return (
        <ReviewsContext.Provider
            value={{
                reviews,
                getReviews,
                refreshData
            }}
        >
            {children}
        </ReviewsContext.Provider>
    );
}

//essentially middleware to prevent having to run null checks in the components that use it:]
export function useReviews() {
    const context = useContext(ReviewsContext);
    if (!context)
        throw new Error(
            "useReviews was undefined, was it used outside of it's provider?",
        );
    return context;
}
