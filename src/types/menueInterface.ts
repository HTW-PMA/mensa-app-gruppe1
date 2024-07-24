interface Price {
    price: number;
    priceType: string;
}

interface Additive {
    ID: string;
    text: string;
    referenceid: string;
}

interface Badge {
    ID: string;
    name: string;
    description: string;
}

interface Meal {
    ID: string;
    name: string;
    prices: Price[];
    category: string;
    additives: Additive[];
    badges: Badge[];
    waterBilanz: number;
    co2Bilanz: number;
}

export interface MenueResponse {
    date: string;
    canteenId: string;
    meals: Meal[];
}
