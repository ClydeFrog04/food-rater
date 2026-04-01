"use client";
//shared state so mobile and desktop navigations as well as review modal can all access the same state
//normally i would use something like jotai particularly to avoid the nesting of providers but for this poc context is fine:]

import type { ReviewT } from "~/app/lib/ReviewTypes";
import { createContext, type ReactNode, useContext, useState } from "react";

type ReviewModalContextT = {
    open: boolean;
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
    const [open, setOpen] = useState(false);
    const [isCreate, setIsCreate] = useState(true);
    const [review, setReview] = useState<ReviewT | null>(null);

    const openCreate = () => {
        setReview(null);
        setIsCreate(true);
        setOpen(true);
    };

    const openView = (review: ReviewT) => {
        setReview(review);
        setIsCreate(false);
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <ReviewModalContext.Provider
            value={{
                open,
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

/*

    return (
        <ReviewModalContext.Provider value={{ open, isCreate, review, openCreate, openView, close }}>
            {children}
        </ReviewModalContext.Provider>
    );
}

export function useReviewModal() {
    const ctx = useContext(ReviewModalContext);
    if (!ctx) throw new Error("useReviewModal must be used within ReviewModalProvider");
    return ctx;
}
*/