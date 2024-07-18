<template>
  <div class="home-view">
    <header class="header">
      <h1>{{ t('welcome') }}</h1>
      <p>{{ t('discover') }}</p>
      <img src="@/assets/Mensa%20Marvel%20(4).png" alt="Mensa Marvel" class="mensa-logo" />
    </header>
    <footer class="footer">
      <nav>
        <ul>
          <li><button @click="changeLocale('en')">English</button></li>
          <li><button @click="changeLocale('de')">Deutsch</button></li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const changeLocale = (lang: 'en' | 'de') => {
  locale.value = lang;
};
</script>

<style scoped>
.home-view {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  color: #F8E8E1; /* Dunkelbraun */
  background-color: #F8E8E1; /* Helles Beige */
  padding: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.footer {
  text-align: center;
  margin-top: 2rem;
}

.footer nav ul {
  list-style: none;
  padding: 0;
}

.footer nav ul li {
  display: inline;
  margin-right: 1rem;
}

.footer nav ul li button {
  background: none;
  border: none;
  color: #8D6E63; /* Brauntöne für die Buttons */
  cursor: pointer;
  text-decoration: none;
}

.footer nav ul li button:hover {
  color: #F8E8E1; /* Helles Beige für Hover */
}
</style>
