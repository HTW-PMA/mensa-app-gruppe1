export interface Mensa {
  id: string;
  name: string;
  img: File;
  address: {
    street: string;
    city: string;
    zipcode: string;
    district: string;
    geolocation: {
      latitude: number;
      longitude: number;
    };
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  businessDays: {
    day: string;
    businessHours: {
      openAt: string;
      closeAt: string;
      businessHourType: string;
    }[];
  }[];
  url: string;
  lastUpdated: string;
  canteenReviews: {
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
