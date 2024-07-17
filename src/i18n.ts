import { createI18n } from 'vue-i18n';

const messages = {

  de: {
    welcome: 'Willkommen zur Mensa Marvel App',
    discover: 'Entdecke das Tagesmenü, spezielle Angebote und mehr!',
    home: 'Startseite',
    mensList: 'Mensa Liste',
    about: 'Über uns',
    contact: 'Kontakt',
    meal: 'Gericht'
  },

  en: {
    welcome: 'Welcome to the Mensa Marvel App',
    discover: 'Discover today\'s menu, special offers, and more!',
    home: 'Home',
    mensaList: 'Mensa List',
    about: 'About Us',
    contact: 'Contact',
    meal: 'Meal'
  }

};

const i18n = createI18n({
  locale: 'de',
  fallbackLocale: 'de',
  messages,
});

export default i18n;
