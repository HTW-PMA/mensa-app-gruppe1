
export interface Meal {
    ID: string;
    name: string;
    prices: Price[];
    category: string;
    additives: Additive[];
    badges: Badge[];
    waterBilanz: number;
    co2Bilanz: number;
    mealReviews: MealReview[];

    showDetails?: boolean;
}
export interface Additive {
    ID: string;
    text: string;
    referenceid: string;
}

export interface Badge {
    ID: string;
    name: string;
    description: string;
}

export interface Price {
    price: number;
    priceType: string;
}

export interface DetailRating {
    rating: number;
    name: string;
}

export interface MealReview {
    ID: string;
    mealID: string;
    userID: string;
    averageRating: number;
    detailRatings: DetailRating[];
    comment: string;
    lastUpdated: string;
    createdAt: string;
}
