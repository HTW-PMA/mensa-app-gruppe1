<template>
  <div class="about-us">
    <h1>{{ t('aboutUs.title') }}</h1>
    <p>{{ t('aboutUs.description') }}</p>

    <div class="marvel-app-info">
      <h2>{{ t('marvelApp.title') }}</h2>
      <p>{{ t('marvelApp.description') }}</p>
      <ul>
        <li>{{ t('marvelApp.feature1') }}</li>
        <li>{{ t('marvelApp.feature2') }}</li>
        <li>{{ t('marvelApp.feature3') }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Beispieltexte für die Übersetzung
const aboutUsTexts = {
  title: 'Über Uns',
  description: 'Willkommen auf unserer Unternehmensseite. Hier finden Sie alle Informationen über unsere Mission, Vision und Werte.'
};

// Marvel-App spezifische Texte
const marvelAppTexts = {
  title: 'Unsere Marvel-App',
  description: 'Erfahren Sie mehr über unsere innovative Marvel-App, die Ihnen Zugang zu den neuesten Comics, Charakteren und vielem mehr bietet.',
  feature1: 'Zugang zu über 25.000 Comics und Grafikromanen',
  feature2: 'Suche nach Lieblingscharakteren und Serien',
  feature3: 'Erhalten Sie Benachrichtigungen über neue Veröffentlichungen und Events'
};
</script>

<style scoped>
.about-us {
  text-align: center;
  margin-top: 2rem;
}

.about-us h1 {
  color: #fbc02d; /* Gelbe Schriftfarbe */
  font-size: 2.5em;
}

.about-us p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #333; /* Dunkle Textfarbe */
}

.marvel-app-info {
  margin-top: 2rem;
}

.marvel-app-info h2 {
  font-size: 2em;
  color: #fbc02d; /* Gelbe Schriftfarbe */
}

.marvel-app-info ul {
  list-style-type: disc;
  margin-left: 2rem;
}
</style>
