export interface Meal {
  ID: string;
  name: string;
  prices: {
    price: number;
    priceType: string;
  }[];
  category: string;
  additives: {
    ID: string;
    text: string;
    referenceid: string;
  }[];
  badges: {
    ID: string;
    name: string;
    description: string;
  }[];
  waterBilanz: number;
  co2Bilanz: number;
  mealReviews: {
    ID: string;
    mealID: string;
    userID: string;
    averageRating: number;
    detailRatings: {
      rating: number;
      name: string;
    }[];
    comment: string;
    lastUpdated: string;
    createdAt: string;
  }[];
}
