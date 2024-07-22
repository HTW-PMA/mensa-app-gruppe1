import { createI18n } from 'vue-i18n';
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
        }
    }
};
const i18n = createI18n({
    locale: 'de',
    fallbackLocale: 'en',
    messages,
});
export default i18n;
//# sourceMappingURL=i18n.js.map