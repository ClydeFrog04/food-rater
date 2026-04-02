"use client";
//shared state so mobile and desktop navigations as well as review modal can all access the same state
//normally i would use something like jotai particularly to avoid the nesting of providers but for this poc context is fine:]

import type { ReviewT } from "~/app/lib/ReviewTypes";
import { createContext, type ReactNode, useContext, useState } from "react";

type ReviewModalContextT = {
    isOpen: boolean;
    isCreate: boolean;
    review: ReviewT | null;
    openCreate: () => void;
    openView: (review: ReviewT) => void;
    closeModal: () => void;
};

const ReviewModalContext = createContext<ReviewModalContextT | null>(null);

export function ReviewModalContextProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [review, setReview] = useState<ReviewT | null>(null);

    const openCreate = () => {
        console.log("OPENING");
        setReview(null);
        setIsCreate(true);
        setIsOpen(true);
    };

    const openView = (review: ReviewT) => {
        setReview(review);
        setIsCreate(false);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setReview(null);
    };

    return (
        <ReviewModalContext.Provider
            value={{
                isOpen,
                isCreate,
                review,
                openCreate,
                openView,
                closeModal,
            }}
        >
            {children}
        </ReviewModalContext.Provider>
    );
}

//essentially middleware to prevent having to run null checks in the components that use it:]
export function useReviewModal() {
    const context = useContext(ReviewModalContext);
    if (!context)
        throw new Error(
            "useReviewModal was undefined, was it used outside of it's provider?",
        );
    return context;
}
