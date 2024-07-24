export interface Price {
  priceType: string; // z.B. "Studierende", "Angestellte", "Gäste"
  price: number; // Preis in Euro
}

export interface Additive {
  referenceid: string; // Referenz-ID des Zusatzstoffs
  text: string; // Beschreibung des Zusatzstoffs
  id: string; // Eindeutige ID des Zusatzstoffs
}

export interface Badge {
  name: string; // Name des Abzeichens, z.B. "Grüner Ampelpunkt"
  description: string; // Beschreibung des Abzeichens
  id: string; // Eindeutige ID des Abzeichens
}

export interface MenuItem {
  prices: Price[]; // Array von Preisen für verschiedene Kategorien
  additives: Additive[]; // Array von Zusatzstoffen
  badges: Badge[]; // Array von Abzeichen
  category: string; // Kategorie des Gerichts, z.B. "Salate"
  name: string; // Name des Gerichts
  waterBilanz: number; // Wasserbilanz des Gerichts
  co2Bilanz: number; // CO2-Bilanz des Gerichts
  id: string; // Eindeutige ID des Gerichts
}

export interface Mensa {
  id: string;
  name: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
    district: string;
    geoLocation: {
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
  menuItems?: MenuItem[];
  img?: {
    lastModified: number;
    name: string;
    webkitRelativePath: string;
    size: number;
    type: string;
    arrayBuffer: () => Promise<ArrayBuffer>;
    slice: () => Blob;
    stream: () => ReadableStream;
    text: () => Promise<string>;
  };


}
