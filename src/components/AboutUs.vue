<template>
  <div class="about-us">
    <h1>
      Herzlich willkommen in unserer Mensa Marvel App für Berliner Mensen, wo Essen planen zum Vergnügen wird!
    </h1>
    <p>
      Begeben Sie sich auf eine kulinarische Reise durch Berlins Mensen mit unserer innovativen App. Wir bieten Ihnen umfassende Informationen zu Speiseplänen, Essenszeiten und vielem mehr.
    </p>
    <p>
      Entdecken Sie neue Geschmäcker und finden Sie die besten Mahlzeiten in Ihrer Nähe. Unsere App ist darauf ausgelegt, Ihnen das Leben leichter und den Genuss größer zu machen.
    </p>
      Vielen Dank, dass Sie sich für unsere App entschieden haben. Lassen Sie das kulinarische Abenteuer beginnen!
    <p>
      Entdecken Sie die Features der Mensa Marvel App: Egal, ob Sie Student sind oder einfach nur gerne gut essen, die Mensa Marvel App für Berliner Mensen wird Ihr neuer kulinarischer Begleiter sein.
    </p>
    <p>
      Speisepläne und Menüoptionen für alle Mensen einsehen! Essenszeiten und Standorte der Mensen in Berlin finden
    </p>

  </div>
</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Texte für die Übersetzung
const aboutUsTexts = {
  title: 'Über Uns',
  description: 'Willkommen bei unserer Mensa-App. Hier finden Sie alle Informationen über unsere Anwendung, die Ihnen den Zugang zu Speiseplänen, Essenszeiten und vielem mehr bietet.'
};

// App-spezifische Texte
const appInfoTexts = {
  title: 'Unsere Mensa-App',
  description: 'Erfahren Sie mehr über unsere innovative Mensa-App, die Ihnen Zugang zu Speiseplänen, Essenszeiten und vielem mehr bietet.',
  feature1: 'Speisepläne und Menüoptionen einsehen',
  feature2: 'Essenszeiten und Standorte der Mensen finden',
  feature3: 'Benachrichtigungen über besondere Angebote und Ereignisse erhalten'
};

// Kontaktinformationen
const contactInfoTexts = {
  title: 'Kontakt',
  description: 'Sie können uns auf folgende Weise kontaktieren:',
  email: 'info@mensa-app.com',
  phone: '+49 123 456789',
  address: 'Mensa App GmbH, Musterstraße 1, 12345 Musterstadt'
};
</script>

<style scoped>
.about-us {
  text-align: center;
  margin-top: 2rem;
}

.about-us h1 {
  color: #5D4037; /* Dunkelbraune Schriftfarbe */
  font-size: 2.5em;
}

.about-us p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #333; /* Dunkle Textfarbe */
}

.app-info {
  margin-top: 2rem;
}

.app-info h2 {
  font-size: 2em;
  color: #5D4037; /* Dunkelbraune Schriftfarbe */
}

.app-info ul {
  list-style-type: disc;
  margin-left: 2rem;
}

.contact {
  margin-top: 2rem;
}

.contact h2 {
  font-size: 2em;
  color: #5D4037; /* Dunkelbraune Schriftfarbe */
}

.contact p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #333; /* Dunkle Textfarbe */
}

.contact ul {
  list-style-type: none;
  padding-left: 0;
  margin-top: 1rem;
}

.contact ul li {
  margin-top: 0.5rem;
}
</style>
