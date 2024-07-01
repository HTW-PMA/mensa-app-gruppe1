export interface Price {
  price: number;
  priceType: string;
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

export interface Review {
  ID: string;
  mealID: string;
  userID: string;
  averageRating: number;
  detailRatings: { rating: number; name: string }[];
  comment: string;
  lastUpdated: string;
  createdAt: string;
}

export interface Meal {
  ID: string;
  name: string;
  prices: Price[];
  category: string;
  additives: Additive[];
  badges: Badge[];
  waterBilanz: number;
  co2Bilanz: number;
  mealReviews: Review[];
}
