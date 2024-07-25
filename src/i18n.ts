import {createI18n} from "vue-i18n";

const messages = {
    de: {
        welcome: 'Willkommen zur Mensa Marvel App',
        discover: 'Entdecke das Tagesmenü, spezielle Angebote und mehr!',
        nearest: 'Nächste Mensa',
        home: 'Startseite',
        mensList: 'Mensa Liste',
        about: 'Über uns',
        contact: 'Kontakt',
        meal: 'Gericht',
        today: 'Heute',
        mensaList: {
            title: 'Mensa Liste'
        },
        filters: {
            filterName: 'Nach Name filtern',
            filterZipcode: 'Nach Postleitzahl filtern',
            filterDistrict: 'Nach Bezirk filtern',
            filterOpenAt: 'Nach Öffnungszeit filtern',
            filterMeal: 'Nach Gericht suchen',
            sortByName: 'Nach Name sortieren',
            sortByCategory: 'Nach Kategorie sortieren'
        },
        phone: 'Telefon',
        email: 'Email',
        closed: 'Geschlossen',
        noMensasFound: 'Keine Mensen gefunden. Bitte versuchen Sie es später noch einmal oder wenden Sie sich an den Support.',
        noMealsFound: 'Keine Gerichte gefunden. Bitte versuchen Sie es später noch einmal oder wenden Sie sich an den Support.',
        loading: 'Laden...',
        days: {
            Monday: 'Montag',
            Tuesday: 'Dienstag',
            Wednesday: 'Mittwoch',
            Thursday: 'Donnerstag',
            Friday: 'Freitag',
            Saturday: 'Samstag',
            Sunday: 'Sonntag'
        },
        hourTypes: {
            lunch: 'Mittagessen',
            dinner: 'Abendessen'
        },
        reviews: {
            averageRating: 'Durchschnittliche Bewertung',
            noReviews: 'Keine Bewertungen verfügbar',
            moreInfo: 'Über das Gericht mehr erfahren'
        },
        mensaDetails: {
            address: 'Adresse',
            openingHours: 'Öffnungszeiten',
            businessHourType: {
                lunch: 'Mittagessen',
                dinner: 'Abendessen'
            },
            contactInfo: 'Kontaktinformationen',
            phone: 'Telefon',
            email: 'Email'
        },
        mealDetails: {
            category: 'Kategorie',
            prices: 'Preise',
            additives: 'Zusätze',
            badges: 'Badges',
            waterBilanz: 'Wasserbilanz',
            co2Bilanz: 'CO2-Bilanz'
        },
        date: {
            select: 'Wähle ein Datum'
        },
        noSpeisen: 'Heute keine Speisen',
        tryAgain: 'Erneut versuchen',
        errorLoadingData: 'Fehler beim Laden der Daten',
        userSettings: {
            title: 'Nutzereinstellungen',
            favoriteMensas: 'Lieblings-Mensen',
            favoriteMeals: 'Lieblingsspeisen',
            notificationSettings: 'Benachrichtigungseinstellungen',
            dailyNotifications: 'Tägliche Benachrichtigungen',
            newMealsNotifications: 'Benachrichtigungen über neue Gerichte',
            offersNotifications: 'Benachrichtigungen über Angebote',
            language: 'Sprache',
            remove: 'Entfernen',
            noFavoriteMensa: 'Noch keine Mensa favorisiert',
            noFavoriteMeal: 'Noch keine Speise favorisiert'
        },
        notifications: {
            enabledTitle: 'Benachrichtigungen aktiviert',
            enabledBody: 'Sie erhalten nun Benachrichtigungen gemäß Ihren Einstellungen.',
            updatedTitle: 'Benachrichtigungen aktualisiert',
            updatedBody: 'Ihre Benachrichtigungseinstellungen wurden aktualisiert.'
        }
    },
    en: {
        welcome: 'Welcome to the Mensa Marvel App',
        discover: 'Discover today\'s menu, special offers, and more!',
        nearest: 'Nearest Mensa',
        home: 'Home',
        mensList: 'Mensa List',
        about: 'About Us',
        contact: 'Contact',
        meal: 'Meal',
        today: 'Today',
        mensaList: {
            title: 'Mensa List'
        },
        filters: {
            filterName: 'Filter by Name',
            filterZipcode: 'Filter by Zipcode',
            filterDistrict: 'Filter by District',
            filterOpenAt: 'Filter by Opening Time',
            filterMeal: 'Search for a Meal',
            sortByName: 'Sort by Name',
            sortByCategory: 'Sort by Category'
        },
        phone: 'Phone',
        email: 'Email',
        closed: 'Closed',
        noMensasFound: 'No Mensas found. Please try again later or contact support.',
        noMealsFound: 'No meals found. Please try again later or contact support.',
        loading: 'Loading...',
        days: {
            Monday: 'Monday',
            Tuesday: 'Tuesday',
            Wednesday: 'Wednesday',
            Thursday: 'Thursday',
            Friday: 'Friday',
            Saturday: 'Saturday',
            Sunday: 'Sunday'
        },
        hourTypes: {
            lunch: 'Lunch',
            dinner: 'Dinner'
        },
        reviews: {
            averageRating: 'Average Rating',
            noReviews: 'No reviews available',
            moreInfo: 'Learn more about the meal'
        },
        mensaDetails: {
            address: 'Address',
            openingHours: 'Opening Hours',
            businessHourType: {
                lunch: 'Lunch',
                dinner: 'Dinner'
            },
            contactInfo: 'Contact Information',
            phone: 'Phone',
            email: 'Email'
        },
        mealDetails: {
            category: 'Category',
            prices: 'Prices',
            additives: 'Additives',
            badges: 'Badges',
            waterBilanz: 'Water Balance',
            co2Bilanz: 'CO2 Balance'
        },
        date: {
            select: 'Select a Date'
        },
        noSpeisen: 'No meals today',
        tryAgain: 'Try Again',
        errorLoadingData: 'Error loading data',
        userSettings: {
            title: 'User Settings',
            favoriteMensas: 'Favorite Mensas',
            favoriteMeals: 'Favorite Meals',
            notificationSettings: 'Notification Settings',
            dailyNotifications: 'Daily Notifications',
            newMealsNotifications: 'New Meals Notifications',
            offersNotifications: 'Offers Notifications',
            language: 'Language',
            remove: 'Remove',
            noFavoriteMensa: 'No favorite mensa yet',
            noFavoriteMeal: 'No favorite meal yet'
        },
        notifications: {
            enabledTitle: 'Notifications Enabled',
            enabledBody: 'You will now receive notifications according to your settings.',
            updatedTitle: 'Notifications Updated',
            updatedBody: 'Your notification settings have been updated.'
        }
    }
};

const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    messages,
});

export default i18n;
